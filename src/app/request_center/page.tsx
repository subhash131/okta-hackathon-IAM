"use client";
import Table from "@/components/Table";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

import RoleCard from "@/components/RoleCard";

const Page = () => {
  const [roles, setRoles] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const aggregateRoles = async () => {
    setLoading(true);
    const roleData = await fetch("http://localhost:3000/api/roles").then(
      async (res) => await res.json()
    );
    setRoles(roleData);
    setLoading(false);
  };
  useEffect(() => {
    aggregateRoles();
  }, []);

  return (
    <div className="flex py-4 px-8  flex-col gap-4 bg-white w-screen min-h-screen">
      <div className="font-medium px-1.5 flex justify-between">
        <p>Request center</p>
      </div>
      <div className="items-center flex justify-between border-gray-800 border  border-dashed rounded bg-gray-100">
        <p className="px-4 font-medium">Available Roles</p>
        <div className="flex items-center py-2">
          <p className=" px-4 font-medium">Aggregate Roles:</p>

          <button
            type="button"
            className=" border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2 "
            onClick={aggregateRoles}
          >
            {isLoading ? <Loader /> : "start"}
          </button>
        </div>
      </div>
      <div className="bg--500 h-auto grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
        {roles.map((role: any) => {
          return (
            <div key={role.id} className="w-72 border rounded-xl ">
              <RoleCard
                name={role.name}
                description={role.description}
                id={role.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
