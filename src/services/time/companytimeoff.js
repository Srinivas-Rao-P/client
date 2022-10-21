import resourcesServer from "@/services/config/resourcesServerConfig";

export const getCompanyHolidays = () => {
    return resourcesServer.get("/time/getCompanyTimeOffList");
}

export const saveProfile = (personId, data) => {
    return resourcesServer.post(`/person/saveProfile/${personId}`, data);
}
