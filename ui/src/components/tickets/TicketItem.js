import React, { useContext } from "react";
import PropTypes from "prop-types";
import TicketContext from "../../context/ticket/ticketContext";

const TicketItem = ({ ticket }) => {
  const ticketContext = useContext(TicketContext);
  const { deleteTicket, setCurrent, clearCurrent } = ticketContext;

  const { id, title, description, status } = ticket;

  const onDelete = () => {
    deleteTicket(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{" "}
        {/* <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span> */}
        <span
          style={{ float: "right" }}
          className={
            "badge " + (status === "New" ? "badge-success" : "badge-primary")
          }
        >
          {status}
        </span>
      </h3>
      <ul className='list'>
        {/* {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )} */}
        {description && (
          <li>
            <i className='fas fa-description' /> {description}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
        <button
          style={{ float: "right" }}
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(ticket)}
        >
          Select
        </button>
      </p>
    </div>
  );
};

TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default TicketItem;
