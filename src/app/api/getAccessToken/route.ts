import { Auth0 } from "../constants/Auth0";
import { TOKEN_URL } from "../constants/Auth0Url";

const body = {
  client_id: Auth0.clientId,
  client_secret: Auth0.clientSecret,
  audience: Auth0.audience,
  grant_type: "client_credentials",
};

export async function POST() {
  const data = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  }).then((res) => res.json());

  return Response.json({ access_token: data.access_token });
}
