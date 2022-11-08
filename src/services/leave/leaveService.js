import resourcesServer from "@/services/config/resourcesServerConfig";

export const getLeaveTypeList = () => {
  return resourcesServer.get(`/leave/getLeaveTypeList`);
};
export const getLeaveType = (id) => {
  return resourcesServer.get(`/leave/getLeaveType/${id}`);
};
export const addLeaveType = (data) => {
  return resourcesServer.post(`/leave/addLeaveType`, data);
};
export const updateLeaveType = (id, data) => {
  return resourcesServer.put(`/leave/updateLeaveType/${id}`, data);
};
