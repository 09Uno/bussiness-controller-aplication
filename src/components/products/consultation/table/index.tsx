
import { Product } from "@/models/products"
import { useState } from "react"

interface ProductsRowProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

interface ConsultProductProps {
    products: Array<Product>
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}


export const ConsultProduct: React.FC<ConsultProductProps> = ({ products, onEdit, onDelete }) => {



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

                {

                    products.map((product, index) => <ProductsRow key={index} product={product} onEdit={onEdit} onDelete={onDelete} />)

                }

            </tbody>


        </table>
    )
}


const ProductsRow: React.FC<ProductsRowProps> = ({ product, onEdit, onDelete }) => {

    const [isDelete, setIsDelete] = useState<boolean>(false)

    const onDeleteClick = (product: Product) => {
        if (isDelete) {
            onDelete(product)
            setIsDelete(false)
        } else {
            setIsDelete(true)
        }
    }

    const cancelDelete = () => {
        setIsDelete(false)
    }

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.sku}</td>
            <td>{product.createdAt}</td>
            <td>

                {!isDelete &&

                    <div>
                        <button onClick={e => onEdit(product)} className="button is-small is-primary">Editar</button>
                        <button onClick={e => onDeleteClick(product)} className="button is-small is-danger">Excluir</button>
                    </div>
                }

                {isDelete &&

                    <div>
                        <button onClick={e => onDelete(product)} className="button is-small is-danger">Confirmar</button>
                        <button onClick={cancelDelete} className="button is-small is-success">Cancelar</button>
                    </div>
                }

            </td>
        </tr>
    )
}