"use client";
import Table from "@/components/Table";
import { Settings2 } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/redux/features/userData";
import { RootState } from "@/redux/strore";

const acceptableCsv =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const Page = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("files: ", files?.length);
    if (files) {
      Papa.parse(files[files.length - 1], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const data = results.data;
          dispatch(updateUserData(data));
        },
      });
      e.target.value = "";
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="flex py-4 px-8  flex-col gap-4 bg-white w-screen min-h-screen">
      <div className="font-medium px-1.5 flex justify-between">
        <p>Source Name: HR Source</p>
        <button
          type="button"
          className=" border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2 "
        >
          Configurations
          <Settings2 strokeWidth={1.2} className="inline ml-2" />
        </button>
      </div>
      <div className="items-center flex justify-between border-gray-800 border  border-dashed rounded bg-gray-100">
        <p className="px-4 font-medium">Accounts</p>
        <div className="flex items-center py-2">
          <p className=" px-4 font-medium">Aggregate Accounts:</p>
          {true ? (
            <>
              <input
                type="file"
                className="hidden"
                id="readcsv"
                ref={inputRef}
                onChange={onFileChangeHandler}
                accept={acceptableCsv}
              />
              <label
                htmlFor="readcsv"
                className="cursor-pointer border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2 "
              >
                Start
              </label>
            </>
          ) : (
            <button
              type="button"
              className=" border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2 "
            >
              Start
            </button>
          )}
        </div>
      </div>
      <div className="bg--500 h-auto">
        <Table />
      </div>
    </div>
  );
};

export default Page;
