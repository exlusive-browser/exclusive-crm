import axios from "axios";
import { BASE_URL } from "../config";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
