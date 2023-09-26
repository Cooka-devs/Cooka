import axios from "axios";

class FormAxiosService {
  static instance = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000`,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default FormAxiosService;
