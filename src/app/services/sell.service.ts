import { AxiosResponse } from 'axios';
import { Sell } from "@/models/sells";
import { businessApi } from "../api/business_data/business_api";


const SELL_URL : string = "/api/sell"

export const useSellService = () => {

    
    const makeSell = async (sell : Sell) : Promise<void> => {

        await businessApi.post<Sell>(SELL_URL, sell);
        
    } 

    return {
        makeSell
    }


}