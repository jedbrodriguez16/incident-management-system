import React, { useState, useContext, useEffect } from "react";
import TicketContext from "../../context/ticket/ticketContext";
import AuthContext from "../../context/auth/authContext";

const TicketDetail = () => {
  const ticketContext = useContext(TicketContext);
  const authContext = useContext(AuthContext);

  const { systemUsers } = authContext;

  const { addTicket, updateTicket, clearCurrent, current } = ticketContext;

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
      });
    }
  }, [ticketContext, current]);

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "",
  });

  // const [selectedAssignee, setSelectedAssignee] = useState({ new: "new" });

  const { title, assignedTo, description, status } = ticket;

  const onChange = (e) =>
    setTicket({ ...ticket, [e.target.name]: e.target.value });

  // const onSystemUserChange = (e) => {
  //   // setSelectedAssignee(e.target.value);
  //   console.log("assignee dropdown value changed!");
  //   setTicket({ ...ticket, assignedTo: e.target.value });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addTicket(ticket);
    } else {
      updateTicket(ticket);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? "Edit Ticket" : "Add Ticket"}</h2>

      {current ? (
        <div>
          <h4>Title</h4>
          <span>{title}</span>
          <h4>Description</h4>
          <span>{description}</span>
          <h4>Status</h4>
          <span>{status}</span>
          <h4>Assigned To</h4>
          <span>{assignedTo || "Unassigned"}</span>
          {/* <h4>Assignee: </h4>
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
          </select> */}
        </div>
      ) : (
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
      )}

      <div>
        <input
          type='submit'
          value={current ? "Update Ticket" : "Add Ticket"}
          className='btn btn-primary btn-block'
        />
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
