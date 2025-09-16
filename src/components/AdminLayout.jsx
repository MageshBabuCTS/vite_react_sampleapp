import { Outlet, NavLink } from "react-router"; // Changed Link to NavLink
import ProfileIcon from './ProfileIcon';
import { logout } from '../utils/auth';
import { useState } from "react";

function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`grid-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="grid-item sidebar">                
                <div className="hamburger" onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>                   
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/home" className={({ isActive }) => isActive ? "active-nav-link" : ""} >Admin Home</NavLink></li>
                        <li><NavLink to="/add-product" className={({ isActive }) => isActive ? "active-nav-link" : ""} >Add Product</NavLink></li>   
                        <li> <button onClick={logout}>Logout</button></li>                   
                    </ul>
                </nav>
            </div>
            <div className="grid-item header">
                <h1>Admin Header</h1>
            </div>
            <div className="grid-item main-content">
                <Outlet/>
            </div>
            <div className="grid-item footer">
               Admin Footer
            </div>
        </div>
    );
}

export default AdminLayout;