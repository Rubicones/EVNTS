import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./calendar.module.sass";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import ChevronLeftIcon from '@gravity-ui/icons/svgs/chevron-left.svg';
import ChevronRightIcon from '@gravity-ui/icons/svgs/chevron-right.svg';

const interLight = Inter({ subsets: ["latin"], weight: "300" });
const interBold = Inter({ subsets: ["latin"], weight: "500" });

const CalendarDay = ({ date, hasEvent, highlighted }) => {
    return (
        <div className={styles.calendarDay} style={date.isSame(highlighted, "day")? {border: "#674AE9 2px solid"} : {}}>
            <span className={styles.date}>{date.date()}</span>
            <div className={styles.calendarEventIndicator} style={hasEvent ? {backgroundColor: "#674AE9"} : {}}></div>
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
    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.calendarNavbar}>
                <span
                    className={`${styles.calendarTitle} ${interBold.className}`}
                >
                    Events Calendar
                </span>
                <span className={`${styles.calendarMonth} ${interLight.className}`}>
                    {payload.format("MMMM")}
                </span>

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
