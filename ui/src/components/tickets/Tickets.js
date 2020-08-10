import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TicketItem from "./TicketItem";
import Spinner from "../layout/Spinner";
import TicketContext from "../../context/ticket/ticketContext";

const Tickets = () => {
  const ticketContext = useContext(TicketContext);

  const { tickets, filtered, getTickets, loading } = ticketContext;

  useEffect(() => {
    getTickets();
    // eslint-disable-next-line
  }, []);

  if (tickets !== null && tickets.length === 0 && !loading) {
    return <h4>Please add a ticket</h4>;
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
