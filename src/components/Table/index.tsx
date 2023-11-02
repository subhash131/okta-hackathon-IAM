import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/strore";

const Table = () => {
  const userData = useSelector((state: RootState) => state.UserReducer.users);

  return (
    <div className="border rounded">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Account Name</th>
            <th>Given Name</th>
            <th>Family Name</th>
            <th>Display Name</th>
            <th>Department Id</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userData instanceof Array &&
            userData.map((user, index) => {
              return (
                <tr key={user.accountId}>
                  <td>{user.accountId}</td>
                  <td>{user.accountName}</td>
                  <td>{user.givenName}</td>
                  <td>{user.familyName}</td>
                  <td>{user.displayName}</td>
                  <td>{user.departmentId}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          <tr>
            <td>-------</td>
            <td>-------</td>
            <td>-------</td>
            <td>-------</td>
            <td>-------</td>
            <td>-------</td>
            <td>-------</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
