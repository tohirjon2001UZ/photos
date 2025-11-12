import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/photos";

//  GET
export const getAlbums = async (limit = 10) => {
  const res = await axios.get(`${API_URL}?_limit=${limit}`);
  return res.data;
};

//  POST
export const createAlbum = async (newAlbum) => {
  const res = await axios.post(API_URL, newAlbum);
  return res.data;
};

//  PUT (update)
export const updateAlbum = async (id, updatedAlbum) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedAlbum);
  return res.data;
};

//  DELETE
export const deleteAlbum = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
