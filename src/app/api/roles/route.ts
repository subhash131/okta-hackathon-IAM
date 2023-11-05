import { Auth0, defaultPassword } from "../constants/Auth0";
import { ROLES_URL, USERS_URL } from "../constants/Auth0Url";
import { getAuthHeaders } from "../utils";

export async function GET() {
  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
    cache: "no-cache",
  });
  const { access_token } = await res.json();

  var headers = await getAuthHeaders(access_token);

  var data = await fetch(ROLES_URL, {
    method: "GET",
    headers,
    cache: "no-cache",
  }).then((res) => res.json());

//   console.log("data: ", data);
  return Response.json(data);
}
