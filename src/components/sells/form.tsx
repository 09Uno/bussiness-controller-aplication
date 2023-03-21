import { Client } from "@/models/clients";
import { Product } from "@/models/products";
import { ItemSell, Sell } from "@/models/sells";
import { useState } from "react";
import { Page } from "@/models/common/page";
import { useClientsService, useProductsService } from '@/app/services/index'
import { AutoComplete, AutoCompleteCompleteEvent, } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";




interface SellFormProps {
    onSubmit: (sell: Sell) => void;
}

export const SellForm: React.FC<SellFormProps> = ({ onSubmit }) => {

    const service = useClientsService();
    const serviceProduct = useProductsService();
    const [products, setProducts] = useState<Array<Product>>([])
    const [product, setProduct] = useState<Product | undefined | null>(null)
    const [productId, setProductId] = useState<string | undefined>('')
    const [productsAdded, setProductsAdded] = useState<Array<ItemSell>>([])
    const [productQuantity, setProductQuantity] = useState<number | null>(0)


    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [total, setTotal] = useState<number>(0)

    const [message, setMessage] = useState<string>('')

    const [client, setClient] = useState<Client[] | null>(null)
    const [clients, setClients] = useState<Page<Client>>({
        content: [],
        first: 0,
        number: 0,
        size: 5,
        totalElements: 0,
    })



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log(client)
        setProduct(null)
        setProductId('')
    }

    const handleAutoComplete = (event: AutoCompleteCompleteEvent) => {
        let name = event.query
        service.get(name, 0, 10)
            .then(clients => {
                setClients(clients)
            })
        // console.log(clients.content)
    }

    const handleProductSelected = async (e: any) => {
        console.log(productId)
        const idToNumber = Number(productId)

        if (productId) {
            await serviceProduct.get(idToNumber)
                .then(product => {
                    setProduct(product)
                })
                .catch(error => {
                    setMessage('Produto não encontrado')
                    console.log(error)
                })
        }
    }

    const handleAddProduct = () => {
        const productAdded: Array<ItemSell> | undefined = productsAdded
        if (product !== undefined && product !== null && productQuantity)
            productAdded?.push({
                product: product,
                quantity: productQuantity
            })


        setProductsAdded(productAdded)
        console.log(productsAdded)
        setProductQuantity(0)

    }

    const handleProductNotFoundHide = () => {
        setMessage('')
        setProductId('')
        setProduct(null)

    }

    const enableAddButton = () => {
        return !product || !productQuantity
    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="p-fluid">
                <div className="p-field ">
                    <label htmlFor="client">Cliente *</label>
                    <AutoComplete
                        id="client"
                        name="client"
                        completeMethod={handleAutoComplete}
                        value={client}
                        field="name"
                        suggestions={clients.content}
                        onChange={(e) => setClient(e.value)}
                    />
                </div>

                <br />


                <div className="p-grid">
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText
                                onBlur={handleProductSelected}
                                value={productId} onChange={e => setProductId(e.target.value)} />
                            <label htmlFor="id">Código</label>
                        </span>

                    </div>

                    <div className="p-col-6">
                        <span className="p-field">
                            <label htmlFor="product">Produto</label>
                            <AutoComplete
                                field="name"
                                value={product} />
                        </span>
                    </div>

                    <div className="p-col-2">
                        <span className="p-field">
                            <InputNumber id="qtdProduct" name="product"

                                value={productQuantity}
                                onChange={e => setProductQuantity(e.value)}
                            />
                            <label htmlFor="qtdProduct">QTD</label>
                        </span>

                    </div>

                    <div className="p-col-2">
                        <Button type="button" label="Adicionar"
                            disabled={enableAddButton()}
                            onClick={handleAddProduct} />

                    </div>

                </div>

                <br />
                <div className="p-col-12">
                    <DataTable value={productsAdded}>
                        <Column header="SKU" field="product.sku" />
                        <Column header="Código" field="product.id" />
                        <Column header="Produto" field="product.name" />
                        <Column header="Quantidade" field="quantity" />
                        <Column header="Preço" field="product.price" />
                        <Column header="Total" field="product.price" />

                    </DataTable>
                </div>
                <Button type="submit" label="Finalizar" />
                <Dialog position="center"
                    header="Erro"
                    visible={!!message}
                    onHide={handleProductNotFoundHide}
                >
                    {message}
                </Dialog>
            </div>



        </form>
    )

}