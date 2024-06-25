import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

const Notification = () => {
    return (
        <>
            { /* Notification */}
            <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
                <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <i className="ti ti-bell ti-md" />
                    <span className="badge bg-danger rounded-pill badge-notifications">5</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end py-0">
                    <li className="dropdown-menu-header border-bottom">
                        <div className="dropdown-header d-flex align-items-center py-3">
                            <h5 className="text-body mb-0 me-auto">Notification</h5>
                            <a href="javascript:void(0)" className="dropdown-notifications-all text-body" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read"><i className="ti ti-mail-opened fs-4" /></a>
                        </div>
                    </li>
                    <PerfectScrollbar>
                        <li className="dropdown-notifications-list scrollable-container">
                            <ul className="list-group list-group-flush">
                                
                                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar">
                                                <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">Charles Franklin</h6>
                                            <p className="mb-0">Accepted your connection</p>
                                            <small className="text-muted">12hr ago</small>
                                        </div>
                                        <div className="flex-shrink-0 dropdown-notifications-actions">
                                            <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot" /></a>
                                            <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="ti ti-x" /></a>
                                        </div>
                                    </div>
                                </li>
                                
                                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar">
                                                <span className="avatar-initial rounded-circle bg-label-success"><i className="ti ti-shopping-cart" /></span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">Whoo! You have new order 🛒 </h6>
                                            <p className="mb-0">ACME Inc. made new order $1,154</p>
                                            <small className="text-muted">1 day ago</small>
                                        </div>
                                        <div className="flex-shrink-0 dropdown-notifications-actions">
                                            <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot" /></a>
                                            <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="ti ti-x" /></a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </PerfectScrollbar>
                    <li className="dropdown-menu-footer border-top">
                        <a href="javascript:void(0);" className="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center">
                            View all notifications
                        </a>
                    </li>
                </ul>
            </li>
            { /*/ Notification */}
        </>
    )
}

export default Notification