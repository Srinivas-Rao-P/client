import resourcesServer from "@/services/config/resourcesServerConfig";

export const getNameList = (personId, showDeletedRecords) => {
    return resourcesServer.get(`/mycontactinfo/getNameList/${personId}/${showDeletedRecords}`);
}

export const addName = (personId, data) => {
    return resourcesServer.post(`/mycontactinfo/addName/${personId}`, data);
}

export const updateName = (personId, data) => {
    return resourcesServer.put(`/mycontactinfo/updateName/${personId}`, data);
}

export const createName = (personId) => {
    return resourcesServer.get(`/mycontactinfo/createName/${personId}`);
}

export const getName = (nameId) => {
    return resourcesServer.get(`/mycontactinfo/getName/${nameId}`);
}