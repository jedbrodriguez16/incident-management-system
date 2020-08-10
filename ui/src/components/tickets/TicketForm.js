import React, { useState, useContext, useEffect } from "react";
import TicketContext from "../../context/ticket/ticketContext";

const TicketForm = () => {
  const ticketContext = useContext(TicketContext);

  const { addTicket, updateTicket, clearCurrent, current } = ticketContext;

  useEffect(() => {
    if (current !== null) {
      setTicket(current);
    } else {
      setTicket({
        title: "",
        email: "",
        description: "",
        type: "personal",
      });
    }
  }, [ticketContext, current]);

  const [ticket, setTicket] = useState({
    title: "",
    email: "",
    description: "",
    type: "personal",
  });

  const { title, email, description, type } = ticket;

  const onChange = (e) =>
    setTicket({ ...ticket, [e.target.title]: e.target.value });

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
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      {/* <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      /> */}
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <h5>Assigned To</h5>
      {/* <h5>Ticket Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional */}
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

export default TicketForm;
