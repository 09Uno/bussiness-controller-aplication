
import { Product } from "@/models/products"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';


import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import Router from "next/router";
import { Client } from "@/models/clients";


interface ConsultProductProps {
    products: Array<Product>
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}


export const ConsultProduct: React.FC<ConsultProductProps> = ({ products, onEdit, onDelete }) => {


    
    
    const deleteProduct = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, client: Client) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Tem certeza que deseja deletar?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {onDelete(client)
                
            },
            reject: () => { }
        });
    };

    

    const actionTemplate = (product: Product) => {
        const url = `/registration/products/page?id=${product.id}`;
        return (
            <div>

                <ConfirmPopup />
                <button
                    className="button is-big is-success"
                    onClick={e => Router.push(url)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                    className="button is-big is-danger"
                    onClick={e => {
                        deleteProduct(e, product);
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        );
    };


    return (
        <div className="columns">
            <div className="is-full">
                <DataTable
                    value={products}
                    paginator={true}
                    first={0}
                    rowsPerPageOptions={[10, 20, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    stripedRows
                    size={"small"}
                    emptyMessage="Nenhum registro"
                    rows={10}
                    onChange={e => console.log(e)}
                    style={{ width: '70vw' }}

                >
                    <Column field="id" header="Código" />
                    <Column field="name" header="Nome" />
                    <Column field="price" header="Preço" />
                    <Column field="sku" header="SKU" />
                    <Column field="createdAt" header="Data de Cadastro" />
                    <Column body={actionTemplate} header="Ações" />
                </DataTable>

            </div>
        </div>

    )
}


