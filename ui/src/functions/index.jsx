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

export const postDataWithToken = async (item,url,config) => {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: getHeaderWithToken(localStorage.getItem('token'),config),
        body: item
    });
    const data = await response.json();
    return data;
};

export const putData = async (item,url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: getHeaderWithToken(localStorage.getItem('token')),
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
    const response = await fetch(BASE_URL + "/authen/user_profiles/", {
        method: 'GET',
        headers:getHeaderWithToken(localStorage.getItem("token"))
    });
    const data = await response.json();
    return data;
}

export const getRoleUser = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(
        `${BASE_URL}/authen/user_profiles`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    const role = data.groups[0].name;
    localStorage.setItem('role', role);
    return role;
}

export const deleteData = async (url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers:getHeaderWithToken(localStorage.getItem("token"))
    });
    const data = await response.json();
    return data;
}

