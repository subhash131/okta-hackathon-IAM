import { RootState } from "@/redux/strore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const RoleCard = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: string;
}) => {
  const [users, setUsers] = useState<any>([]);
  const [reqFor, setReqFor] = useState<string | undefined>("others");
  const [userId, setuserId] = useState("");

  const getUsers = async () => {
    const userData = await fetch("http://localhost:3000/api/users", {
      cache: "no-cache",
    }).then(async (res) => await res.json());
    console.log("userData: ", userData);
    setUsers(() => {
      return userData.filter((user: any) => user.username);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="flex flex-col bg-white rounded-3xl">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
              {name}
            </h2>
            <p className="mt-2 text-sm text-gray-500 h-auto">
              {description.length > 20 ? (
                <>{`${description.substring(0, 17)}...`}</>
              ) : (
                <>{description}</>
              )}
            </p>
          </div>
          <div className="mt-6">
            <select
              className="border rounded-md p-2"
              onChange={(e) => {
                setReqFor(e.target.value);
              }}
            >
              <option value="others">Request for others</option>
            </select>
            {reqFor === "others" ? (
              <>
                <select
                  className="border rounded-md p-2 mt-4"
                  onChange={(e) => setuserId(e.target.value)}
                  value={userId}
                >
                  <option value="">Select Identity</option>
                  {users.map((user: any) => {
                    return (
                      <option value={user.user_id} key={user.user_id}>
                        {user.username}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        <button
          aria-describedby="tier-company"
          className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          onClick={async () => {
            if (userId === "") {
              toast.error("Please select an identity");
            } else {
              console.log("req", { requestedFor: userId, role: id });
              const res = await fetch("http://localhost:3000/api/assignRole", {
                body: JSON.stringify({ requestedFor: userId, role: id }),
                method: "POST",
                cache: "no-cache",
              }).then(async (res) => await res.json());
              console.log("res: ", res);
              toast.success(`Request submitted for role:    ${name}`);
            }
            setuserId("");
          }}
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default RoleCard;
