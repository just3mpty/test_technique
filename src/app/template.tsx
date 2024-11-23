"use client";
import Providers from "@/components/Providers";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";

type Props = {
    children: React.ReactNode;
};

const template = (props: Props) => {
    const { children } = props;
    return (
        <Provider store={store}>
            <Providers>{children}</Providers>
        </Provider>
    );
};

export default template;
