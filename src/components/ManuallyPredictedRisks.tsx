import { updateTaskManagmentUserData } from "@/redux/features/taskManagmentUsersData";
import { RootState } from "@/redux/strore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManuallyPredictedRisks = () => {
  const users = useSelector(
    (state: RootState) => state.TaskManagmentUserReducer.tmUsers
  );
  const userTypeRef = useRef<HTMLSelectElement>(null);
  const accessRef = useRef<HTMLSelectElement>(null);

  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    const roles = await fetch("http://localhost:3000/api/roles", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json());
    setRoles(roles);
  };

  const dispatch = useDispatch();
  const aggregateUsers = async () => {
    const tmUsers = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json());
    // console.log("tmUsers: ", tmUsers);

    dispatch(updateTaskManagmentUserData(tmUsers));
  };

  const handleRiskCheck = () => {
    // for (var i = 0; i < users.length; i++) {
    //   if (users instanceof Array) {
    //     if(users[i].access === accessRef.current?.value && users[i].)
    //   }
    // }
  };

  useEffect(() => {
    aggregateUsers();
    getRoles();
  });

  return (
    <div className="py-2 border h-[44rem]">
      <p className="text-lg p-2 font-medium text-gray-600 ">Set Criteria</p>
      <div className="flex border-t border-b p-2 w-full gap-4">
        <select className=" border rounded-xl p-2 px-4" ref={userTypeRef}>
          <option className="rounded-xl p-2 px-4">Select userType</option>
          <option className="rounded-xl p-2 px-4" value="admin">
            Admin{" "}
          </option>
          <option className="rounded-xl p-2 px-4" value="manager">
            Manager
          </option>
          <option className="rounded-xl p-2 px-4" value="associate">
            Associate
          </option>
        </select>
        <div className="p-2 px-4">
          <p>Should not have</p>
        </div>
        <select className="border rounded-xl p-2 px-4" ref={accessRef}>
          <option className="rounded-xl p-2 px-4">Select access</option>
          {roles.map((role: any) => {
            return (
              <option
                className="rounded-xl p-2 px-4"
                value={role.name}
                key={role.id}
              >
                {role.name}
              </option>
            );
          })}
        </select>
        <div>
          <button
            className="items-center justify-center w-52 px-2 py-2.5 text-center duration-200 bg-white text-black border-2 border-black rounded-xl nline-flex focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            onClick={handleRiskCheck}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManuallyPredictedRisks;
