import Link from "next/link";
import React from "react";

const AppCard = ({
  id,
  name,
  description,
  connectionType,
  SourceType,
  status,
}: {
  id: string;
  name: string;
  description: string;
  connectionType: string;
  SourceType: string;
  status: string;
}) => {
  return (
    <div className="bg-white w-80 h-56 border-gray-200 border-2 rounded-2xl  p-2">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-20 w-20 bg-gray-600 text-white flex items-center justify-center text-2xl">
          {name.substring(0, 2).toUpperCase()}
        </div>
        <div className=" w-44">
          <p className="text-lg">{name}</p>
          <p className="text-gray-500 break-words">{description}</p>
        </div>
      </div>
      <div className="p-4 font-medium text-xs text-gray-500 ">
        <p>Connection Type: {connectionType}</p>
        <p>Source Type: {SourceType}</p>
      </div>
      <div className="p-2 flex justify-between">
        <button className="cursor-default  text-white bg-green-700  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
          {status}
        </button>
        <Link href={`/apps/${id}`}>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="w-screen h-auto p-8 grid gap-8 grid-cols-4 ">
      <AppCard
        id="1234"
        name="HR Source"
        description="Source for all identities"
        SourceType="Delimited File"
        connectionType="Flat file"
        status="Healthy"
      />
      <AppCard
        id="2334"
        name="Target System"
        description="Identities can request for access"
        SourceType="Target "
        connectionType="Direct Connection"
        status="Healthy"
      />
    </div>
  );
};

export default page;
