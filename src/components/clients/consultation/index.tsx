import { Layout } from "@/components/layout"
import { DataTable, DataTablePageEvent } from 'primereact/datatable';


import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
        

import { Column } from 'primereact/column';
import { Client } from "@/models/clients";
import { Button } from 'primereact/button'
import { useEffect, useState } from "react";
import { Input } from "@/components/common/inputs";
import { Alert } from "@/components/common/message";
import { useClientsService } from "@/app/services";
import { Page } from "@/models/common/page";
import Router from "next/router";

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

    const service = useClientsService();
    const [list, setList] = useState<Client[]>([])
    const [message, setMessage] = useState<Array<Alert>>([]);
    const [clientName, setClientName] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)
    const [page, setPage] = useState<Page<Client>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0,
    })


    const searchClient = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePage({ first: 0, rows: 10 });

    };
    const clearSearch = () => {
        setClientName('')
    }




    const handlePage = (event: DataTablePageEvent) => {
        setLoad(true)
        service.get(clientName, event?.page, event?.rows).then(response => {
            console.log(response)
            console.log(event.page)
            setPage({ ...response, first: event?.first, size: event?.rows });
        }).finally(() => { setLoad(false) })
    };



    const del = (client: Client) => {

        const id = Number(client.id)

        service.del(id).then(result => {

            handlePage({ first: 0, rows: 10 });
            setMessage([{ messageType: "is-success", message: "Registro Deletado com sucesso" }])
        })
        setTimeout(() => {
            setMessage([])
        }
            , 3000)

    }

    const actionTemplate = (client: Client) => {
        const url = `/registration/clients/page?id=${client.id}`
        return (
            <div>
                <Button label="Editar"
                    className="p-button-rounded p-button-info"
                    onClick={e => Router.push(url)}
                />
                <Button label="Deletar" onClick={e => del(client)}
                className="p-button-rounded p-button-danger"
                />
            </div>
        )
    }

    return (

        <Layout title="Clientes" message={message} >

            <div className="columns">
                <form className="form" onSubmit={searchClient}>
                    <Input name="Procurar" label="Nome" id={"client"}
                        classComponent="is-full"
                        autoComplete='off'
                        placeholder="Digite o nome do cliente"
                        onChange={setClientName}
                        value={clientName}
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
                        loading={load}
                        rowsPerPageOptions={[10, 20, 50]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        stripedRows
                        size={"small"}
                        emptyMessage="Nenhum registro"

                    >

                        <Column field={"id"} header={"Chave"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"createdAt"} header={"Cadastro"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"cpf"} header={"CPF"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"birthDate"} header={"Nascimento"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"name"} header={"Nome"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"address"} header={"Endereço"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"email"} header={"E-mail"} style={{ whiteSpace: 'nowrap' }} />
                        <Column field={"phone"} header={"Telefone"} style={{ whiteSpace: 'nowrap' }} />
                        <Column body={actionTemplate} style={{ textAlign: 'center', width: '8em' }} />

                    </DataTable>
                </div>
            </div>

        </Layout>

    )


}