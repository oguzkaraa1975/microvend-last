import { Navigate, useLocation } from "react-router-dom";

type RedirectWithQueryProps = {
  to: string;
};

function RedirectWithQuery({ to }: RedirectWithQueryProps) {
  const { search } = useLocation();

  return <Navigate to={`${to}${search}`} replace />;
}

export default RedirectWithQuery;
