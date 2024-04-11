import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectIsAuth } from "./auth/services/auth.selectors";

const IndexPage: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isAuth &&
      (location.pathname === "/" || location.pathname === "/auth")
    ) {
      navigate("/contacts");
    }

    if (
      !isAuth &&
      (location.pathname === "/" || location.pathname.startsWith("/contacts"))
    ) {
      navigate("/auth");
    }
  }, [isAuth]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default IndexPage;
