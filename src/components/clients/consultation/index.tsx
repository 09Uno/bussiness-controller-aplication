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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';

import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method


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

    useEffect(() => {
        handlePage({ first: 0, rows: 10 });
    }, [])

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

    const deleteClient = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, client: Client) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Tem certeza que deseja deletar?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => del(client),
            reject: () => { }
        });
    };



    const actionTemplate = (client: Client) => {
        const url = `/registration/clients/page?id=${client.id}`
        return (
            <div>
                <ConfirmPopup />

                <button
                    className="button is-big is-success "
                    onClick={e => Router.push(url)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button className="button is-big is-danger " onClick={e => {
                    e.preventDefault();
                    deleteClient(e, client);
                }}
                >

                    <FontAwesomeIcon icon={faTrashAlt} />

                </button>
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
                        style={{ width: '70vw' }}

                    >

                        <Column field={"id"} header={"Chave"}  />
                        <Column field={"createdAt"} header={"Cadastro"}  />
                        <Column field={"cpf"} header={"CPF"}  />
                        <Column field={"birthDate"} header={"Nascimento"}  />
                        <Column field={"name"} header={"Nome"}  />
                        <Column field={"address"} header={"Endereço"}  />
                        <Column field={"email"} header={"E-mail"}  />
                        <Column field={"phone"} header={"Telefone"}  />
                        <Column body={actionTemplate} />

                    </DataTable>
                </div>
            </div>

        </Layout>

    )


}