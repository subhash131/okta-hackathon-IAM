import { updateTaskManagmentUserData } from "@/redux/features/taskManagmentUsersData";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ManuallyPredictedRisks = () => {
  const dispatch = useDispatch();
  const aggregateUsers = async () => {
    const tmUsers = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json());

    dispatch(updateTaskManagmentUserData(tmUsers));
  };
  useEffect(() => {
    aggregateUsers();
  });

  return (
    <div className="py-2 border h-[44rem]">
      <p className="text-lg p-2 font-medium text-gray-600 ">Set Criteria</p>
      <div className="flex border-t border-b p-2 w-full gap-4">
        <select className=" border rounded-xl p-2 px-4">
          <option className="rounded-xl p-2 px-4">Select userType</option>
          <option className="rounded-xl p-2 px-4">Admin </option>
          <option className="rounded-xl p-2 px-4">Manager</option>
          <option className="rounded-xl p-2 px-4">Associate</option>
        </select>
        <div className="p-2 px-4">
          <p>Should not have</p>
        </div>
        <select className="border rounded-xl p-2 px-4">
          <option className="rounded-xl p-2 px-4">Select access</option>
          <option className="rounded-xl p-2 px-4">all </option>
          <option className="rounded-xl p-2 px-4">create</option>
          <option className="rounded-xl p-2 px-4">read</option>
        </select>
      </div>
    </div>
  );
};

export default ManuallyPredictedRisks;
