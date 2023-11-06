import React, { useEffect, useState } from "react";
import RiskCard from "./RiskCard";
import axios from "axios";

const AIPredictedRisks = () => {
  const [risks, setRisks] = useState([]);
  const abnormalAccess = async () => {
    try {
      const data = await fetch("http://localhost:8080/predict", {
        cache: "no-cache",
      }).then(async (res) => await res.json());
      setRisks(data);
    } catch (e) {
      console.log("e: ", e);
    }
    console.log("data: ", {});
  };
  useEffect(() => {
    abnormalAccess();
  }, []);
  return (
    <div className="bg--500 h-auto grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6">
      {risks.map((risk: any) => {
        return (
          <div key={risk.id} className="w-72 border rounded-xl ">
            <RiskCard
              accessName={risk.access}
              accessDescription={`${risk.access} is assigned to ${risk.userType}`}
              userType={risk.userType}
              user={risk.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AIPredictedRisks;
