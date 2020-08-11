import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TicketItem from "./TicketItem";
import Spinner from "../layout/Spinner";
import TicketContext from "../../context/ticket/ticketContext";
import AuthContext from "../../context/auth/authContext";

const Tickets = () => {
  const ticketContext = useContext(TicketContext);
  const authContext = useContext(AuthContext);

  const { tickets, filtered, getTickets, loading, sortBy } = ticketContext;
  const { user } = authContext;

  useEffect(() => {
    getTickets(sortBy);
    // eslint-disable-next-line
  }, [sortBy]);

  if (tickets !== null && tickets.length === 0 && !loading) {
    if (user && user.role === "admin") {
      return <h4>Please add a ticket</h4>;
    } else {
      return <h4>No ticket has been assigned to you</h4>;
    }
  }

  return (
    <Fragment>
      {tickets !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((ticket) => (
                <CSSTransition key={ticket.id} timeout={500} classNames='item'>
                  <TicketItem ticket={ticket} />
                </CSSTransition>
              ))
            : tickets.map((ticket) => (
                <CSSTransition key={ticket.id} timeout={500} classNames='item'>
                  <TicketItem ticket={ticket} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Tickets;
