import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectIsAuth } from "./auth/services/auth.selectors";
import { useLazyGetUserDataQuery } from "./auth/services/auth.api";
import Loader from "../components/loader";
import s from "./index.module.css";

const IndexPage: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [getUserData, { data: user }] = useLazyGetUserDataQuery();

  useEffect(() => {
    if (isAuth && (pathname === "/" || pathname === "/auth")) {
      navigate("/contacts", { replace: true });
    }

    if (!isAuth && (pathname === "/" || pathname.startsWith("/contacts"))) {
      navigate("/auth", { replace: true });
    }

    if (isAuth) getUserData();
  }, [isAuth, pathname]);

  if (isAuth && !user) {
    return <Loader className={s.loader} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default IndexPage;
