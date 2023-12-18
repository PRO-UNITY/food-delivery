import axios from "axios";

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

export const BASE_URL = "https://api.prounity.uz/food-delivery"
// export const BASE_URL = "http://192.168.0.181:8000"

export const postData = async (item,url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(item)
    })
    const data = await response.json();
    return data;
};

export const postDataWithToken = async (item,url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: getHeaderWithToken(localStorage.getItem('token')),
        body: JSON.stringify(item)
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

export const putDataWithounAny = async (url) => {
    const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        headers: getHeaderWithToken(localStorage.getItem('token')),
    });
    
    return response;
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
        `${BASE_URL}/user`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    const role = data?.groups && data?.groups[0]?.name;
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

export const AddWithFormData = async (url, item) => {
    const token = localStorage.getItem('token')
    const response = await axios.post(BASE_URL+url, item, {
        headers: {
            'Content-Type': 'multipart/formData',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = response
    return data
}

export const EditWithFormData = async (url, item) => {
    const token = localStorage.getItem('token')
    const response = await axios.put(BASE_URL+url, item, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}



export const newPasswordComplete = async (password) => {
    const response = await fetch(BASE_URL+`/auth/set_new_password`, {
        method: 'PATCH',
        body: JSON.stringify(password),
        headers: getHeader()
    });
    const data = await response.json();
    return data;
}
    