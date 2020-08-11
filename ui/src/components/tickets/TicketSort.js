import React, { useContext, useState } from "react";
import TicketContext from "../../context/ticket/ticketContext";

const TicketSort = () => {
  const ticketContext = useContext(TicketContext);

  const { sortTickets } = ticketContext;

  const [sortBy, setSortBy] = useState("date");

  const onChange = (e) => {
    sortTickets(e.target.value);
    setSortBy(e.target.value);
  };

  return (
    <select value={sortBy} onChange={onChange}>
      <option key='date' value='date'>
        Date
      </option>
      <option key='assignee' value='assignee'>
        Assignee
      </option>
      <option key='status' value='status'>
        Status
      </option>
    </select>
  );
};

export default TicketSort;
