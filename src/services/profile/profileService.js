import resourcesServer from "@/services/config/resourcesServerConfig";

export const getProfile = (personId) => {
    return resourcesServer.get(`/person/getProfile/${personId}`);
}

export const saveProfile = (personId, data) => {
    return resourcesServer.post(`/person/saveProfile/${personId}`, data);
}
