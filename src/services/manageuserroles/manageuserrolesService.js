import resourcesServer from "@/services/config/resourcesServerConfig";

export const getUsers = () => {
    return resourcesServer.get(`/manageuserroles/getUsers`);
}

export const getUserroles = (personId) => {
    return resourcesServer.get(`manageuserroles/getUserroles/${personId}`);
}

export const addUserrole = (personId, data) => {
    return resourcesServer.post(`manageuserroles/addUserrole/${personId}`, data);
}

export const removeUserrole = (personId, data) => {
    return resourcesServer.post(`manageuserroles/removeUserrole/${personId}`, data);
}