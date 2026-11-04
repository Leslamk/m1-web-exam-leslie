import {
  EuroOutlined,
  EyeOutlined,
  ShoppingOutlined,
  TagOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
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
      <Col span={10}>
        <Space orientation="horizontal" style={{ width: "100%" }}>
          <ShoppingOutlined />
          {`${bike.brand} ${bike.model}`}
          {bike.electric && <ThunderboltOutlined aria-label="Electric" />}
        </Space>
      </Col>
      <Col span={6}>
        <Space orientation="horizontal" style={{ width: "100%" }}>
          <TagOutlined />
          {bike.category}
        </Space>
      </Col>
      <Col span={4}>
        <Space orientation="horizontal" style={{ width: "100%" }}>
          <EuroOutlined />
          {formatPrice(bike.priceCents)}
        </Space>
      </Col>
      <Col span={4}>
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
