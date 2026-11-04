import { ArrowLeftOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import type { DescriptionsProps } from "antd";
import { Card, Descriptions, Skeleton, Space } from "antd";
import Title from "antd/es/typography/Title";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { useBikeDetailsProvider } from "../providers/useBikeDetailsProvider";
import { formatPrice } from "../utils/formatPrice";
import { DeleteBikeButton } from "./DeleteBikeButton";
import { EditBikeButton } from "./EditBikeButton";

interface BikeDetailsProps {
  bikeId: string;
}

export const BikeDetails = ({ bikeId }: BikeDetailsProps) => {
  const { bike, isLoading, load, updateBike, deleteBike } =
    useBikeDetailsProvider(bikeId);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [bikeId]);

  const value = (content: ReactNode) =>
    isLoading ? <Skeleton.Input active size="small" /> : (content ?? "—");

  const items: DescriptionsProps["items"] = [
    { key: "brand", label: "Brand", children: value(bike?.brand) },
    { key: "model", label: "Model", children: value(bike?.model) },
    { key: "category", label: "Category", children: value(bike?.category) },
    {
      key: "description",
      label: "Description",
      children: value(bike?.description),
    },
    {
      key: "frameMaterial",
      label: "Frame material",
      children: value(bike?.frameMaterial),
    },
    {
      key: "frameSizeCm",
      label: "Frame size",
      children: value(bike && `${bike.frameSizeCm} cm`),
    },
    {
      key: "wheelSizeInches",
      label: "Wheel size",
      children: value(bike && `${bike.wheelSizeInches}"`),
    },
    { key: "gearCount", label: "Gears", children: value(bike?.gearCount) },
    {
      key: "weightKg",
      label: "Weight",
      children: value(bike && `${bike.weightKg} kg`),
    },
    {
      key: "electric",
      label: "Electric",
      children: value(bike && (bike.electric ? "Yes" : "No")),
    },
    {
      key: "price",
      label: "Price",
      children: value(bike && formatPrice(bike.priceCents)),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
        padding: ".25rem .5rem",
      }}
    >
      <ButtonLink to="/bikes" icon={<ArrowLeftOutlined />}>
        Back to bikes
      </ButtonLink>

      <Space align="center">
        <ShoppingOutlined style={{ fontSize: "1.5rem" }} />
        {isLoading ? (
          <Skeleton.Input active size="large" />
        ) : (
          <Title level={2} style={{ margin: 0 }}>
            {bike ? `${bike.brand} ${bike.model}` : "Bike not found"}
          </Title>
        )}
      </Space>

      <Card
        title="Bike information"
        style={{ alignSelf: "stretch" }}
        extra={
          <Space>
            <EditBikeButton bike={bike} updateBike={updateBike} />
            {bike && (
              <DeleteBikeButton
                bike={bike}
                label="Delete"
                deleteBike={() =>
                  deleteBike().then(() => navigate({ to: "/bikes" }))
                }
              />
            )}
          </Space>
        }
      >
        <Descriptions column={1} items={items} />
      </Card>
    </div>
  );
};
