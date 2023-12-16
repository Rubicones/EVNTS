"use client";
import styles from "./page.module.sass";
import WeekWrapper from "./uikit/week/week";
import CalendarWrapper from "./uikit/calendar/calendar";
import store from "@/store/";
import { Provider } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import UpcomingEvents from "./uikit/upcomingEvents/upcomingEvents";
import { ThemeProvider, Text } from "@gravity-ui/uikit";
import { fromString } from "uuidv4";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

const GET_EVENTS = "https://events.vortex.foundation/events";

export default function Home() {
    useEffect(() => {
        fetch(GET_EVENTS)
            .then((res) => res.json())
            .then((eventsArr) => {
                eventsArr.data.forEach((ev) => {
                    let id = fromString(JSON.stringify(ev));
                    let dateConstructor = "";
                    let s = dayjs(ev.date_start, "MM/DD/YYYY");
                    let e = dayjs(ev.date_end, "MM/DD/YYYY");
                    let sMonth = s.format("MMMM") + "";
                    sMonth = sMonth.slice(0, 3);

                    if (e) dateConstructor = `${s.date()}–${e.date()}`;
                    else dateConstructor = `${s.date()}}`;

                    dateConstructor += ` ${sMonth}`;
                    dateConstructor += ` ${s.year()}`;

                    store.dispatch({
                        type: "ADD",
                        payload: {
                            date: ev.date_start,
                            info: {
                                ...ev,
                                id: id,
                                datesRange: dateConstructor,
                            },
                        },
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
                                    info: { ...ev, id: id },
                                },
                            });
                        }
                    }
                });
            });
    }, []);

    return (
        <ThemeProvider theme="light">
            <Provider store={store}>
                <div className={styles.pageContainer}>
                    <Text className={styles.title} variant="display-3">EVNTS</Text>
                    <div className={styles.content}>
                        <main className={styles.main}>
                            <WeekWrapper />
                        </main>
                        <aside>
                            <CalendarWrapper />
                            <UpcomingEvents />
                        </aside>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}
