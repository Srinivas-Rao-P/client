import resourcesServer from "@/services/config/resourcesServerConfig";

export const addName = (data) => {
    return resourcesServer.post(`/mycontactinfo/addName`,data);
}

export const getPhones = (personId) => {
    return resourcesServer.get(`/mycontactinfo/getPhones/${personId}`);
}