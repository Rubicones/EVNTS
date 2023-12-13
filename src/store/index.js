import { configureStore } from "@reduxjs/toolkit";

const init = {
    events: {
        // "11/20/2023": [
        //     {
        //         date_end: "11/27/2023",
        //         date_start: "11/20/2023",
        //         description: "No descrsdfiption available",
        //         location: "Istanbul, Turkey",
        //         ticket_price: "$200",
        //         title: "Istanbul Blockchain Week 2023",
        //         url: "https://istanbulblockchainweek.com",
        //     },
        //     {
        //         date_end: "11/27/2023",
        //         date_start: "11/20/2023",
        //         description: "No descripfstion available",
        //         location: "Istanbul, Turkey",
        //         ticket_price: "$200",
        //         title: "Istanbul Blockchain Week 2023",
        //         url: "https://istanbulblockchainweek.com",
        //     },
        //     {
        //         date_end: "11/27/2023",
        //         date_start: "11/20/2023",
        //         description: "No descripfsdtion available",
        //         location: "Istanbul, Turkey",
        //         ticket_price: "$200",
        //         title: "Istanbul Blockchain Week 2023",
        //         url: "https://istanbulblockchainweek.com",
        //     },
        // ],
    },
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

        default:
            return state;
    }
};
const store = configureStore({ reducer: reducer });

export default store;
