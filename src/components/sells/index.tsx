import { Sell } from "@/models/sells";
import { Layout } from "../layout";
import { SellForm } from './form'
import { useSellService } from "@/app/services/index";
import { useState } from "react";
import { Alert } from "../common/message";

export const Sells: React.FC = () => {

    const [message, setMessage] = useState<Array<Alert>>([]);



    const handleSubmit = (sell: Sell) => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const sellService = useSellService();
        sellService.makeSell(sell).then( response => {

            setMessage([{ messageType: "success", message: "Venda realizada com sucesso" }])
        }).catch( error => {
                setMessage([{ messageType: "error", message: "Erro ao realizar venda, entre em contato com o desenvolvedor" }])
            })

    }



    return (
        <Layout title="Vendas" message={message}>

            <SellForm onSubmit={handleSubmit} />

        </Layout>

    )
}

