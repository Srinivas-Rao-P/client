import resourcesServer from "@/services/config/resourcesServerConfig";

export const getMenu = () => {
    return resourcesServer.get(`/menu`);
}
