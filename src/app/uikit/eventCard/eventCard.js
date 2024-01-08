import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import Image from "next/image";

import xMark from "../../../../public/icons/xMark.svg";
import { Text } from "@gravity-ui/uikit";

import styles from "./eventCard.module.sass";

export default function EventCard({top, height}) {
    const [eventInfo, setEventInfo] = useState({});
    const selectedEvent = useSelector((state) => state.selectedEvent);
    const dispatch = useDispatch()
    
    useEffect(() => {
        selectedEvent && setEventInfo(selectedEvent);
    }, [selectedEvent]);

    return (
        <div className={styles.eventCardWrapper} style={{top: top - height / 2}}>
            {/* <Image src={xMark} alt="close event card" width={25} height={25} className={styles.close} onClick={() => dispatch({type: "SELECT_EVENT", payload: null})}/> */}
            <div className={styles.date} >
                <Text variant="subheader-1" color="dark-primary">{eventInfo.datesRange}</Text>
            </div>
            <div className={styles.infoBlock}>
                <Text ellipsis="true" variant="subheader-1">
                    {eventInfo.title}
                </Text>
                <Text
                    ellipsis="true"
                    variant="body-1"
                    // color="dark-secondary"
                >
                    {eventInfo.location}
                </Text>
                <Link href={eventInfo.url ? "https://" + eventInfo.url : ""} passHref={true}>
                    <Text ellipsis="true" variant="body-1">
                        {eventInfo.url}
                    </Text>
                </Link>

                <Text style={{ marginTop: "auto" }} variant="body-1">
                    {eventInfo.ticket_price}
                </Text>
            </div>

            <Text variant="body-1">
                <Text variant="subheader-1">
                    Description: <br />
                </Text>
                {eventInfo.description}
            </Text>
        </div>
    );
}
