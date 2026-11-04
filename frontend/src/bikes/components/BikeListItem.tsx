import { EyeOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Col, Row, Space, Tag } from "antd";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { ListItem } from "../../shared/components/ListItem";
import type { BikeModel } from "../models/BikeModel";
import { formatPrice } from "../utils/formatPrice";
import { DeleteBikeButton } from "./DeleteBikeButton";

interface BikeListItemProps {
  bike: BikeModel;
  deleteBike: (id: string) => Promise<unknown>;
}

export const BikeListItem = ({ bike, deleteBike }: BikeListItemProps) => {
  return (
    <ListItem>
      <Col span={9} style={{ display: "flex", alignItems: "center" }}>
        <Space orientation="vertical" size={0} align="start">
          <strong>{bike.brand}</strong>
          {bike.model}
        </Space>
      </Col>
      <Col span={5} style={{ display: "flex", alignItems: "center" }}>
        <Space size={4}>
          <Tag color="blue" style={{ margin: 0 }}>
            {bike.category}
          </Tag>
          {bike.electric && (
            <Tag
              color="green"
              icon={<ThunderboltOutlined />}
              style={{ margin: 0 }}
            >
              Electric
            </Tag>
          )}
        </Space>
      </Col>
      <Col
        span={5}
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {formatPrice(bike.priceCents)}
      </Col>
      <Col span={5}>
        <Row gutter={[4, 4]} justify="end">
          <Col>
            <ButtonLink to="/bikes/$bikeId" params={{ bikeId: bike.id }}>
              <EyeOutlined />
            </ButtonLink>
          </Col>
          <Col>
            <DeleteBikeButton
              bike={bike}
              deleteBike={() => deleteBike(bike.id)}
            />
          </Col>
        </Row>
      </Col>
    </ListItem>
  );
};
