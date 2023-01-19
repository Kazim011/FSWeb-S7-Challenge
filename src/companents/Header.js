import React from "react";
import { Link } from "react-router-dom";
import logo from "./image/logo.png";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <div className="nav-link">
            <Link className="link" to="/">
              Ana Sayfa
            </Link>
            <Link className="link" to="/pizza" id="order-pizza">
              Sipariş
            </Link>
          </div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="nav-link">
            <Link className="link" to="/About">
              Hakkımızda
            </Link>
            <Link className="link">İletişim</Link>
          </div>
        </nav>
      </header>
    </>
  );
}
