import React, { useContext, useRef, useEffect } from "react";
import TicketContext from "../../context/ticket/ticketContext";

const TicketFilter = () => {
  const ticketContext = useContext(TicketContext);
  const text = useRef("");

  const { filterTickets, clearFilter, filtered } = ticketContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterTickets(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Tickets...'
        onChange={onChange}
      />
    </form>
  );
};

export default TicketFilter;
