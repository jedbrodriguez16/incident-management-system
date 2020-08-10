import React, { useContext, useEffect } from "react";
import Tickets from "../tickets/Tickets";
import TicketDetail from "../tickets/TicketDetail";
import TicketFilter from "../tickets/TicketFilter";
import TicketContext from "../../context/ticket/ticketContext";

const Home = () => {
  const ticketContext = useContext(TicketContext);

  const { getSystemUsers } = ticketContext;

  useEffect(() => {
    getSystemUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <TicketFilter />
        <Tickets />
      </div>
      <div>
        <TicketDetail />
      </div>
    </div>
  );
};

export default Home;
