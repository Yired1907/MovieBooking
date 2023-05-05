import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { USER_INFO } from "../../util/setting/config";
function CheckoutTemplate() {
  if (!localStorage.getItem(USER_INFO)) {
    return <Navigate to="/login/sign-in" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CheckoutTemplate;
