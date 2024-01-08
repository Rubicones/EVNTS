import { useEffect, useState } from "react";

import dayjs from "dayjs";

import Image from "next/image";

import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";

import { Text } from "@gravity-ui/uikit";

import styles from "./calendarTooltip.module.sass";
import { uuid } from "uuidv4";

export default function CalendarTooltip({ date }) {
    const [tooltipEvents, setTootlipEvents] = useState([]);
    const selectedDate = useSelector((state) => state.selectedDate);
    const events = useSelector((state) => state.events);

    useEffect(() => {
            events[date.format("MM/DD/YYYY")].forEach((ev) => {
                let newEvent = (
                    <div className={styles.tooltipEvent} key={uuidv4()}>
                        <Text variant="body-2" className={styles.title}>{ev.title}</Text>
                        <Text variant="body-1" className={styles.date}>{ev.datesRange}</Text>
                        <Text variant="body-1" className={styles.price}>{ev.ticket_price}</Text>
                    </div>
                );
                setTootlipEvents(old => [...old, newEvent])
            });        
    }, []);

    return (
        <>
            <div className={styles.tooltipContainer}>
                {tooltipEvents}
            </div>
        </>
    );
}
