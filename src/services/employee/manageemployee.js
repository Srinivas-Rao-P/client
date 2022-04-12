import resourcesServer from "@/services/config/resourcesServerConfig";

export const manageEmployee = (personId) => {
    return resourcesServer.get(`/employee/manageEmployee/${personId}`);
}


