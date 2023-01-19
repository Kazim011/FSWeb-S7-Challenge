import React from "react";
import data from "./data";
import { CardBody, CardTitle, CardSubtitle, CardText, Card } from "reactstrap";

export function CardMagaza() {
  return data.map((item) => (
    <div>
      <Card
        style={{
          width: "25rem",
        }}
      >
        <img alt="Sample" src={item.image} />
        <CardBody>
          <CardTitle tag="h5">{item.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {item.icerik}
          </CardSubtitle>
          <CardText>
            <span>{item.zaman}</span>
            <span>{item.fiyat}</span>
          </CardText>
        </CardBody>
      </Card>
    </div>
  ));
}
