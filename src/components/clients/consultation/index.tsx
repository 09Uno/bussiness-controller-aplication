import { Layout } from "@/components/layout"
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useSWR from 'swr'
import { AxiosResponse } from "axios";
import { Client } from "@/models/clients";
import { businessApi } from "@/app/api/business_data/business_api";
import { useEffect, useState } from "react";
import { Input } from "@/components/common/inputs";
import { Alert } from "@/components/common/message";
import { useClientsService } from "@/app/services";
import { Page } from "@/models/common/page";
import { Paginator } from "primereact/paginator";

interface ConsultClientsProps {

    id?: number
    createdAt?: string
    cpf?: string
    birthDate?: string
    name?: string
    address?: string
    email?: string
    phone?: string

}

export const ConsultClients: React.FC<ConsultClientsProps> = () => {

    const { data: result, error } = useSWR<AxiosResponse<Client[]>>('/api/clients', url => businessApi.get(url))
    const service = useClientsService();
    const [list, setList] = useState<Client[]>([])
    const [message, setMessage] = useState<Array<Alert>>([]);
    const [client, setClient] = useState<string>('')
    const [load , setLoad] = useState<boolean>(false)
    const [page, setPage] = useState<Page<Client>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 10,
    })


    useEffect(() => {
        setList(result?.data || [])
        // console.log(result?.data)
    }, [result])


    const searchClient = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        const searchedList = list.filter(item => item.name?.includes(client))
        console.log(client)
        if (searchedList.length > 0) {
            setList(searchedList)
            console.log(searchedList)
        } else {
            setMessage([{ messageType: "is-danger", message: "Cliente não encontrado" }])

            setTimeout(() => {
                setMessage([])
            }, 3000)

        }

    }

    const clearSearch = () => {
        setList(result?.data || [])
        setClient('')
    }


    const handlePage = (event: DataTablePageEvent) => {
        
        service.get(client, event?.first, event?.rows).then((response => {
            setPage(response)
        }))
    }

    return (

        <Layout title="Clientes" message={message} >

            <div className="columns">
                <form className="form" onSubmit={searchClient}>
                    <Input name="Procurar" label="Nome" id={"client"}
                        classComponent="is-full"
                        autoComplete='off'
                        placeholder="Digite o nome do cliente"
                        onChange={setClient}
                        value={client}
                    />
                    <button className="button is-success">Procurar</button>
                    <button className="button is-danger" onClick={clearSearch} >Limpar</button>
                </form>
            </div>


            <div className="columns">
                <div className="is-full">
                    <DataTable value={page.content}
                        paginator={true}
                        totalRecords={page.totalElements}
                        lazy={true} 
                        onPage={handlePage}
                        rows={page.size}
                        first={page.first}
                        tableStyle={{ minWidth: '50rem' }}>

                        <Column field={"id"} header={"Chave"} />
                        <Column field={"createdAt"} header={"Cadastro"} />
                        <Column field={"cpf"} header={"CPF"} />
                        <Column field={"birthDate"} header={"Nascimento"} />
                        <Column field={"name"} header={"Nome"} />
                        <Column field={"address"} header={"Endereço"} />
                        <Column field={"email"} header={"E-mail"} />
                        <Column field={"phone"} header={"Telefone"} />

                    </DataTable>
                </div>
            </div>

        </Layout>

    )


}