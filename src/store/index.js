import { configureStore } from "@reduxjs/toolkit";

const init = {
    events: {},
    uniqueEvents: {},
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
        case "SELECT":
            return {...state, selectedEvent: action.payload}

        default:
            return state;
    }
};
const store = configureStore({ reducer: reducer });

export default store;
