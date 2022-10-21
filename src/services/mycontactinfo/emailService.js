import resourcesServer from "@/services/config/resourcesServerConfig";

export const getEmailList = (personId, showDeletedRecords) => {
    return resourcesServer.get(`/mycontactinfo/getEmailList/${personId}/${showDeletedRecords}`);
}

export const addEmail = (personId, data) => {
    return resourcesServer.post(`/mycontactinfo/addEmail/${personId}`, data);
}

export const updateEmail = (personId, data) => {
    return resourcesServer.put(`/mycontactinfo/updateEmail/${personId}`, data);
}

export const createEmail = (personId) => {
    return resourcesServer.get(`/mycontactinfo/createEmail/${personId}`);
}

export const getEmail = (emailId) => {
    return resourcesServer.get(`/mycontactinfo/getEmail/${emailId}`);
}