import { Sell } from "@/models/sells";
import { Layout } from "../layout";
import { SellForm } from './form'
import { useSellService } from "@/app/services/index";
import { useState } from "react";
import { Alert } from "../common/message";

export const Sells: React.FC = () => {

    const [message, setMessage] = useState<Array<Alert>>([]);
    const [isSell, setIsSell] = useState<boolean>(false);


    const handleSubmit = (sell: Sell) => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const sellService = useSellService();
        console.log(sell)
        sellService.makeSell(sell).then( response => {
            setMessage([{ messageType: "is-success", message: "Venda realizada com sucesso" }])
            
        }).catch( error => {
                setMessage([{ messageType: "is-danger", message: "Erro ao realizar venda, entre em contato com o desenvolvedor" }])
            })

    }

    const handleNewSell = (condition : boolean) => {
        setIsSell(condition)
        setMessage([])
    }



    return (
        <Layout title="Vendas" message={message}>

            <SellForm onSubmit={handleSubmit} isSell={isSell} onNewSell={handleNewSell} />

        </Layout>

    )
}

