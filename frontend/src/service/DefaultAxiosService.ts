import axios from "axios";

class DefaultAxiosService {
  static instance = axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000`,
    withCredentials: true,
  });
}

export default DefaultAxiosService;
