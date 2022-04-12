import resourcesServer from "@/services/config/resourcesServerConfig";

export const getMenu = () => {
    return resourcesServer.get(`/menu`);
}
export const getSubMenu = (data) => {
    return resourcesServer.post(`/menu/getSubMenu`, data);
}
export const addMainMenu = (data) => {
    return resourcesServer.post(`/menu/addMainMenu`, data);
}
export const addSubMenu = (menuId, data) => {
    return resourcesServer.post(`/menu/addSubMenu/${menuId}`, data);
}
export const updateSubMenu = (menuId, data) => {
    return resourcesServer.put(`/menu/updateSubMenu/${menuId}`, data);
}
