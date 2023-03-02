const data = JSON.parse(localStorage.getItem('nyzam_profile_info'));
export const getProfile = () => {
    return data;
}

export const getToken = () => {
    return data?.token;
}

export const isLogin = () => {
    if (data?.token) {
        return true;
    }
    return false;
}