import resourcesServer from "@/services/config/resourcesServerConfig";

export const getBankList = (personId) => {
    return resourcesServer.get(`/bank/getBankList/${personId}`);
}
export const addBank = (personId, data) => {
    return resourcesServer.post(`/bank/addBank/${personId}`, data);
}
export const updateBank = (personId, data) => {
    return resourcesServer.put(`/bank/updateBank/${personId}`, data);
}
export const create = (personId) => {
    return resourcesServer.get(`/bank/create/${personId}`);
}
export const getBankData = (bankId) => {
    return resourcesServer.get(`/bank/getBankData/${bankId}`);
}
export const validateAccountNumber = (accountnumber) => {
    return resourcesServer.get(`/bank/validateAccountNumber/${accountnumber}`);
}