
import { Product } from "@/app/models/products"
import Router from "next/router"


interface ProductsRowProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

interface ConsultProductProps {
    products: Array<Product>
}


 const onEdit = (product: Product) => {
    //  if (typeof window !== 'undefined') {
    //      const url = `registration/products/?id=${product.id}` 
    //     Router.push(url)
    // }

    console.log('edit')
 }  
  // Não funciona na versão 13.0.1 do NextJS porque está no server side, e não no client side (procurar uma solução)

const onDelete = () => {
    console.log('delete')
}


export const ConsultProduct: React.FC<ConsultProductProps> = ({ products }) => {


    return (
        <table className="table is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>SKU</th>
                    <th>Data de Cadastro</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {products ?

                    products.map((product, index) => <ProductsRow key={index} product={product} onEdit={onEdit} onDelete={onDelete} />)
                    :
                    <div></div>
                }

            </tbody>


        </table>
    )
}


const ProductsRow: React.FC<ProductsRowProps> = ({ product, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.sku}</td>
            <td>{product.createdAt}</td>
            <td>
                <button onClick={e => onEdit(product)} className="button is-small is-primary">Editar</button>
                <button onClick={e => onDelete(product)} className="button is-small is-danger">Excluir</button>

            </td>
        </tr>
    )
}