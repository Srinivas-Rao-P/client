import resourcesServer from "@/services/config/resourcesServerConfig";

export const sendEmail = (data) => {
    return resourcesServer.post("/email/sendEmail", data);
}