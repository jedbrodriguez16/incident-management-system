import {
  GET_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TICKET,
  FILTER_TICKETS,
  CLEAR_FILTER,
  TICKET_ERROR,
  CLEAR_TICKETS,
  GET_SYSTEM_USERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false,
      };
    case ADD_TICKET:
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        loading: false,
      };
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
        loading: false,
      };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
        loading: false,
      };
    case CLEAR_TICKETS:
      return {
        ...state,
        tickets: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_TICKETS:
      return {
        ...state,
        filtered: state.tickets.filter((ticket) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return ticket.title.match(regex) || ticket.description.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case TICKET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SYSTEM_USERS:
      return {
        ...state,
        systemUsers: action.payload,
      };
    default:
      return state;
  }
};
