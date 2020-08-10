import React, { useContext, useEffect } from "react";
import Tickets from "../tickets/Tickets";
import TicketDetail from "../tickets/TicketDetail";
import TicketFilter from "../tickets/TicketFilter";

const Home = () => {
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
