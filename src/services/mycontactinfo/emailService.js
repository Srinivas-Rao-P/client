import resourcesServer from "@/services/config/resourcesServerConfig";

export const addEmails = (data) => {
    return resourcesServer.post(`/mycontactinfo/addEmails`,data);
}

export const getEmails = (personId) => {
    return resourcesServer.get(`/mycontactinfo/getEmails/${personId}`);
}