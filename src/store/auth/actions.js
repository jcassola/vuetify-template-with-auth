import adminAPI from "@/api/axios";

//Login user
export const login = async ({ dispatch }, loginData) => {
  const { data } = await adminAPI.post("/login", loginData);

  const { status } = data;

  if (status === 1) {
    await dispatch("attempt", data.access_token);
  }
  return data;
};

export const attempt = async ({ commit, state }, token) => {
  if (token) {
    commit("setToken", token);
  }
  if (!state.token) {
    return;
  }

  adminAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const { data } = await adminAPI.get("/user-profile");

    localStorage.setItem("token", token);
    commit("setUser", data);
  } catch (error) {
    commit("setToken", null);
    commit("setUser", null);
  }
};

//Logout current user
export const logout = async ({ commit }) => {
  const { data } = await adminAPI.get("/logout");

  if (data.status === 1) {
    commit("setToken", null);
    commit("setUser", null);

    adminAPI.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("token");

    return true;
  } else {
    return false;
  }
};
