import { Auth0, defaultPassword } from "../constants/Auth0";
import { USERS_URL } from "../constants/Auth0Url";
import { getAuthHeaders } from "../utils";

const getUserRole = async (userId: string) => {
  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
    cache: "no-cache",
  });
  const { access_token } = await res.json();
  var headers = await getAuthHeaders(access_token);
  var roles = await fetch(`${USERS_URL}/${userId}/roles`, {
    method: "GET",
    headers,
    cache: "no-cache",
  }).then((res) => res.json());
  return roles;
};

const parseUserData = async (userData: any) => {
  var users: any = [];
  for (var i = 0; i < userData.length; i++) {
    var userRoles = "";
    const roles = await getUserRole(userData[i].user_id);

    roles.map((role: any, index: number) => {
      if (index > 0) userRoles += ` | ${role.name}`;
      else userRoles += role.name;
    });
    users.push({ ...userData[i], access: userRoles });
  }
  return users;
};
export async function GET() {
  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
    cache: "no-cache",
  });
  const { access_token } = await res.json();
  var headers = await getAuthHeaders(access_token);

  var userData = await fetch(USERS_URL, {
    method: "GET",
    headers,
    cache: "no-cache",
  }).then((res) => res.json());
  const users = await parseUserData(userData);
  return Response.json(users);
}
