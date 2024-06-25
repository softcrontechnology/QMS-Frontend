import React from 'react'

const StyleSwitcher = () => {
    return (
        // Style Switcher start
        <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
            <a className="nav-link dropdown-toggle hide-arrow" href="!#" data-bs-toggle="dropdown">
                <i className="ti ti-md ti-sun" />
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                    <a className="dropdown-item" href="!#" data-theme="light">
                        <span className="align-middle"><i className="ti ti-sun me-2" />Light</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="!#" data-theme="dark">
                        <span className="align-middle"><i className="ti ti-moon me-2" />Dark</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="!#" data-theme="system">
                        <span className="align-middle"><i className="ti ti-device-desktop me-2" />System</span>
                    </a>
                </li>
            </ul>
        </li>
        // Style Switcher end
    )
}

export default StyleSwitcher