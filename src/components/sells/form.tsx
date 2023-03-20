import { Client } from "@/models/clients";
import { Product } from "@/models/products";
import { Sell } from "@/models/sells";
import { useState } from "react";
import { AutoComplete, AutoCompleteCompleteEvent, } from 'primereact/autocomplete';
import { Page } from "@/models/common/page";
import {useClientsService} from '@/app/services/index'


interface SellFormProps {
    onSubmit: (sell: Sell) => void;
}

export const SellForm: React.FC<SellFormProps> = ({ onSubmit }) => {

    const service = useClientsService()
    const [product, setProduct] = useState<Array<Product>>([])
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [total, setTotal] = useState<number>(0)
    
    
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
        console.log(client)
    }
    
    const handleAutoComplete = (event: AutoCompleteCompleteEvent) => {
        let name = event.query
        service.get(name, 0, 10)
        .then(clients =>{
             setClients(clients)
        })
        // console.log(clients.content)
    }


    


    return (

        <form onSubmit={handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="client">Cliente</label>
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
                <button>confirma</button>
            </div>
        </form>
    )

}