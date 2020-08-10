import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import TicketContext from "../../context/ticket/ticketContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const ticketContext = useContext(TicketContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearTickets } = ticketContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearTickets();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.displayName} !</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {/* <li>
        <Link to='/about'>About</Link>
      </li> */}
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          {"     "}|{"     "}
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Incident Management System",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
