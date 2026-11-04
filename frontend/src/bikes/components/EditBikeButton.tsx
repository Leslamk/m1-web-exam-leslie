import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import type { BikeModel, CreateBikeModel } from "../models/BikeModel";
import { BikeFormModal } from "./BikeFormModal";

interface EditBikeButtonProps {
  bike: BikeModel | null;
  updateBike: (input: CreateBikeModel) => Promise<unknown>;
}

export const EditBikeButton = ({ bike, updateBike }: EditBikeButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        icon={<EditOutlined />}
        disabled={!bike}
        onClick={() => setIsOpen(true)}
      >
        Edit
      </Button>
      <BikeFormModal
        open={isOpen}
        title="Edit bike"
        okText="Save"
        bike={bike}
        onCancel={() => setIsOpen(false)}
        onSubmit={updateBike}
      />
    </>
  );
};
