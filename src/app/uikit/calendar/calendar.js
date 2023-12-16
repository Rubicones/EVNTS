import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./calendar.module.sass";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import ChevronLeftIcon from '@gravity-ui/icons/svgs/chevron-left.svg';
import ChevronRightIcon from '@gravity-ui/icons/svgs/chevron-right.svg';
import { Text } from "@gravity-ui/uikit";
import { useDispatch } from "react-redux";

const CalendarDay = ({ date, hasEvent, highlighted }) => {
    const dispatch = useDispatch()

    const selectEvent = () => {
        dispatch({type: "SELECT", payload: date.format("MM/DD/YYYY")})
    }
    return (
        <div className={styles.calendarDay} onClick={selectEvent} style={date.isSame(highlighted, "day")? {border: "#674AE9 2px solid"} : {}}>
            <Text variant="body-2">{date.date()}</Text>
            <div className={styles.calendarEventIndicator} style={hasEvent ? {backgroundColor: "#674AE9"} : {}}/>
        </div>
    );
};

const Calendar = ({ payload }) => {
    const [days, setDays] = useState([]);
    const events = useSelector((state) => state.events);

    useEffect(() => {
        let firstDayOfMonth = payload.startOf("month");
        let lastDayOfMonth = payload.endOf("month");
        let daysOfMonth = [];

        while (!firstDayOfMonth.add(-1, 'day').isSame(lastDayOfMonth, "day")) {
            daysOfMonth.push(
                <CalendarDay highlighted={dayjs()} key={uuidv4()} date={firstDayOfMonth} hasEvent={events[firstDayOfMonth.format("MM/DD/YYYY")] !== undefined} />
            );
            firstDayOfMonth = firstDayOfMonth.add(1, "day");
        }

        setDays(daysOfMonth);
    }, [payload, events]);
    return <div className={styles.daysTable}>{days}</div>;
};

export default function CalendarWrapper() {
    const [payload, setPayload] = useState(dayjs());
    const selectedEvent = useSelector(state => state.selectedEvent)

    useEffect(() => {
        if (selectedEvent)
            setPayload(dayjs(selectedEvent, "MM/DD/YYYY"))
    }, [selectedEvent])
    
    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.calendarNavbar}>
                <Text variant="header-1">Events Calendar</Text>
                <Text variant="body-2" className={`${styles.calendarMonth}`}>{payload.format("MMMM")}</Text>
                <div className={styles.navButtons}>
                    <Image
                        src={ChevronLeftIcon}
                        alt="Month Back"
                        className={styles.arrow}
                        onClick={() => setPayload((o) => o.add(-1, "month"))}
                    />
                    <Image
                        src={ChevronRightIcon}
                        alt="Month Forth"
                        className={`${styles.arrow}`}
                        onClick={() => setPayload((o) => o.add(1, "month"))}
                    />
                </div>
            </div>
            <Calendar payload={payload} />
        </div>
    );
}
