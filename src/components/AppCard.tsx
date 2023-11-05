import { HeartPulse } from "lucide-react";
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
          <p className="text-lg">{name.substring(0, 16)}</p>
          <p className="text-gray-500 break-words">{description}</p>
        </div>
      </div>
      <div className="p-4 font-medium text-xs text-gray-500 ">
        <p>Connection Type: {connectionType}</p>
        <p>Source Type: {SourceType}</p>
      </div>
      <div className="p-2 flex justify-between">
        <button className="flex  cursor-default  text-white bg-green-700  font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 ">
          <HeartPulse strokeWidth={1} width={26} height={20} />{" "}
          <span className="">{status}</span>
        </button>
        <Link href={`/apps/${id}`}>
          <button
            type="button"
            className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppCard;
