"use client";

import store from "@/store/";
import { Provider } from "react-redux";

import { ThemeProvider } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

import Content from "./content";


export default function Home() {

    return (
        <ThemeProvider theme="light">
            <Provider store={store}>
                <Content/>
            </Provider>
        </ThemeProvider>
    );
}
