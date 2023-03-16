import { businessApi } from "../api/business_data/business_api"
import { Client } from "@/models/clients"
import { AxiosResponse } from "axios"

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
    
    //get
    const get = async(client: Client) : Promise<Client> => {

        const url = `${CLIENTS_URL}/${client.id}`
        const response : AxiosResponse<Client> = await businessApi.get<Client>(url)
        return response.data;
    }

    //delete
    const del = async (id: number) : Promise<void> => {

        const url = `${CLIENTS_URL}/${id}`
         await businessApi.delete<Client>(url)
    }


    return { save, update, get, del }
}