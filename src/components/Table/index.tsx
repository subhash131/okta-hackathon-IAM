"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/strore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = ({ users: unParsedUsers, sourceType }: any) => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    var temp: any = [];
    if (sourceType === "Auth0") {
      unParsedUsers.map((user: any) => {
        temp.push({
          accountId: user.user_id,
          accountName: user.username,
          email: user.email,
          familyName: user.family_name,
          givenName: user.given_name,
          displayName: user.username,
          access: user.access,
        });
      });
      setUsers(temp);
    } else {
      setUsers(unParsedUsers);
    }
  }, [sourceType, unParsedUsers]);
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
            <th>email</th>
            <th>Access</th>
          </tr>
        </thead>
        <tbody>
          {users.length <= 0 && sourceType != "Delimited File" ? (
            [...Array(5)].map((_, index) => {
              return (
                <tr key={`:${index}:`}>
                  <td>
                    <Skeleton count={1} />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
          {users instanceof Array &&
            users.map((user, index) => {
              return (
                <tr key={`:${user.accountId}${user.accountName}${index}:`}>
                  <td>{user.accountId}</td>
                  <td>{user.accountName}</td>
                  <td>{user.givenName}</td>
                  <td>{user.familyName}</td>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.access}</td>
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
