import resourcesServer from "@/services/config/resourcesServerConfig";

export const getPhoneList = (personId, showDeletedRecords) => {
    return resourcesServer.get(`/mycontactinfo/getPhoneList/${personId}/${showDeletedRecords}`);
}

export const addPhone = (personId, data) => {
    return resourcesServer.post(`/mycontactinfo/addPhone/${personId}`, data);
}

export const updatePhone = (personId, data) => {
    return resourcesServer.put(`/mycontactinfo/updatePhone/${personId}`, data);
}

export const createPhone = (personId) => {
    return resourcesServer.get(`/mycontactinfo/createPhone/${personId}`);
}

export const getPhoneContact = (phoneId) => {
    return resourcesServer.get(`/mycontactinfo/getPhoneContact/${phoneId}`);
}