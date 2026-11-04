import { ContactsOutlined } from "@ant-design/icons";
import { Col, Pagination, Row, Skeleton, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useCustomersProvider } from "../providers/useCustomersProvider";
import { AddCustomerButton } from "./AddCustomerButton";
import { CustomerListItem } from "./CustomerListItem";

export const CustomersList = () => {
  const {
    customers,
    totalCount,
    page,
    pageSize,
    deleteCustomer,
    createCustomer,
    isLoading,
    load,
  } = useCustomersProvider();

  useEffect(() => {
    load();
  }, []);

  return (
    <Space
      orientation="vertical"
      size="middle"
      style={{ padding: ".25rem .5rem" }}
    >
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Space align="center">
            <ContactsOutlined style={{ fontSize: "1.5rem" }} />
            <Title level={2} style={{ margin: 0 }}>
              Customers
            </Title>
            <Tag>{totalCount}</Tag>
          </Space>
        </Col>
        <Col>
          <AddCustomerButton createCustomer={createCustomer} />
        </Col>
      </Row>
      {isLoading ? (
        <Skeleton />
      ) : (
        customers.map((customer) => (
          <CustomerListItem
            key={customer.id}
            customer={customer}
            deleteCustomer={deleteCustomer}
          />
        ))
      )}
      <Row justify="end">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalCount}
          showSizeChanger={false}
          onChange={(nextPage) => load(nextPage)}
        />
      </Row>
    </Space>
  );
};
