import resourcesServer from "@/services/config/resourcesServerConfig";

export const deleteRecord = (id, pid) => {
    return resourcesServer.post("/history/deleteRecord", {
        id: id,
        pid: pid
    });
}

export const getHistory = (id, pid) => {
    return resourcesServer.post("/history/getHistory", {
        id: id,
        pid: pid
    });
}