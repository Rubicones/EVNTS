import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput, Text, Select } from "@gravity-ui/uikit";
import { ThemeProvider } from "@gravity-ui/uikit";

import dayjs from "dayjs";

import styles from "./upcomingEvents.module.sass";


const EventSmallCard = ({ info, title, location, isPast, isFirstUpcoming }) => {
    const container = useRef(null);
    const dispatch = useDispatch()

    const selectEvent = () => {
        dispatch({type: "SELECT_DATE", payload: info.date_start})
        dispatch({type: "SELECT_EVENT", payload: info})
    }

    useEffect(() => {
        if (isFirstUpcoming && !window.matchMedia("(orientation: portrait)").matches) 
            container.current.scrollIntoView(true) 
        else if (window.matchMedia("(max-width: 530px)").matches)
            container.current.scrollIntoView(false);
    }, [isFirstUpcoming]);

    return (
        <div
            ref={container}
            className={styles.smallEventContainer}
            style={isPast ? { backgroundColor: "#a0a0a068" } : {}}
            onClick={selectEvent}
        >
            <div className={styles.eventGridContainer}>
                <div className={styles.date}>
                    <Text variant="subheader-1">{info.datesRange}</Text>
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
    const [locations, setLocations] = useState({})
    const [currLocation, setCurrLocation] = useState(undefined)
    const [rowEvents, setRowEvents] = useState({});
    const [rowEventsFiltered, setRowEventsFiltered] = useState({});
    const [query, setQuery] = useState("")
    const events = useSelector((state) => state.events);
    

    const sortEvents = (eventsArr) => {
        let sortedEntries = Object.entries(eventsArr).sort(
            (a, b) => dayjs(a[0], "MM/DD/YYYY") - dayjs(b[0], "MM/DD/YYYY")
        );
        const sortedEvents = sortedEntries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return sortedEvents;
    };

    useEffect(() => {
        setRowEventsFiltered(
            Object.keys(rowEvents)
            .filter(
                (key) =>
                    rowEvents[key].title.toLowerCase().includes(query.toLowerCase()) &&
                    (currLocation === undefined || rowEvents[key].location === currLocation)
            )            .reduce((result, key) => {
              result[key] = rowEvents[key];
              return result;
            }, {})
        )
    }, [query, currLocation])

    useEffect(() => {
        setCards([])
        setLocations({})
        let eventsArr = Object.entries(rowEventsFiltered);
        eventsArr.forEach((ev, i) => {
            let val = ev[1];
            let isFirstUpcoming =
                (i == 0 ||
                    dayjs(
                        eventsArr[i - 1][1].date_start,
                        "MM/DD/YYYY"
                    ).isBefore(dayjs())) &&
                dayjs(val.date_start, "MM/DD/YYYY").isAfter(dayjs());

            setCards((o) => [
                ...o,
                <EventSmallCard
                    key={val.id}
                    info={val}
                    title={val.title}
                    location={val.location}
                    isPast={dayjs(val.date_start, "MM/DD/YYYY").isBefore(
                        dayjs()
                    )}
                    isFirstUpcoming={isFirstUpcoming}
                />,
            ]);
            if (locations[val.location] === undefined){
                    setLocations(o => ({...o, [val.location]: val.info}))
            }
        });
    }, [rowEventsFiltered]);

    useEffect(() => {
        let newCards = {};
        let sortedEvents = sortEvents(events);
        for (let [_, value] of Object.entries(sortedEvents)) {
            value.forEach((val) => {
                if (
                    newCards[val.id] === undefined &&
                    rowEvents[val.id] === undefined
                )
                    newCards[val.id] = val;
            });
        }

        setRowEventsFiltered(newCards);
        setRowEvents(newCards);
    }, [events]);

    return (
        <ThemeProvider theme="light">
            <div className={styles.upcomingWrapper} >
                <Text variant="header-2">Upcoming Events</Text>
                <div className={styles.upcomingNavbar}>
                    <TextInput
                        className={styles.navSearch}
                        placeholder="Start typing..."
                        size="m"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        pin="round-brick"
                    />
                    <Select
                        className={styles.navDropdown}
                        placeholder="Locations"
                        hasClear="true"
                        filterable={true}
                        popupWidth='fit'
                        pin="brick-round"
                        onUpdate={(value) => setCurrLocation(value[0])}
                    >
                        {Object.entries(locations).map((location, i) => <Select.Option key={i} value={location[0]}><Text variant="body-1">{location[0]}</Text></Select.Option>)}
                    </Select>
                </div>

                <div className={styles.eventsContainer}>
                    {cards}
                </div>
            </div>
        </ThemeProvider>
    );
}
