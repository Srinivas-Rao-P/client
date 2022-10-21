import resourcesServer from "@/services/config/resourcesServerConfig";

export const getAddressList = (personId, showDeletedRecords) => {
    return resourcesServer.get(`/mycontactinfo/getAddressList/${personId}/${showDeletedRecords}`);
}

export const addAddress = (personId, data) => {
    return resourcesServer.post(`/mycontactinfo/addAddress/${personId}`, data);
}

export const updateAddress = (personId, data) => {
    return resourcesServer.put(`/mycontactinfo/updateAddress/${personId}`, data);
}

export const createAddress = (personId) => {
    return resourcesServer.get(`/mycontactinfo/createAddress/${personId}`);
}

export const getAddress = (addressId) => {
    return resourcesServer.get(`/mycontactinfo/getAddress/${addressId}`);
}