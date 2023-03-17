import { number } from 'yup';
import { businessApi } from "../api/business_data/business_api"
import { Client } from "@/models/clients"
import { AxiosResponse } from "axios"
import { Page } from '@/models/common/page';

const CLIENTS_URL: string = "/api/clients";

export const useClientsService = () => {


    //save
    const save  = async (client: Client) : Promise<Client> => {

        const response :  AxiosResponse<Client> = await businessApi.post<Client>(CLIENTS_URL, client);
        return response.data;


    }

    //update
    const update = async (client: Client) : Promise<Client> => {

        const url = `${CLIENTS_URL}/${client.id}`
        const response : AxiosResponse<Client> = await businessApi.put<Client>(url, client);
        return response.data;
    }
    

    //list
    const get = async (name: string ="", page: number=0, rows: number=10) : Promise<Page<Client>> => {
        const url = `${CLIENTS_URL}?name=${name}&page=${page}&size=${rows}`
        const response : AxiosResponse<Page<Client>> = await businessApi.get(url)
        return response.data
    }
    
    //get
    
    const getC = async (id: number): Promise<Client> => {
            
        const url = `${CLIENTS_URL}/${id}`;
        const response: AxiosResponse<Client> = await businessApi.get<Client>(url);
        return response.data;
}   
    

    //delete
    const del = async (id: number) : Promise<void> => {

        const url = `${CLIENTS_URL}/${id}`
         await businessApi.delete<Client>(url)
    }


    return { save, update, get, del , getC}
}