import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { isAxiosError } from "axios";
import { useState } from "react";
import type { BikeModel } from "../models/BikeModel";

interface DeleteBikeButtonProps {
  bike: BikeModel;
  deleteBike: () => Promise<unknown>;
  // Label shown next to the icon (the list only shows the icon)
  label?: string;
}

export const DeleteBikeButton = ({
  bike,
  deleteBike,
  label,
}: DeleteBikeButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onConfirm = () => {
    setIsDeleting(true);
    deleteBike()
      .then(() => {
        setIsOpen(false);
        message.success("Bike deleted");
      })
      .catch((error) => {
        setIsOpen(false);
        if (isAxiosError(error) && error.response?.status === 409)
          message.error(
            "This bike has already been sold, it cannot be deleted",
          );
        else message.error("The bike could not be deleted");
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <>
      <Button
        danger
        icon={<DeleteOutlined />}
        aria-label={`Delete ${bike.brand} ${bike.model}`}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>
      <Modal
        okButtonProps={{ danger: true }}
        open={isOpen}
        title={`Deleting ${bike.brand} ${bike.model}`}
        onCancel={() => setIsOpen(false)}
        onOk={onConfirm}
        confirmLoading={isDeleting}
        okText="Yes, delete"
      >
        You are about to delete the bike {bike.brand} {bike.model}. This action
        cannot be undone, are you sure ?
      </Modal>
    </>
  );
};
