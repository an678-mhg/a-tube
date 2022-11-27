import axiosClient from "./axiosClient";

export const getChannelInfoApi = (id) => {
  return axiosClient.get(`/api/channel/${id}`);
};

export const getChannelVideoApi = (id, page) => {
  return axiosClient.get(`/api/channel/video/${id}?page=${page}`);
};

export const updateUserApi = (data) => {
  return axiosClient.put("/api/channel/user", data);
};

export const searchChannelApi = (query) => {
  return axiosClient.get(`/api/channel/search/multi?q=${query}`);
};

export const getChannelSubsrciptionApi = () => {
  return axiosClient.get("/api/channel/sub/resgisted");
};
