export const getProfile = () => {
    const data = JSON.parse(localStorage.getItem('nyzam_profile_info'));
    return data;
}