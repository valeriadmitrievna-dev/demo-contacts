import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectIsAuth } from "./auth/services/auth.selectors";
import { useLazyGetUserDataQuery } from "./auth/services/auth.api";
import Loader from "../components/loader";

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
  }, [isAuth, pathname]);

  useEffect(() => {
    if (isAuth && !user) getUserData();
  }, [isAuth, user]);

  if (isAuth && !user) {
    return <Loader page />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default IndexPage;
