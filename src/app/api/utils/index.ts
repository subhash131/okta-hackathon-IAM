export const getAuthHeaders = async (access_token: string) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${access_token}`);
  return headers;
};
