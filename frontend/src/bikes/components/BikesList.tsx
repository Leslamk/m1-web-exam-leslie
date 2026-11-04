import { ShoppingOutlined } from "@ant-design/icons";
import { Col, Empty, Pagination, Row, Skeleton, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useBikesProvider } from "../providers/useBikesProvider";
import { AddBikeButton } from "./AddBikeButton";
import { BikeListItem } from "./BikeListItem";

export const BikesList = () => {
  const {
    bikes,
    totalCount,
    page,
    pageSize,
    deleteBike,
    createBike,
    isLoading,
    load,
  } = useBikesProvider();

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
            <ShoppingOutlined style={{ fontSize: "1.5rem" }} />
            <Title level={2} style={{ margin: 0 }}>
              Bikes
            </Title>
            <Tag>{totalCount}</Tag>
          </Space>
        </Col>
        <Col>
          <AddBikeButton createBike={createBike} />
        </Col>
      </Row>
      {isLoading ? (
        <Skeleton />
      ) : bikes.length === 0 ? (
        <Empty description="No bikes yet" />
      ) : (
        bikes.map((bike) => (
          <BikeListItem key={bike.id} bike={bike} deleteBike={deleteBike} />
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
