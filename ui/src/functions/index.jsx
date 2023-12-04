const getHeader = () => {
    return {
        'Content-Type': 'application/json',
    };
};

const getHeaderWithToken = (token) => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

const BASE_URL = "https://api.prounity.uz/food-delivery"

export const postData = async (item,url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
};

export const putData = async (item,url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
};

export const getDataWithToken = async (url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'GET',
        headers:getHeaderWithToken(localStorage.getItem('token'))
    });
    const data = await response.json();
    return data;
};

export const getRole = async () => {
    const response = await fetch(BASE_URL + "/authen/user_profiles_views/", {
        method: 'GET',
        headers:getHeaderWithToken()
    });
    const data = await response.json();
    return data;
}