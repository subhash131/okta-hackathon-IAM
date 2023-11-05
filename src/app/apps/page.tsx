"use client";
import AppCard from "@/components/AppCard";
import { RootState } from "@/redux/strore";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const applications = useSelector(
    (state: RootState) => state.ApplicationsReducer.applications
  );
  return (
    <div className="w-screen h-auto p-8 grid gap-8 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] ">
      {applications.map((app: any) => {
        return (
          <AppCard
            key={app.id}
            id={app.id}
            name={app.name}
            description={app.description}
            SourceType={app.SourceType}
            connectionType={app.connectionType}
            status={app.status}
          />
        );
      })}
    </div>
  );
};

export default Page;
