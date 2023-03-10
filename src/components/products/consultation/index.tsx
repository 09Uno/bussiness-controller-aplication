'use client'

import { Layout, Loader } from "@/components"
import { ConsultProduct } from "./table"
import useSWR from 'swr'
import { AxiosResponse } from "axios"
import { businessApi } from "@/app/api/business_data/business_api"
import { Product } from "@/app/models/products"





export const ListProduct: React.FC = () => {



    const { data: result, error } = useSWR<AxiosResponse<Product[]>>('/api/products', url => businessApi.get(url))
    if (error) {
        return <div>Erro ao carregar</div>
    }
   
    return (
        <Layout title="Produtos Cadastrados">
            <ConsultProduct products={result?.data || []} />
            <Loader isLoading={!result} />

        </Layout>
    )
}