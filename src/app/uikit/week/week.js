"use client";

import dayjs from "dayjs";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Image from "next/image";

import { v4 as uuidv4 } from "uuid";

import ChevronLeftIcon from "@gravity-ui/icons/svgs/chevron-left.svg";
import ChevronRightIcon from "@gravity-ui/icons/svgs/chevron-right.svg";
import { Text } from "@gravity-ui/uikit";

import styles from "./week.module.sass";


const WeekEvent = ({ title, location, cost }) => {
    return (
        <div className={styles.weekEventContainer}>
            <Text variant="caption-2" className={styles.weekEventTitle}>
                {title}
            </Text>
            <Text
                variant="caption-1"
                color="dark-secondary"
                className={styles.weekEventLocation}
            >
                {location}
            </Text>
            <Text variant="body-1" className={styles.weekEventCost}>
                {" "}
                {cost}
            </Text>
        </div>
    );
};

function Week({ payload }) {
    const [weekDays, setWeekDays] = useState([]);
    const events = useSelector(state => state.events);
    const selected = useSelector(state => state.selectedDate)
    useEffect(() => {
        let currentDayOfWeek = payload;
        while (currentDayOfWeek.day() !== 1)
            currentDayOfWeek = currentDayOfWeek.add(-1, "day")
        const monday = currentDayOfWeek


        const daysOfWeek = [];

        for (let i = 0; i < 7; i++) {
            const day = monday.add(i, "day");
            const monthName = day.format("MMMM");
            const eventsToday = events[day.format("MM/DD/YYYY")];
            daysOfWeek.push(
                <div
                    className={styles.weekDayContainer}
                    key={daysOfWeek.length}
                >
                    {day.isSame(dayjs(selected, "MM/DD/YYYY"), "day") ? (
                        <div className={styles.todayWrapper}>
                            <Text
                                variant="body-3"
                                style={{ color: "white" }}
                            >{`${day.date()} ${monthName.slice(0, 3)}`}</Text>
                        </div>
                    ) : (
                        <Text variant="body-2">
                            {`${day.date()} ${monthName.slice(0, 3)}`}
                        </Text>
                    )}
                    <div
                        className={styles.weekDay}
                        style={
                            day.isSame(dayjs(selected, "MM/DD/YYYY"), "day")
                                ? {
                                      transform: "translateY(-4.5px)",
                                  }
                                : {}
                        }
                    >
                        {eventsToday !== undefined &&
                            eventsToday.map((ev) => (
                                <WeekEvent
                                    key={uuidv4()}
                                    title={ev.title}
                                    location={ev.location}
                                    cost={ev.ticket_price}
                                />
                            ))}
                    </div>
                </div>
            );
        }

        setWeekDays(daysOfWeek);
    }, [payload, events]);

    return <div className={styles.weekContainer}>{weekDays}</div>;
}

const WeekWrapper = () => {
    const [payload, setPayload] = useState(dayjs());
    const selectedDate = useSelector(state => state.selectedDate)

    useEffect(() => {
        if (selectedDate)
            setPayload(dayjs(selectedDate, "MM/DD/YYYY"))
    }, [selectedDate])

    return (
        <div className={styles.weekWrapper}>
            <div className={styles.navigation}>
                <Image
                    src={ChevronLeftIcon}
                    alt="Week Back"
                    className={styles.arrow}
                    onClick={() => setPayload((o) => o.add(-7, "day"))}
                />
                <Image
                    src={ChevronRightIcon}
                    alt="Week Forth"
                    className={`${styles.arrow}`}
                    onClick={() => setPayload((o) => o.add(7, "day"))}
                />
            </div>
            <Week payload={payload} />
        </div>
    );
};

export default WeekWrapper;
