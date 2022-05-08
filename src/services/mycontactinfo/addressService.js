import resourcesServer from "@/services/config/resourcesServerConfig";

export const addAddress = (data) => {
    return resourcesServer.post(`/mycontactinfo/addAddress`,data);
}

export const getAddress = (personId) => {
    return resourcesServer.get(`/mycontactinfo/getAddress/${personId}`);
}