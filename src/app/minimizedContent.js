"use client";

import WeekWrapper from "./uikit/week/week";
import CalendarWrapper from "./uikit/calendar/calendar";
import EventCard from "./uikit/eventCard/eventCard";
import UpcomingEvents from "./uikit/upcomingEvents/upcomingEvents";

import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import dayjs from "dayjs";

import { Text } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

import { fromString } from "uuidv4";

import styles from "./minimizedContent.module.sass";

import localFont from "next/font/local";

const vortexFont = localFont({ src: "../../public/fonts/Vortex-Mix.otf" });

const GET_EVENTS = "https://events.vortex.foundation/events";

export default function MinimizedContent() {
    let selectedEvent = useSelector((store) => store.selectedEvent);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(GET_EVENTS)
            .then((res) => res.json())
            .then((eventsArr) => {
                console.log(eventsArr.data)
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

                    dispatch({
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

                    // if (ev.date_end) {
                    //     let start = dayjs(ev.date_start, "MM/DD/YYYY");
                    //     let end = dayjs(ev.date_end, "MM/DD/YYYY");

                    //     while (!start.isSame(end, "day")) {
                    //         start = start.add(1, "day");
                    //         dispatch({
                    //             type: "ADD",
                    //             payload: {
                    //                 date: start.format("MM/DD/YYYY"),
                    //                 info: {
                    //                     ...ev,
                    //                     id: id,
                    //                     datesRange: dateConstructor,
                    //                 },
                    //             },
                    //         });
                    //     }
                    // }
                });
            });
    }, []);

    return (
        <div className={`${styles.pageContainer}`}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <span>
                        <Text
                            className={`${styles.titleText} ${vortexFont.className} ${styles.alternativeGlyph}`}
                            variant="display-3"
                        >
                            e
                        </Text>

                        <Text
                            className={`${styles.titleText} ${vortexFont.className}`}
                            variant="display-3"
                        >
                            vn
                        </Text>
                        <Text
                            className={`${styles.titleText} ${vortexFont.className}  ${styles.alternativeGlyph}`}
                            variant="display-3"
                        >
                            t
                        </Text>
                        <Text
                            className={`${styles.titleText} ${vortexFont.className}`}
                            variant="display-3"
                        >
                            s
                        </Text>

                    </span>
                </div>
            </header>
            <div className={styles.content}>
                <CalendarWrapper/>
                {/* <UpcomingEvents /> */}
                {/* <WeekWrapper/> */}
            </div>
        </div>
    );
}
