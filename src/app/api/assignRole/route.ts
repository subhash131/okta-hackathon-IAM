import axios from "axios";
import { Auth0 } from "../constants/Auth0";

export const POST = async (req: Request) => {
  const { role, requestedFor } = await req.json();
  const { access_token } = await fetch(
    "http://localhost:3000/api/getAccessToken",
    {
      method: "POST",
      cache: "no-cache",
    }
  ).then(async (res) => await res.json());
  var options = {
    method: "POST",
    url: `https://${Auth0.domain}/api/v2/users/${requestedFor}/roles`,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${access_token}`,
      "cache-control": "no-cache",
    },
    data: { roles: [role] },
  };
  // console.log("options: ", options);
  var res = "";
  try {
    axios
      .request(options)
      .then(function (response: any) {
        // console.log(response.data);
        res = response.data;
      })
      .catch(function (error: any) {
        console.log(error);
        res = error;
      });
  } catch (e) {
    console.log("e: ", e);
  }

  return Response.json(res);
};
