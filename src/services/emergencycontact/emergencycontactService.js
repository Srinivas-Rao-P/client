import resourcesServer from "@/services/config/resourcesServerConfig";

export const getEmergencyContactList = (personId, showDeletedRecords) => {
    return resourcesServer.get(`/emergencycontact/getEmergencyContactList/${personId}/${showDeletedRecords}`);
}
export const addEmergencyContact = (personId, data) => {
    return resourcesServer.post(`/emergencycontact/addEmergencyContact/${personId}`, data);
}
export const updateEmergencyContact = (personId, data) => {
    return resourcesServer.put(`/emergencycontact/updateEmergencyContact/${personId}`, data);
}
export const create = (personId) => {
    return resourcesServer.get(`/emergencycontact/create/${personId}`);
}
export const getEmergencyContact = (emergencycontactId) => {
    return resourcesServer.get(`/emergencycontact/getEmergencyContact/${emergencycontactId}`);
}
