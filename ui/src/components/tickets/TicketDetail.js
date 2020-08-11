import React, { useState, useContext, useEffect } from "react";
import TicketContext from "../../context/ticket/ticketContext";
import AuthContext from "../../context/auth/authContext";

const TicketDetail = () => {
  const ticketContext = useContext(TicketContext);
  const authContext = useContext(AuthContext);

  const { systemUsers, user } = authContext;

  const {
    addTicket,
    assignTicket,
    acknowledgeTicket,
    resolveTicket,
    clearCurrent,
    current,
  } = ticketContext;

  useEffect(() => {
    if (current !== null) {
      if (
        current.status === "New" &&
        current.assignedTo === null &&
        (systemUsers !== null) & (systemUsers.length > 0)
      ) {
        setTicket({
          ...current,
          assignedTo: systemUsers[0],
        });
      } else {
        setTicket(current);
      }
    } else {
      setTicket({
        title: "",
        description: "",
        assignedTo: "",
        status: "",
        resolutionComment: "",
      });
    }
  }, [ticketContext, current, systemUsers]);

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "",
    resolutionComment: "",
  });

  const { title, assignedTo, description, status, resolutionComment } = ticket;

  const onChange = (e) =>
    setTicket({ ...ticket, [e.target.name]: e.target.value });

  const onSystemUserChange = (e) => {
    setTicket({ ...ticket, assignedTo: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addTicket(ticket);
    } else {
      if (ticket.status === "New") {
        assignTicket(ticket.id, assignedTo);
      } else if (ticket.status === "Assigned") {
        acknowledgeTicket(ticket.id);
      } else if (ticket.status === "Acknowledged") {
        resolveTicket(ticket.id, resolutionComment);
      }
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? (
          "Update Ticket"
        ) : user && user.role === "admin" ? (
          "Add Ticket"
        ) : (
          <p>Please select a ticket</p>
        )}
      </h2>

      {current ? (
        <div>
          <p>
            <span>Title: {title}</span>
          </p>
          <p>
            <span>Description: {description}</span>
          </p>
          <p>
            <span>Status: {status}</span>
          </p>
          <p>
            <span>Assigned To: {current.assignedTo || "Unassigned"}</span>
          </p>
          {current.status === "New" && (
            <div>
              <h4>Assignee: </h4>
              <select value={assignedTo} onChange={onSystemUserChange}>
                {systemUsers && systemUsers.length > 0 ? (
                  systemUsers.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                ) : (
                  <option value=''></option>
                )}
              </select>
            </div>
          )}
          {current.status === "Acknowledged" && (
            <input
              type='text'
              placeholder='Resolution'
              name='resolutionComment'
              value={resolutionComment}
              onChange={onChange}
            />
          )}
        </div>
      ) : (
        user &&
        user.role === "admin" && (
          <div>
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChange}
            />
          </div>
        )
      )}

      <div>
        {current && current.status === "New" && (
          <input
            type='submit'
            value='Assign'
            className='btn btn-primary btn-block'
          />
        )}

        {current && current.status === "Assigned" && (
          <input
            type='submit'
            value='Acknowledge'
            className='btn btn-primary btn-block'
          />
        )}

        {current && current.status === "Acknowledged" && (
          <input
            type='submit'
            value='Resolve'
            className='btn btn-primary btn-block'
          />
        )}

        {current === null && user && user.role === "admin" && (
          <input
            type='submit'
            value='Add Ticket'
            className='btn btn-primary btn-block'
          />
        )}
      </div>

      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default TicketDetail;
