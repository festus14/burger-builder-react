import SecureLS from "secure-ls";

var ls = new SecureLS();

export const isAuthenticated = () => ls.get("token");

// export const getAuthorizationHeader = () => `Bearer ${isAuthenticated()}`;

export const removeAuthenticatedState = () => {
  ls.remove("token");
  ls.remove("refresh");
  ls.remove("expiresIn");
};

export const authenticateUser = (idToken, refreshToken, expiresIn) => {
  ls.set("token", idToken);
  ls.set("refresh", refreshToken);
  ls.set("expiresIn", expiresIn);
};

export default {
  isAuthenticated,
  removeAuthenticatedState,
  authenticateUser,
};
