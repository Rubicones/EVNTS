import { useEffect, useState } from "react";
import arrow from "../../../../public/arrow.svg";
import dayjs from "dayjs";
import styles from "./upcomingEvents.module.sass";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import {TextInput} from '@gravity-ui/uikit';

const interLight = Inter({ subsets: ["latin"], weight: "300" });
const interSemiBold = Inter({ subsets: ["latin"], weight: "400" });
const interBold = Inter({ subsets: ["latin"], weight: "500" });

export default function UpcomingEvents () {
    return (
        <div className={styles.upcomingWrapper}>
            <span className={`${styles.upcomingHeader} ${interSemiBold.className}`}>Upcoming Events</span>
            <div className={styles.upcomingNavbar}>
                <TextInput placeholder="Start typing..." size="l"/>

            </div>

        </div>
    )
}