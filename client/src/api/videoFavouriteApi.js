import axiosClient from "./axiosClient";

export const addVideoFavouriteApi = (data) => {
  return axiosClient.post("/api/favourite", data);
};

export const getVideoFavouriteApi = () => {
  return axiosClient.get("/api/favourite");
};

export const deleteVideoFavouriteApi = (videoId) => {
  return axiosClient.delete(`/api/favourite/${videoId}`);
};
