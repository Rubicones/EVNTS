"use client";
import Image from "next/image";
import styles from "./page.module.sass";
import WeekWrapper from "./uikit/week/week";
import store from "@/store/";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";

const GET_EVENTS = "https://events.vortex.foundation/events";

export default function Home() {
    useEffect(() => {
        const getEvents = async () => {
            const eventsArr = await fetch(GET_EVENTS).then((res) => res.json());
            eventsArr.data.forEach((ev) => {
                store.dispatch({
                    type: "ADD",
                    payload: { date: ev.date_start, info: ev },
                });
                if (ev.date_end) {
                    let start = dayjs(ev.date_start, "MM/DD/YYYY");
                    let end = dayjs(ev.date_end, "MM/DD/YYYY");

                    while (!start.isSame(end, "day")) {
                        start = start.add(1, "day");
                        store.dispatch({
                            type: "ADD",
                            payload: {
                                date: start.format("MM/DD/YYYY"),
                                info: ev,
                            },
                        });
                    }

                    store.dispatch({
                        type: "ADD",
                        payload: {
                            date: ev.date_end,
                            info: ev,
                        },
                    });
                }
            });
        };
        getEvents();
    }, []);

    return (
        <Provider store={store}>
            <WeekWrapper />
        </Provider>
    );
}
