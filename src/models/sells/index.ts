import { Client } from "@/models/clients";
import { Product } from "@/models/products";

export interface Sell{
    client?: Client[]
    item?: Array<ItemSell>
    paymentMethod?: string
    total?: number
}


export interface ItemSell{
    product: Product | null
    quantity: number | null
}