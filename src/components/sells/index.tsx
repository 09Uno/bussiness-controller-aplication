import { Sell } from "@/models/sells";
import { Layout } from "../layout";
import {SellForm} from './form'

export const Sells: React.FC = () => {
    
    const handleSubmit = (sell : Sell) => {

        console.log(sell)

    }


    return (
        <Layout title="Vendas">

            <SellForm onSubmit={handleSubmit} />

        </Layout>

    )
}

