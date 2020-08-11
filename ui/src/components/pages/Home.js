import React, { useContext } from "react";
import Tickets from "../tickets/Tickets";
import TicketDetail from "../tickets/TicketDetail";
import TicketFilter from "../tickets/TicketFilter";
import TicketSort from "../tickets/TicketSort";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className='grid-2'>
      <div>
        <TicketFilter />
        {user && user.role === "admin" && (
          <div>
            Sort By: <TicketSort />
          </div>
        )}
        <Tickets />
      </div>
      <div>
        <TicketDetail />
      </div>
    </div>
  );
};

export default Home;
