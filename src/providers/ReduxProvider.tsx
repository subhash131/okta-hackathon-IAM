"use client";
import { store } from "@/redux/strore";
import React, { PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
