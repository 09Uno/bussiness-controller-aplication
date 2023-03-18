'use client'

import { Layout, Loader } from "@/components"
import { ConsultProduct } from "./table"
import useSWR from 'swr'
import { AxiosResponse } from "axios"
import { businessApi } from "@/app/api/business_data/business_api"
import {useProductsService} from "@/app/services"
import { Product } from "@/models/products"
import Router from "next/router"
import { Alert } from "@/components/common/message"
import { useEffect, useState } from "react"





export const ListProduct: React.FC = () => {

    const service = useProductsService()
    const [message, setMessage] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Product[]>>('/api/products', url => businessApi.get(url))

    const [list, setList] = useState<Product[]>([])


    useEffect (() => {  
        setList(result?.data || [])
    }, [result])

    const onEdit = (product: Product) => {
            const url = `/registration/products/page/?id=${product.id}`
            Router.push(url)
        
    }
    // Não funciona na versão 13.0.1 do NextJS porque está no server side, e não no client side (procurar uma solução)

    const onDelete = (product: Product) => {

        var id = Number(product.id)

        service.del(id).then(() => {
            
            setMessage([{messageType: 'is-success', message: 'Produto excluído com sucesso'}])
            
            const newList = list.filter(item => item.id !== product.id)
            setList(newList)

            setTimeout(() => {
                setMessage([])
            }
            , 3000)
        })

    }



    if (error) {
        return <div>Erro ao carregar</div>
    }

    return (
        <Layout title="Produtos Cadastrados" message={message} >
            <ConsultProduct products={result?.data || []} onEdit={onEdit} onDelete={onDelete}/>
            <Loader isLoading={!result} />

        </Layout>
    )
}