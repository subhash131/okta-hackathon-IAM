export const Auth0 = {
  domain: process.env.domain,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  audience: process.env.audience,
  dbConnection: process.env.dbConnection,
};

export const baseUrl = `https://${Auth0.domain}`;
// Danger: it is not recomended to hard code passwords
export const defaultPassword = "oktaHackthon@2023";
