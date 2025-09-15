import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

// Importing components
import Sidebar from "../app/Sidebar";
import Header from "../app/Header";
import Footer from "../app/Footer";

// Importing CSS files
import "../../assets/css/admin.css";

//Importing icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from "react";

export default function DashboardLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const [sidebarHidden, setSidebarHidden] = useState(false);

    return (
        <>
            <Sidebar hidden={sidebarHidden} />
            <div className="wrapper d-flex flex-column min-vh-100">
                <Header toggleSidebar={() => setSidebarHidden((prev) => !prev)} />
                <div className="body flex-grow-1">
                    <div className="container-lg px-4">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}