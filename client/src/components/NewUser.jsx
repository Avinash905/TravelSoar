import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../styles/newuser.css";
import Register from "../pages/Register";

function NewUser() {
  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="new-user-container flex-center">
          <Register
            title={"Add new user"}
            signup={false}
            btntext={"add user"}
          />
        </div>
      </div>
    </>
  );
}

export default NewUser;
