import React, { useEffect, useState } from "react";

const RiskCard = ({
  accessName,
  accessDescription,
  user,
  userType,
}: {
  accessName: string;
  accessDescription: string;
  user: string;
  userType: string;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-3xl">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="grid items-center justify-center w-full grid-cols-1 text-left">
          <div>
            <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-2xl">
              {accessName}
            </h2>
            <p className="mt-2 text-sm text-gray-500 h-auto">
              {accessDescription && accessDescription.length > 60 ? (
                <>{`${accessDescription.substring(0, 17)}...`}</>
              ) : (
                <>{accessDescription}</>
              )}
            </p>
          </div>
          <div className="mt-4">
            <p>
              <span className="text-sm font-medium tracking-tighter text-gray-600">
                Assigned to:{" "}
              </span>
              <span className="text-lg font-medium tracking-tighter text-gray-600 lg:text-lg">
                {user}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8 gap-2">
        <button
          aria-describedby="tier-company"
          className="items-center justify-center w-full px-2 py-2.5 text-center text-white duration-200 bg-gray-600 border-2 border-gray-600 rounded-xl nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          onClick={async () => {}}
        >
          Ignore
        </button>
        <button
          aria-describedby="tier-company"
          className="items-center justify-center w-full px-2 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-xl nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          onClick={() => {}}
        >
          Take Action
        </button>
      </div>
    </div>
  );
};

export default RiskCard;
