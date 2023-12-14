import { useEffect, useState } from "react";
import arrow from "../../../../public/arrow.svg";
import dayjs from "dayjs";
import styles from "./upcomingEvents.module.sass";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import { TextInput, Text, Select } from "@gravity-ui/uikit";

const EventSmallCard = ({ info, title, location }) => {
    return (
        <div className={styles.smallEventContainer}>
            <div className={styles.eventGridContainer}>
                <div className={styles.date}>
                    <Text variant="body-2">{info.datesRange}</Text>
                </div>
            </div>
            <div className={styles.eventGridContainer}>
                <Text variant="body-2">{title}</Text>
            </div>
            <div className={styles.eventGridContainer}>
                <Text variant="body-1" color="dark-secondary">
                    {location}
                </Text>
            </div>
        </div>
    );
};

export default function UpcomingEvents() {
    const [cards, setCards] = useState([]);
    const [rowEvents, setRowEvents] = useState({});
    const events = useSelector((state) => state.events);

    useEffect(() => {
        for (let [_, val] of Object.entries(rowEvents)) {
            setCards((o) => [
                ...o,
                <EventSmallCard
                    key={val.id}
                    info={val}
                    title={val.title}
                    location={val.location}
                />,
            ]);
        }
    }, [rowEvents]);

    useEffect(() => {
        let newCards = {};
        for (let [_, value] of Object.entries(events)) {
            value.forEach((val) => {
                if (
                    newCards[val.id] === undefined &&
                    rowEvents[val.id] === undefined
                )
                    newCards[val.id] = val;
            });
        }

        setRowEvents(newCards);
    }, [events]);

    return (
        <div className={styles.upcomingWrapper}>
            <Text variant="header-2">Upcoming Events</Text>
            <div className={styles.upcomingNavbar}>
                <TextInput
                    className={styles.navSearch}
                    placeholder="Start typing..."
                    size="m"
                />
                <Select className={styles.navDropdown} placeholder="Locations">
                    <Select.Option value="val_1" onClick={() => {console.log(2)}}>Abcde</Select.Option>
                    <Select.Option value="val_1">Abcde</Select.Option>
                    <Select.Option value="val_1">Abcde</Select.Option>
                </Select>
            </div>

            <div className={styles.eventsContainer}>{cards}</div>
        </div>
    );
}
