import { Client } from "@/models/clients";
import { Product } from "@/models/products";

export interface Sell{
    client: Client
    products: Array<Product>
    paymentMethod: string
    total: number
}