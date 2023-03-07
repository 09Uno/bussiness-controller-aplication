import Axios , {AxiosInstance} from "axios";

export const businessApi: AxiosInstance = Axios.create({
    baseURL: "http://localhost:8080/"
});



