import axios from "axios";

class DefaultAxiosService {
  static instance = axios.create({
    withCredentials: true,
  });
}

export default DefaultAxiosService;
