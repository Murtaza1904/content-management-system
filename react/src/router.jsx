import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Auth/Login";
import ForgotPassword from "./views/Auth/ForgotPassword";
//Roles
import RoleIndex from "./views/Admin/Roles/Index";
import RoleCreate from "./views/Admin/Roles/Create";
import RoleDetail from "./views/Admin/Roles/Detail";
import RoleEdit from "./views/Admin/Roles/Edit";
//Users
import UserIndex from "./views/Admin/Users/Index";
import UserCreate from "./views/Admin/Users/Create";
import UserDetail from "./views/Admin/Users/Detail";
import UserEdit from "./views/Admin/Users/Edit";

import NotFound from "./views/Errors/NotFound";
import GuestLayout from "./components/layouts/GuestLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ErrorLayout from "./components/layouts/ErrorLayout";
import Dashboard from "./views/Dashboard";
import Info from "./views/Admin/Profile/Info";

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
                path: "/forgot-password",
                element: <ForgotPassword />
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
            //Dashboard
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            //Profile
            {
                path: "/profile",
                element: <Info />
            },
            //Roles Management
            {
                path: "/roles",
                element: <RoleIndex />
            },
            {
                path: "/roles/create",
                element: <RoleCreate />
            },
            {
                path: "/roles/:id",
                element: <RoleDetail />
            },
            {
                path: "/roles/:id/edit",
                element: <RoleEdit />
            },
            //Users Management
            {
                path: "/users",
                element: <UserIndex />
            },
            {
                path: "/users/create",
                element: <UserCreate />
            },
            {
                path: "/users/:id",
                element: <UserDetail />
            },
            {
                path: "/users/:id/edit",
                element: <UserEdit />
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