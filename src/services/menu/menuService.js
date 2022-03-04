import resourcesServer from "@/services/config/resourcesServerConfig";

export const getMenu = () => {
    return resourcesServer.get(`/menu`);
}
export const getSubMenu = (data) => {
    return resourcesServer.post(`/menu/getSubMenu`, data);
}
