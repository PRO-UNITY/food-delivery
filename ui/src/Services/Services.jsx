import axios from "axios";

export const BASE_URL = "https://api.prounity.uz/food-delivery";
// export const BASE_URL = "http://192.168.0.114:8000/";

export const customFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();

      if (token && response.status === 401) {
        refreshToken();
      }

      console.error(
        `Error making request to ${url} with method ${options.method}`,
        errorData
      );
      console.error("Error stack:", new Error().stack);
      throw new Error(
        JSON.stringify({ error: errorData, status: response.status })
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      console.error("Network error:", error);
    } else {
      console.error("Error:", error);
    }

    throw error;
  }
};

// const getHeader = () => {
//   return {
//     "Content-Type": "application/json",
//   };
// };

// const getHeaderWithToken = (token) => {
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

export const refreshToken = async () => {
  const refreshTok = localStorage.getItem("refresh");
  const refreshToken = {
    refresh: refreshTok,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(refreshToken),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await customFetch(
    BASE_URL + "/user/token/refresh/",
    options
  );
  localStorage.setItem("token", response.access);
};

export const postData = async (item, url) => {
  const options = {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await customFetch(BASE_URL + url, options);
  return response;
};

export const putData = async (item, url) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await customFetch(BASE_URL + url, options);
  return response;
};

// export const putDataWithounAny = async (url) => {
//   const response = await fetch(BASE_URL + url, {
//     method: "PUT",
//     headers: getHeaderWithToken(localStorage.getItem("token")),
//   });

//   return response;
// };

export const getKitchen = async (url) => {
  const response = await fetch(BASE_URL + url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const getData = async (url) => {
  const response = await customFetch(BASE_URL + url, {});
  return response;
};

// export const getRole = async () => {
//   const response = await fetch(BASE_URL + "/authen/user_profiles/", {
//     method: "GET",
//     headers: getHeaderWithToken(localStorage.getItem("token")),
//   });
//   const data = await response.json();
//   return data;
// };

export const getRoleUser = async () => {
  const response = await customFetch(`${BASE_URL}/user`, {});
  const data = await response;
  const role = await data?.role;
  localStorage.setItem("role", role);
  return role;
};

export const deleteData = async (url) => {
  const options = {
    method: "DELETE",
  };
  const response = await customFetch(BASE_URL + url, options);
  return response.data;
};

export const AddWithFormData = async (url, item) => {
  const options = {
    method: "POST",
    body: item,
  };
  const response = await customFetch(BASE_URL + url, options);
  return response.data;
};

export const EditWithFormData = async (url, item) => {
  const options = {
    method: "PUT",
    "Content-Type": "multipart/formData",
    body: item,
  };
  const response = await customFetch(BASE_URL + url, options);
  return response.data;
};

export const newPasswordComplete = async (password) => {
  const options = {
    method: "PATCH",
    body: JSON.stringify(password),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await customFetch(
    BASE_URL + `/auth/password/confirm`,
    options
  );
  return response.data;
};
