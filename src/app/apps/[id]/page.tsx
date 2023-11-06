"use client";
import Table from "@/components/Table";
import { Loader, Loader2, Settings2 } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { updateHrUsersData } from "@/redux/features/HrUsersData";
import { RootState } from "@/redux/strore";
import { selectApplication } from "@/redux/features/applicationsData";
import { useParams } from "next/navigation";
import { AccountSchema } from "@/types/AccountSchema.type";
import { updateTaskManagmentUserData } from "@/redux/features/taskManagmentUsersData";

const acceptableCsv =
  ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const Page = () => {
  const userData = useSelector((state: RootState) => state.UserReducer.hrUsers);
  const [users, setUsers] = useState<Array<AccountSchema>>([]);
  const { id: appId } = useParams();
  const dispatch = useDispatch();
  const selectedApp = useSelector(
    (state: RootState) => state.ApplicationsReducer.selectedApp
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log("files: ", files?.length);
    if (files) {
      Papa.parse(files[files.length - 1], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const data = results.data;
          dispatch(updateHrUsersData(data));
        },
      });
      e.target.value = "";
    }
  };

  const createUsers = async (body: any) => {
    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-cache",
    });
  };
  const [isLoading, setLoading] = useState(false);

  const aggregateUsers = async () => {
    setLoading(true);
    const tmUsers = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json());
    if (tmUsers instanceof Array) setUsers(tmUsers);
    dispatch(updateTaskManagmentUserData(tmUsers));
    setLoading(false);
  };
  useEffect(() => {
    dispatch(selectApplication(appId));
    if (
      selectedApp.SourceType == "Delimited File" &&
      userData instanceof Array
    ) {
      setUsers(userData);
    } else if (selectedApp.SourceType == "Auth0") {
      aggregateUsers();
    }
    if (userData instanceof Array) {
      userData.map((user) => {
        createUsers({
          user_id: user.accountId,
          username: user.accountName.replace(/[^A-Z0-9]/gi, "_"),
          family_name: user.familyName,
          given_name: user.givenName,
          email: user.email,
          name: user.displayName,
          access: user.access,
        });
      });
    }
  }, [userData, appId, selectedApp]);

  return (
    <div className="flex py-4 px-8  flex-col gap-4 bg-white w-screen min-h-screen">
      <div className="font-medium px-1.5 flex justify-between">
        <p>Source Name: {selectedApp.name}</p>
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
          {selectedApp.connectionType === "Flat file" ? (
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
              className=" border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2"
              onClick={aggregateUsers}
            >
              {isLoading ? <Loader /> : "Start"}
            </button>
          )}
        </div>
      </div>
      <div className="bg--500 h-auto">
        <Table users={users} sourceType={selectedApp.SourceType} />
      </div>
    </div>
  );
};

export default Page;
