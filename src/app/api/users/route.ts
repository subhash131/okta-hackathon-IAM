import { defaultPassword } from "../constants/Auth0";
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
export async function POST(req: Request) {
  const body = await req.json();

  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
    cache: "no-cache",
  });
  const { access_token } = await res.json();
  var headers = await getAuthHeaders(access_token);

  var userData = await fetch(USERS_URL, {
    method: "POST",
    headers,
    cache: "no-cache",
    body: JSON.stringify({
      user_id: body.user_id,
      username: body.username,
      family_name: body.family_name,
      given_name: body.given_name,
      email: body.email,
      connection: "Username-Password-Authentication",
      password: defaultPassword,
    }),
  }).then((res) => res.json());
  if (userData.statusCode != 409) {
    const role = await getRoleByName(body.access);
    try {
      const r = await fetch("http://localhost:3000/api/assignRole", {
        body: JSON.stringify({
          requestedFor: `${"auth0|" + body.user_id}`,
          role: role,
        }),
        method: "POST",
        cache: "no-cache",
      }).then(async (res) => await res.json());
    } catch (e) {
      console.log("e :", e);
    }
  }
  return Response.json(userData);
}

const getRoleByName = async (name: string) => {
  console.log("name: ", name);
  const data = await fetch("http://localhost:3000/api/roles", {
    method: "GET",
    cache: "no-cache",
  }).then(async (res) => await res.json());
  const role = data.filter((d: any) => {
    return d.name == name;
  });
  return role[0].id;
};

export async function PATCH(req: Request) {
  const { userId, blocked } = await req.json();
  var res = await fetch("http://localhost:3000/api/getAccessToken", {
    method: "POST",
    cache: "no-cache",
  });
  const { access_token } = await res.json();
  var headers = await getAuthHeaders(access_token);

  var userData = await fetch(`${USERS_URL}/${userId}`, {
    method: "PATCH",
    headers,
    cache: "no-cache",
    body: JSON.stringify({ blocked }),
  }).then((res) => res.json());
  const users = await parseUserData(userData);
  return Response.json({ userId, blocked });
}
