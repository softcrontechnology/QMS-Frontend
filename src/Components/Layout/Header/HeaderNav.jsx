import React from 'react';
import StyleSwitcher from './StyleSwitcher'
import Notification from './Notification'
import Profile from './Profile'


const HeaderNav = () => {
    


    return (
        <>
            
            <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                        <i className="ti ti-menu-2 ti-sm" />
                    </a>
                </div>


                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                    { /* Search */}
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item navbar-search-wrapper mb-0">
                            <a className="nav-item nav-link search-toggler d-flex align-items-center px-0" href="!#">
                                <i className="ti ti-search ti-md me-2" />
                                <span className="d-none d-md-inline-block text-muted">Search (Ctrl+/)</span>
                            </a>
                        </div>
                    </div>
                    { /* /Search */}

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* Style Switcher */}
                        <StyleSwitcher />
                        { /* / Style Switcher*/}

                        { /* Notification */}
                        <Notification />
                        { /* Notification */}

                        { /* User */}
                        <Profile />
                        { /* User */}
                    </ul>
                </div>


                { /* Search Small Screens */}
                <div className="navbar-search-wrapper search-input-wrapper d-none">
                    <input type="text" className="form-control search-input container-xxl border-0" placeholder="Search..." aria-label="Search..." />
                    <i className="ti ti-x ti-sm search-toggler cursor-pointer" />
                </div>
            </nav>
        </>
    )
}

export default HeaderNav