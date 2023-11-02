import React from "react";

const TabNavigator = ({ tabItems }: { tabItems: Array<string> }) => {
  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          className="bg-gra-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        >
          {tabItems.map((item, index) => (
            <option key={`:${item}${index}:`}>{item}</option>
          ))}
        </select>
      </div>
      <div className=" p-4 w-full text-sm font-medium text-center rounded-lg shadow     ">
        Accounts
      </div>
    </>
  );
};

export default TabNavigator;
