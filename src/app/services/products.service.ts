import { businessApi } from "../api/business_data/business_api";
import { Product } from "@/app/models/products";
import { AxiosResponse } from "axios";

const PRODUCTS_URL: string = "/api/products";

export const useProductsService = () => {

    const save = async (product: Product): Promise<Product> => {

        const response :  AxiosResponse<Product> = await businessApi.post<Product>(PRODUCTS_URL, product);
        return response.data;


    }

    const update = async (product: Product): Promise<void> => {

        const url = `${PRODUCTS_URL}/${product.id}`;
        await businessApi.put(url, product); 
        


    }

    return { save, update };

}