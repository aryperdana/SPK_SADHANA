import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";

const Sidebar = (props) => {
  const [menu, setMenu] = useState({});

  const toggleMenuState = (menuState) => {
    if (menu[menuState]) {
      setMenu({ [menuState]: false });
    } else if (Object.keys(menu).length === 0) {
      setMenu({ [menuState]: true });
    } else {
      Object.keys(menu).forEach((i) => {
        setMenu({ [i]: false });
      });
      setMenu({ [menuState]: true });
    }
  };

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(menu).forEach((i) => {
      setMenu({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", menu: "appsMenuOpen" },
      { path: "/basic-ui", menu: "basicUiMenuOpen" },
      { path: "/advanced-ui", menu: "advancedUiMenuOpen" },
      { path: "/form-elements", menu: "formElementsMenuOpen" },
      { path: "/tables", menu: "tablesMenuOpen" },
      { path: "/maps", menu: "mapsMenuOpen" },
      { path: "/icons", menu: "iconsMenuOpen" },
      { path: "/charts", menu: "chartsMenuOpen" },
      { path: "/user-pages", menu: "userPagesMenuOpen" },
      { path: "/error-pages", menu: "errorPagesMenuOpen" },
      { path: "/master", menu: "generalMasterMenuOpen" },
      { path: "/ecommerce", menu: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setMenu({ [obj.menu]: true });
      }
    });
  };

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  };

  useEffect(() => {
    onRouteChanged();

    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className={isPathActive("/dashboard") ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">
              <Trans>Dashboard</Trans>
            </span>
            <i className="mdi mdi-home menu-icon"></i>
          </Link>
        </li>
        <li className={isPathActive("/basic-ui") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.basicUiMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("basicUiMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Basic UI Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-crosshairs-gps menu-icon"></i>
          </div>
          <Collapse in={menu.basicUiMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/basic-ui/buttons") ? "nav-link active" : "nav-link"}
                  to="/basic-ui/buttons"
                >
                  <Trans>Buttons</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive("/basic-ui/dropdowns") ? "nav-link active" : "nav-link"}
                  to="/basic-ui/dropdowns"
                >
                  <Trans>Dropdowns</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive("/basic-ui/typography") ? "nav-link active" : "nav-link"}
                  to="/basic-ui/typography"
                >
                  <Trans>Typography</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/form-elements") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.formElementsMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Form Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
          </div>
          <Collapse in={menu.formElementsMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/form-elements/basic-elements") ? "nav-link active" : "nav-link"
                  }
                  to="/form-elements/basic-elements"
                >
                  <Trans>Basic Elements</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/tables") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.tablesMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("tablesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Tables</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-table-large menu-icon"></i>
          </div>
          <Collapse in={menu.tablesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/tables/basic-table") ? "nav-link active" : "nav-link"}
                  to="/tables/basic-table"
                >
                  <Trans>Basic Table</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/icons") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("iconsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Icons</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-contacts menu-icon"></i>
          </div>
          <Collapse in={menu.iconsMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/icons/mdi") ? "nav-link active" : "nav-link"}
                  to="/icons/mdi"
                >
                  <Trans>Material</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/charts") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.chartsMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("chartsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Charts</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-chart-bar menu-icon"></i>
          </div>
          <Collapse in={menu.chartsMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/charts/chart-js") ? "nav-link active" : "nav-link"}
                  to="/charts/chart-js"
                >
                  <Trans>Chart Js</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/user-pages") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.userPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("userPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>User Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-lock menu-icon"></i>
          </div>
          <Collapse in={menu.userPagesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/user-pages/login-1") ? "nav-link active" : "nav-link"}
                  to="/user-pages/login-1"
                >
                  <Trans>Login</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/user-pages/register-1") ? "nav-link active" : "nav-link"
                  }
                  to="/user-pages/register-1"
                >
                  <Trans>Register</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/user-pages/lockscreen") ? "nav-link active" : "nav-link"
                  }
                  to="/user-pages/lockscreen"
                >
                  <Trans>Lockscreen</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/error-pages") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.errorPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("errorPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Error Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-security menu-icon"></i>
          </div>
          <Collapse in={menu.errorPagesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/error-pages/error-404") ? "nav-link active" : "nav-link"
                  }
                  to="/error-pages/error-404"
                >
                  404
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isPathActive("/error-pages/error-500") ? "nav-link active" : "nav-link"
                  }
                  to="/error-pages/error-500"
                >
                  500
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/master") ? "nav-item active" : "nav-item"}>
          <div
            className={menu.generalMasterMenuOpen ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("generalMasterMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Master</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-server menu-icon"></i>
          </div>
          <Collapse in={menu.generalMasterMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={isPathActive("/master/jabatan") ? "nav-link active" : "nav-link"}
                  to="/master/jabatan"
                >
                  <Trans>Jabatan</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive("/master/karyawan") ? "nav-link active" : "nav-link"}
                  to="/master/karyawan"
                >
                  <Trans>Karyawan</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={isPathActive("/master/kriteria") ? "nav-link active" : "nav-link"}
                  to="/master/kriteria"
                >
                  <Trans>Kriteria</Trans>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={isPathActive("/master/kriteria") ? "nav-link active" : "nav-link"}
                  to="/master/kriteria"
                >
                  <Trans>Nilai Kriteria</Trans>
                </Link>
              </li> */}
            </ul>
          </Collapse>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="menu-title">
              <Trans>Documentation</Trans>
            </span>
            <i className="mdi mdi-file-document-box menu-icon"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

// export default SidebarConst

export default withRouter(Sidebar);
