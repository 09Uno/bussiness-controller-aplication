import { businessApi } from "../api/business_data/business_api";
import { SalesDashboardData } from "@/models/dashboard";
import { AxiosResponse } from "axios";

const SALES_URl ="api/dashboard"

export const useSaleDashboardService = () => {

    const get = async () : Promise<SalesDashboardData> => {

        const response : AxiosResponse<SalesDashboardData> = await businessApi.get<SalesDashboardData>(SALES_URl)
        return response.data

    }
   
    return {get}

}