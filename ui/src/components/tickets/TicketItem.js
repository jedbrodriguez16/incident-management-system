import React, { useContext } from "react";
import PropTypes from "prop-types";
import TicketContext from "../../context/ticket/ticketContext";
import AuthContext from "../../context/auth/authContext";
import * as moment from "moment";

const TicketItem = ({ ticket }) => {
  const ticketContext = useContext(TicketContext);
  const authContext = useContext(AuthContext);

  const { deleteTicket, setCurrent, clearCurrent } = ticketContext;
  const { user } = authContext;

  const {
    id,
    title,
    description,
    status,
    assignedTo,
    resolutionComment,
    createdDate,
    createdBy,
    updatedDate,
  } = ticket;

  const onDelete = () => {
    deleteTicket(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <span>Title: {title}</span>
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
        <li>
          <span>Description: {description}</span>
        </li>
        <li>
          <span>Assignee: {assignedTo || "Unassigned"}</span>
        </li>
        <li>
          <span>Updated Date: {moment(updatedDate).calendar()}</span>
        </li>
        <li>
          <span>Reported by: {createdBy}</span>
        </li>
        <li>
          <span>Reported Date: {moment(createdDate).calendar()}</span>
        </li>
        {resolutionComment && (
          <li>
            <span>Resolution: {resolutionComment}</span>
          </li>
        )}
      </ul>
      <p>
        {user && user.role === "admin" && (
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        )}

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
