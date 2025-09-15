import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

// Importing CSS files
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" />;
    }
    
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}