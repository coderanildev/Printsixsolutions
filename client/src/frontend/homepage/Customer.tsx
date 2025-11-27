import React from "react";
import { Link, Outlet } from "react-router-dom";

const CustomerLayout: React.FC = () => {
  return (
    <div className="container customer-container d-flex"  style={{ marginLeft: "75px" }}>
      <div className="text-white p-3" style={{ minHeight: "80vh", width: "255px", backgroundColor: "#1f2937" }}>
        <h4 className="mb-4 text-white">My Account</h4>
        <ul className="list-unstyled">
          <li><Link to="/customer/profile" className="text-white d-block py-2">👤 Profile</Link></li>
          <li><Link to="/customer/orders" className="text-white d-block py-2">📦 Orders</Link></li>
          <li><Link to="/customer/address" className="text-white d-block py-2">🏠 Addresses</Link></li>
          <li><Link to="/customer/changepassword" className="text-white d-block py-2">🔑 Change Password</Link></li>
          <li><Link to="/customer/logout" className="text-white d-block py-2">🚪 Logout</Link></li>
        </ul>
      </div>

      <div className="content flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
