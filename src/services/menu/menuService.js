import resourcesServer from "@/services/config/resourcesServerConfig";

export const getMenu = () => {
    return resourcesServer.get(`/menu`);
}
export const saveMenu = (menuId, data) => {
    return resourcesServer.put(`/menu/saveMenu/${menuId}`, data);
}
