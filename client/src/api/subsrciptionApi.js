import axiosClient from "./axiosClient";

export const subsrciptionChannelApi = (data) => {
  return axiosClient.post("/api/sub", data);
};

export const checkSubSubsrciptionApi = (channelId) => {
  return axiosClient.get(`/api/sub/check-sub/${channelId}`);
};

export const unSubsrciptionApi = (channelId) => {
  return axiosClient.delete(`/api/sub/${channelId}`);
};

export const getSubsrciptionApi = (channelId) => {
  return axiosClient.get(`/api/sub/${channelId}`);
};
