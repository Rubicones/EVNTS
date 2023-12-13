"use client"
import Image from "next/image";
import styles from "./page.module.sass";
import WeekWrapper from "./uikit/week/week";
import store from '@/store/'
import {Provider, useDispatch} from 'react-redux'
import { useEffect } from "react";
import dayjs from "dayjs";

const GET_EVENTS = 'https://events.vortex.foundation/events'

export default function Home() {
    useEffect(() => {

        const getEvents = async () => {
            const eventsArr = await fetch(GET_EVENTS).then(res => res.json())
            eventsArr.data.forEach(ev => {
                store.dispatch({type: "ADD", payload: {date: ev.date_start, info: ev}})
            })
        }
        getEvents()
    }, [])

    return (
        <Provider store={store}>
            <WeekWrapper/>
        </Provider>

    );
}