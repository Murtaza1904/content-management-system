import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Auth/Login";
import UserIndex from "./views/Users/Index";
import NotFound from "./views/Errors/NotFound";
import GuestLayout from "./components/layouts/GuestLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ErrorLayout from "./components/layouts/ErrorLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            //Auth
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/logout",
                element: <Login />
            },
        ],
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            //Users Management
            {
                path: "/users",
                element: <UserIndex />
            },
        ],
            
    },
    {
        path: "/",
        element: <ErrorLayout />,
        children: [
            //Error Pages
            {
                path: "*",
                element: <NotFound />
            }
        ],
    }
]);

export default router;