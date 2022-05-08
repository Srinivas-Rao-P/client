import resourcesServer from "@/services/config/resourcesServerConfig";

export const newHire = (data) => {
    return resourcesServer.post(`/hire/newHire`,data);
}

