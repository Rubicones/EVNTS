"use client";
import styles from "./week.module.sass";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Inter } from "next/font/google";
import arrow from "../../../../public/arrow.svg";
import Image from "next/image";
import {v4 as uuidv4} from 'uuid';

const interLight = Inter({ subsets: ["latin"], weight: "300" });
const interSemiBold = Inter({ subsets: ["latin"], weight: "400" });
const interBold = Inter({ subsets: ["latin"], weight: "500" });

const WeekEvent = ({ title, location, cost }) => {
    return (
        <div className={styles.weekEventContainer}>
            <span className={`${styles.weekEventTitle} ${interBold.className}`}>
                {title}
            </span>
            <span
                className={`${styles.weekEventLocation} ${interSemiBold.className}`}
            >
                {location}
            </span>
            <span
                className={`${styles.weekEventCost} ${interSemiBold.className}`}
            >
                {cost}
            </span>
        </div>
    );
};

function Week({ startingDay }) {
    const [weekDays, setWeekDays] = useState([]);
    let events = useSelector((state) => state.events);

    useEffect(() => {
        const today = dayjs();
        const currentDayOfWeek = startingDay.day();
        const monday = startingDay.subtract(currentDayOfWeek - 1, "day");

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
                    {day.isSame(today, "day") ? (
                        <div className={styles.todayWrapper}>
                            <div
                                className={`${styles.date} ${interSemiBold.className}`}
                                style={{ color: "white" }}
                            >{`${day.date()} ${monthName.slice(0, 3)}`}</div>
                        </div>
                    ) : (
                        <div
                            className={`${styles.date} ${interLight.className}`}
                        >{`${day.date()} ${monthName.slice(0, 3)}`}</div>
                    )}
                    <div
                        className={styles.weekDay}
                        style={
                            day.isSame(today, "day")
                                ? {
                                      transform: "translateY(-5.5px)",
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
    }, [startingDay]);

    return <div className={styles.weekContainer}>{weekDays}</div>;
}

const WeekWrapper = () => {
    const [startingDay, setStartingDay] = useState(dayjs());

    return (
        <div className={styles.weekWrapper}>
            <div className={styles.navigation}>
                <Image
                    src={arrow}
                    alt="Week Back"
                    className={styles.arrow}
                    onClick={() => setStartingDay((o) => o.add(-7, "day"))}
                />
                <Image
                    src={arrow}
                    alt="Week Forth"
                    className={`${styles.arrow} ${styles.arrowFlipped}`}
                    onClick={() => setStartingDay((o) => o.add(7, "day"))}
                />
            </div>
            <Week startingDay={startingDay} />
        </div>
    );
};

export default WeekWrapper;
