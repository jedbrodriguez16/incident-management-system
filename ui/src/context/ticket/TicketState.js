import React, { useReducer } from "react";
import axios from "axios";
import TicketContext from "./ticketContext";
import ticketReducer from "./ticketReducer";
import {
  GET_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  SET_CURRENT,
  CLEAR_CURRENT,
  ASSIGN_TICKET,
  ACKNOWLEDGE_TICKET,
  RESOLVE_TICKET,
  FILTER_TICKETS,
  CLEAR_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
} from "../types";

const TicketState = (props) => {
  const initialState = {
    tickets: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  // Get Tickets
  const getTickets = async () => {
    try {
      //todo: get incident host from config
      const res = await axios.get("http://localhost:8080/api/incidents");

      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Add Ticket
  const addTicket = async (ticket) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //todo: get incident host from config
      const res = await axios.post(
        "http://localhost:8080/api/incidents",
        ticket,
        config
      );

      dispatch({
        type: ADD_TICKET,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Delete Ticket
  const deleteTicket = async (id) => {
    try {
      //todo: get incident host from config
      await axios.delete(`http://localhost:8080/api/incidents/${id}`);

      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Assign Ticket
  const assignTicket = async (ticketId, assignee) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //todo: get incident host from config
      const res = await axios.post(
        `http://localhost:8080/api/incidents/assign`,
        { incidentId: ticketId, username: assignee },
        config
      );

      dispatch({
        type: ASSIGN_TICKET,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Acknowledge Ticket
  const acknowledgeTicket = async (ticketId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //todo: get incident host from config
      const res = await axios.post(
        `http://localhost:8080/api/incidents/acknowledge`,
        { incidentId: ticketId },
        config
      );

      dispatch({
        type: ACKNOWLEDGE_TICKET,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Resolve Ticket
  const resolveTicket = async (ticketId, resolutionComment) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //todo: get incident host from config
      const res = await axios.post(
        `http://localhost:8080/api/incidents/resolve`,
        { incidentId: ticketId, resolutionComment: resolutionComment },
        config
      );

      dispatch({
        type: RESOLVE_TICKET,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: TICKET_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Clear Tickets
  const clearTickets = () => {
    dispatch({ type: CLEAR_TICKETS });
  };

  // Set Current Ticket
  const setCurrent = (ticket) => {
    dispatch({ type: SET_CURRENT, payload: ticket });
  };

  // Clear Current Ticket
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Tickets
  const filterTickets = (text) => {
    dispatch({ type: FILTER_TICKETS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addTicket,
        deleteTicket,
        setCurrent,
        clearCurrent,
        assignTicket,
        acknowledgeTicket,
        resolveTicket,
        filterTickets,
        clearFilter,
        getTickets,
        clearTickets,
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
