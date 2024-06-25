import React from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

    const UserName = localStorage.getItem("admin_name");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("admin_id");
        sessionStorage.removeItem("authToken");
        navigate('/login', { replace: true });
    };

    return (
        <>
            { /* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                        <img src="/assets/img/user.png" alt="user-img" className="h-auto rounded-circle" />
                    </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <a className="dropdown-item" href="pages-account-settings-account.html">
                            <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar avatar-online">
                                        <img src="/assets/img/user.png" alt="user-img" className="h-auto rounded-circle" />
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <span className="fw-medium d-block text-capitalize">{UserName}</span>
                                    <small className="text-muted">Admin</small>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <div className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="pages-profile-user.html">
                            <i className="ti ti-user-check me-2 ti-sm" />
                            <span className="align-middle">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="pages-account-settings-account.html">
                            <i className="ti ti-settings me-2 ti-sm" />
                            <span className="align-middle">Settings</span>
                        </a>
                    </li>
                    <li>
                        <div className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="pages-faq.html">
                            <i className="ti ti-help me-2 ti-sm" />
                            <span className="align-middle">FAQ</span>
                        </a>
                    </li>
                    <li>
                        <div className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="javascript:void(0)" onClick={handleLogout}>
                            <i className="ti ti-logout me-2 ti-sm" />
                            <span className="align-middle">Log Out</span>
                        </a>
                    </li>
                </ul>
            </li>
            { /*/ User */}
        </>
    )
}

export default Profile