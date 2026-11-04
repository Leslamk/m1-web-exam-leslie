import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useState } from "react";
import type { CustomerModel } from "../models/CustomerModel";

interface DeleteCustomerButtonProps {
  customer: CustomerModel;
  deleteCustomer: (id: string) => void | Promise<unknown>;
}
export const DeleteCustomerButton = ({
  customer,
  deleteCustomer,
}: DeleteCustomerButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCancel = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
    Promise.resolve(deleteCustomer(customer.id))
      .then(() => message.success("Customer deleted"))
      .catch(() => message.error("The customer could not be deleted"));
  };

  return (
    <>
      <Button
        danger
        aria-label={`Delete ${customer.firstName} ${customer.lastName}`}
        onClick={() => setIsOpen(true)}
      >
        <DeleteOutlined />
      </Button>
      <Modal
        okButtonProps={{ danger: true }}
        open={isOpen}
        title={`Deleting ${customer.firstName}`}
        onCancel={onCancel}
        onOk={onConfirm}
        okText="Yes, delete"
      >
        You are about to delete the customer {customer.lastName}{" "}
        {customer.firstName}. This action cannot be undone, are you sure ?
      </Modal>
    </>
  );
};
