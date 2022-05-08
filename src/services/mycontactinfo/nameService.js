import resourcesServer from "@/services/config/resourcesServerConfig";

export const addName = (data) => {
    return resourcesServer.post(`/mycontactinfo/addName`,data);
}

export const getNames = (personId) => {
    return resourcesServer.get(`/mycontactinfo/getNames/${personId}`);
}