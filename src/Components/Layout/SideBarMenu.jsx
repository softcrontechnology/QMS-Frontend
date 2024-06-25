import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Link } from "react-router-dom";

const SideBarMenu = () => {
  const [activeIndexMainMenu, setActiveMainMenu] = useState(null);

  const toggleMainMenu = (index) => {
    setActiveMainMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {/* Menu */}
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo ">
          <a href="index.html" className="app-brand-link">
            <span className="app-brand-logo demo">
              <svg
                width={32}
                height={22}
                viewBox="0 0 32 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                  fill="#7367F0"
                />
                <path
                  opacity="0.06"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                  fill="#161616"
                />
                <path
                  opacity="0.06"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                  fill="#161616"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                  fill="#7367F0"
                />
              </svg>
            </span>
            <span className="app-brand-text demo menu-text fw-bold">Vuexy</span>
          </a>
          <a
            href="!#"
            className="layout-menu-toggle menu-link text-large ms-auto"
          >
            <i className="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle" />
            <i className="ti ti-x d-block d-xl-none ti-sm align-middle" />
          </a>
        </div>
        <div className="menu-inner-shadow" />
        <PerfectScrollbar>
          <ul className="menu-inner py-1">
            {/* Dashboards */}
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <i className="menu-icon tf-icons ti ti-smart-home" />
                <div data-i18n="Dashboards">Dashboard</div>
              </Link>
            </li>

            {/* Product menu start */}
            <li
              className={`menu-item ${activeIndexMainMenu === 0 ? "open" : ""}`}
              onClick={() => toggleMainMenu(0)}
            >
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                {/* <i className="menu-icon tf-icons ti ti-shopping-cart" /> */}
                <div data-i18n="eCommerce">Token management</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <Link to="/products-list" className="menu-link">
                    <div data-i18n="Product List">Generate Token</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/add-product" className="menu-link">
                    <div data-i18n="Add Product"> Today Token List</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/category" className="menu-link">
                    <div data-i18n="Category List">Display Queue</div>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Product menu end */}

            <li className="menu-item">
              <Link to="/order-list" className="menu-link">
                {/* <i className="menu-icon tf-icons ti ti-shopping-cart" /> */}
                <div data-i18n="Order">Logout</div>
              </Link>
            </li>
          </ul>
        </PerfectScrollbar>
      </aside>
      {/* / Menu */}
    </>
  );
};

export default SideBarMenu;