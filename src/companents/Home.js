import React from "react";
import Header from "./Header";
import Section from "./Section";
import { CardMagaza } from "./Card";
import "./card.css";

export default function Home() {
  return (
    <div>
      <Header />
      <Section />
      <div className="card-div">
        <CardMagaza />
      </div>
    </div>
  );
}
