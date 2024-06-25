import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl">
          <div className="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column">
            <div>
              © 2024 , made with ❤️ by{" "}
              <a
                href="https://www.softcron.com"
                rel="noreferrer"
                target="_blank"
                className="footer-link text-primary fw-medium"
              >
                Softcron
              </a>
            </div>
            <div className="d-none d-lg-inline-block">
              <a href="!#" className="footer-link me-4" target="_blank">
                License
              </a>
              <a href="!#" className="footer-link me-4">
                More Themes
              </a>
              <a href="!#" className="footer-link me-4">
                Documentation
              </a>
              <a href="!#" className="footer-link d-none d-sm-inline-block">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer End */}
    </>
  );
};

export default Footer;
