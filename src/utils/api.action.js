import axios from "axios";
import { BACKEND } from "./config";

export const registerUser = async (body) => {
  return await axios.post(`${BACKEND}/auth/register`, body);
};

export const loginUser = async (body) => {
  return await axios.post(`${BACKEND}/auth/login`, body);
};

export const userDetails = async () => {
  return axios.get(`${BACKEND}/api`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const getDetailsFromToken = async () => {
  return await axios.get(`${BACKEND}/auth/currentUser`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const updateUserDetails = async (body) => {
  return await axios.post(`${BACKEND}/api`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
