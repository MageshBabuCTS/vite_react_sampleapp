import { Navigate, Outlet } from "react-router";
import AdminLayout from './AdminLayout';
import CustomerLayout from './CustomerLayout';
import DefaultLayout from './DefaultLayout';

export default function ProtectedRoute() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("ProtectedRoute user:", user.role);
    const isAuthenticated = !!localStorage.getItem('jwt') && user?.role;
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Select layout based on user role
    const getLayout = () => {
        switch (user.role) {
            case 'Admin':
                return AdminLayout;
            case 'customer':
                return CustomerLayout;
            default:
                return DefaultLayout;
        }
    };

    const Layout = getLayout();
    
    return Layout ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Outlet />
    );
}