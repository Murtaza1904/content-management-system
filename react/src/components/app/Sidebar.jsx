import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ hidden }) {
  const [narrowUnfoldable, setNarrowUnfoldable] = useState(false);

  const toggleNarrow = () => {
    setNarrowUnfoldable((prev) => !prev);
  };
  return (
    <>
      <div className={`sidebar sidebar-dark sidebar-fixed border-end ${hidden ? "hide" : ""} ${narrowUnfoldable ? "sidebar-narrow-unfoldable" : ""}`} id="sidebar">
        <div className="sidebar-header border-bottom">
          <div className="sidebar-brand">
            <h5 className="sidebar-brand-full">CMS</h5>
            <h5 className="sidebar-brand-narrow">CMS</h5>
          </div>
          <button className="btn-close d-lg-none" type="button" aria-label="Close"></button>
        </div>
        <ul className="sidebar-nav">
          <li className="nav-item">
            <NavLink className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} to="/dashboard">
              <i className="bi bi-house-gear nav-icon"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-title">Management</li>
          <li className="nav-item">
            <NavLink className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} to="/roles">
              <i className="bi bi-person-badge nav-icon"></i> Roles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} to="/users">
              <i className="bi bi-people nav-icon"></i> Users
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer border-top d-none d-md-flex">
          <button className="sidebar-toggler" type="button" onClick={toggleNarrow}></button>
        </div>
      </div>
    </>
  );
}