import {
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Switch,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import type { BikeModel, CreateBikeModel } from "../models/BikeModel";

interface BikeFormModalProps {
  open: boolean;
  title: string;
  okText: string;
  // No bike means creation: the form starts empty
  bike?: BikeModel | null;
  onCancel: () => void;
  onSubmit: (input: CreateBikeModel) => Promise<unknown>;
}

type TextField =
  "brand" | "model" | "description" | "category" | "frameMaterial";
type NumberField =
  "frameSizeCm" | "wheelSizeInches" | "gearCount" | "weightKg" | "price";

type BikeFormValues = Record<TextField, string> &
  Record<NumberField, number | null> & { electric: boolean };

type BikeFormErrors = Partial<Record<TextField | NumberField, string>>;

const emptyValues: BikeFormValues = {
  brand: "",
  model: "",
  description: "",
  category: "",
  frameMaterial: "",
  frameSizeCm: null,
  wheelSizeInches: null,
  gearCount: null,
  weightKg: null,
  price: null,
  electric: false,
};

const toValues = (bike: BikeModel): BikeFormValues => ({
  brand: bike.brand,
  model: bike.model,
  description: bike.description,
  category: bike.category,
  frameMaterial: bike.frameMaterial,
  frameSizeCm: bike.frameSizeCm,
  wheelSizeInches: bike.wheelSizeInches,
  gearCount: bike.gearCount,
  weightKg: bike.weightKg,
  price: bike.priceCents / 100,
  electric: bike.electric,
});

const validate = (values: BikeFormValues): BikeFormErrors => {
  const errors: BikeFormErrors = {};
  if (!values.brand.trim()) errors.brand = "Brand is required";
  if (!values.model.trim()) errors.model = "Model is required";
  if (!values.description.trim())
    errors.description = "Description is required";
  if (!values.category.trim()) errors.category = "Category is required";
  if (!values.frameMaterial.trim())
    errors.frameMaterial = "Frame material is required";
  if (!values.frameSizeCm || values.frameSizeCm <= 0)
    errors.frameSizeCm = "Must be greater than 0";
  if (!values.wheelSizeInches || values.wheelSizeInches <= 0)
    errors.wheelSizeInches = "Must be greater than 0";
  if (
    !values.gearCount ||
    values.gearCount <= 0 ||
    !Number.isInteger(values.gearCount)
  )
    errors.gearCount = "Must be a whole number greater than 0";
  if (!values.weightKg || values.weightKg <= 0)
    errors.weightKg = "Must be greater than 0";
  if (values.price === null || values.price < 0)
    errors.price = "Price is required";
  return errors;
};

const toCreateBikeModel = (values: BikeFormValues): CreateBikeModel => ({
  brand: values.brand.trim(),
  model: values.model.trim(),
  description: values.description.trim(),
  category: values.category.trim(),
  frameMaterial: values.frameMaterial.trim(),
  frameSizeCm: values.frameSizeCm ?? 0,
  wheelSizeInches: values.wheelSizeInches ?? 0,
  gearCount: values.gearCount ?? 0,
  weightKg: values.weightKg ?? 0,
  electric: values.electric,
  // The API stores prices in cents
  priceCents: Math.round((values.price ?? 0) * 100),
});

export const BikeFormModal = ({
  open,
  title,
  okText,
  bike,
  onCancel,
  onSubmit,
}: BikeFormModalProps) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [values, setValues] = useState<BikeFormValues>(emptyValues);
  const [errors, setErrors] = useState<BikeFormErrors>({});

  // Each time the modal opens, start from the bike (edit) or from an empty form (create)
  useEffect(() => {
    if (open) {
      setValues(bike ? toValues(bike) : emptyValues);
      setErrors({});
    }
  }, [open]);

  const onConfirm = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    onSubmit(toCreateBikeModel(values))
      .then(onCancel)
      // On failure, stay in the form so the changes are not lost
      .catch(() => message.error("The bike could not be saved"))
      .finally(() => setIsSaving(false));
  };

  const textField = (name: TextField, label: string) => (
    <>
      <label htmlFor={`bike-${name}`}>{label}</label>
      <Input
        id={`bike-${name}`}
        value={values[name]}
        status={errors[name] && "error"}
        onChange={(event) => {
          setValues({ ...values, [name]: event.target.value });
          setErrors({ ...errors, [name]: undefined });
        }}
      />
      {errors[name] && (
        <Typography.Text type="danger">{errors[name]}</Typography.Text>
      )}
    </>
  );

  const numberField = (name: NumberField, label: string, min: number = 0) => (
    <>
      <label htmlFor={`bike-${name}`}>{label}</label>
      <InputNumber
        id={`bike-${name}`}
        style={{ width: "100%" }}
        min={min}
        value={values[name]}
        status={errors[name] && "error"}
        onChange={(value) => {
          setValues({ ...values, [name]: value });
          setErrors({ ...errors, [name]: undefined });
        }}
      />
      {errors[name] && (
        <Typography.Text type="danger">{errors[name]}</Typography.Text>
      )}
    </>
  );

  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      onCancel={onCancel}
      onOk={onConfirm}
      confirmLoading={isSaving}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>{textField("brand", "Brand *")}</Col>
        <Col span={12}>{textField("model", "Model *")}</Col>
        <Col span={24}>{textField("description", "Description *")}</Col>
        <Col span={12}>{textField("category", "Category *")}</Col>
        <Col span={12}>{textField("frameMaterial", "Frame material *")}</Col>
        <Col span={12}>{numberField("frameSizeCm", "Frame size (cm) *")}</Col>
        <Col span={12}>
          {numberField("wheelSizeInches", "Wheel size (inches) *")}
        </Col>
        <Col span={12}>{numberField("gearCount", "Gears *", 1)}</Col>
        <Col span={12}>{numberField("weightKg", "Weight (kg) *")}</Col>
        <Col span={12}>{numberField("price", "Price (€) *")}</Col>
        <Col span={12}>
          <label htmlFor="bike-electric">Electric</label>
          <div>
            <Switch
              id="bike-electric"
              checked={values.electric}
              onChange={(electric) => setValues({ ...values, electric })}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
