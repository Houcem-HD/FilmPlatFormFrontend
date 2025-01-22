import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// i18n
import { withTranslation } from "react-i18next";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = (props) => {
  const [menu, setMenu] = useState(false); // State for dropdown menu
  
  const user = localStorage.getItem("User");
  const parsedUser = JSON.parse(user);
  const name = parsedUser.name;
  
  const [username, setUsername] = useState(name); // Default username

  useEffect(() => {
    const data = localStorage.getItem("authUser");
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Safely parse the data
        const defaultAuth = import.meta.env.VITE_APP_DEFAULTAUTH;

        if (defaultAuth === "firebase") {
          setUsername(parsedData?.email || "Guest");
        } else if (defaultAuth === "fake" || defaultAuth === "jwt") {
          setUsername(parsedData?.username || "Guest");
        } else {
          setUsername(parsedData?.name || "Guest");
        }
      } catch (e) {
        console.error("Error parsing authUser data:", e);
        setUsername("Guest"); // Fallback for malformed data
      }
    }
  }, [props.success]); // Re-run when `props.success` changes

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
