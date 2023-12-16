import { configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const init = {
    events: {},
    uniqueEvents: {},
    selectedDate: dayjs().format("MM/DD/YYYY"),
    selectedEvent: null
};
const reducer = (state = init, action) => {
    switch (action.type) {
        case "ADD":
            const date = action.payload.date;
            const info = action.payload.info;

            if (
                !state.events[date] ||
                !state.events[date].some(
                    (existingInfo) =>
                        JSON.stringify(existingInfo) === JSON.stringify(info)
                )
            ) {
                return {
                    ...state,
                    events: {
                        ...state.events,
                        [date]: [...(state.events[date] || []), info],
                    },
                };
            }

            return state;
        case "SELECT_DATE": // into payload pass date in MM/DD/YYYY format
            return {...state, selectedDate: action.payload}
        case "SELECT_EVENT": // into payload pass id of the event selected
            return {...state, selectedEvent: action.payload}
        default:
            return state;
    }
};
const store = configureStore({ reducer: reducer });

export default store;
