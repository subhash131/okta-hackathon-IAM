import type { NextApiRequest, NextApiResponse } from "next";
import { Auth0 } from "../constants/Auth0";
import { TOKEN_URL, USERS_URL } from "../constants/Auth0Url";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body: ", body);
  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
  });
  const { access_token } = await res.json();
  //   console.log("access_token: ", access_token);

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${access_token}`);
  console.log("headers: ", headers);

  var data = await fetch(USERS_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  }).then((res) => res.json());
  //   console.log("data: ", data);

  return Response.json(data);
}
