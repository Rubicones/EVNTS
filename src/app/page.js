"use client";
import styles from "./page.module.sass";
import WeekWrapper from "./uikit/week/week";
import CalendarWrapper from "./uikit/calendar/calendar";
import EventCard from "./uikit/eventCard/eventCard";
import store from "@/store/";
import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import UpcomingEvents from "./uikit/upcomingEvents/upcomingEvents";
import { ThemeProvider, Text } from "@gravity-ui/uikit";
import { fromString } from "uuidv4";
import Content from "./content";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

const GET_EVENTS = "https://events.vortex.foundation/events";

export default function Home() {

    return (
        <ThemeProvider theme="light">
            <Provider store={store}>
                <Content/>
            </Provider>
        </ThemeProvider>
    );
}
