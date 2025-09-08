import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function DashboardLayout() {
    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    
    return (
        <div>
            <Outlet />
        </div>
    );
}