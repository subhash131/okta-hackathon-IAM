"use client";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import RiskCard from "@/components/RiskCard";
import AIPredictedRisks from "@/components/AIPredictedRisks";
import ManuallyPredictedRisks from "@/components/ManuallyPredictedRisks";

const Page = () => {
  const [roles, setRoles] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState("AI Predected");
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
        <p>Risk Managment</p>
      </div>
      <div className="items-center flex justify-between border-gray-800 border  border-dashed rounded bg-gray-100">
        <p className="px-4 font-medium">Abnormal Access</p>
        <div className="flex items-center py-2">
          <button
            type="button"
            className=" border text-gray-800 border-gray-800  font-medium rounded-lg text-sm px-4  py-1 mr-2 "
            onClick={aggregateRoles}
          >
            {isLoading ? <Loader /> : "Refresh"}
          </button>
        </div>
      </div>
      <div className="px-4 py-2 flex flex-row gap-4">
        <button
          className={`items-center justify-center w-52 px-2 py-2.5 text-center
          ${
            selectedRisk == "AI Predected"
              ? "bg-black text-white"
              : "bg-white text-black"
          } duration-200 border-2 border-black rounded-xl nline-flex focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black`}
          onClick={() => {
            setSelectedRisk("AI Predected");
          }}
        >
          AI Predected
        </button>
        <button
          className={`items-center justify-center w-52 px-2 py-2.5 text-center duration-200 ${
            selectedRisk == "Manually Configured"
              ? "bg-black text-white"
              : "bg-white text-black"
          }  border-2 border-black rounded-xl nline-flex focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black`}
          onClick={() => {
            setSelectedRisk("Manually Configured");
          }}
        >
          Check Manually 
        </button>
      </div>
      {selectedRisk === "AI Predected" ? (
        <AIPredictedRisks />
      ) : (
        <ManuallyPredictedRisks />
      )}
    </div>
  );
};

export default Page;
