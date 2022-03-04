import resourcesServer from "@/services/config/resourcesServerConfig";

export const getCandidateList = () => {
    return resourcesServer.get("/candidate/getCandidateList");
}
export const addCandidate = (data) => {
    return resourcesServer.post("/candidate/addCandidate", data);
}
export const updateCandidate = (data) => {
    return resourcesServer.put("/candidate/updateCandidate", data);
}
export const create = () => {
    return resourcesServer.get("/candidate/create");
}
export const getCandidateData = (candidateId) => {
    return resourcesServer.get(`/candidate/getCandidateData/${candidateId}`);
}