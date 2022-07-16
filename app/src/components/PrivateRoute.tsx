import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
    children?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
