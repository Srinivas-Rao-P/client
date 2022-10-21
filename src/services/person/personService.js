import resourcesServer from "@/services/config/resourcesServerConfig";

export const getPersonInfo = (personId) => {
    return resourcesServer.get(`/person/getPersonInfo/${personId}`);
}