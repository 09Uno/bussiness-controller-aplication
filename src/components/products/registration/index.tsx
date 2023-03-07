'use client';


import React, { useState } from "react";
import { Layout, Input, TextArea } from "../../index";
import { Product } from "@/app/models/products";
import { useProductsService } from "@/app/services";
import { convertToBigDecimal } from "@/app/utils/money";

export const RegistrationOfProducts: React.FC = () => {


    const createProduct = useProductsService();
    const [sku, setSku] = useState<string>("");
    const [price, setPrice] = useState<string | number>("");
    const [name, setName] = useState<string>("");
    const [descr, setDescr] = useState<string>("");
    const [id, setId] = useState<string | undefined >("");
    const [created_at, setCreated_at] = useState<string | undefined>("");




    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("botão ativado");
        const product: Product = {
            id,
            sku,
            price: convertToBigDecimal(price),
            name,
            descr
        };

        if(id){

            createProduct
            .update(product)
            .then(  product => {
                console.log(product);
            })

        }else{
            
            createProduct
            .save(product)
            .then(  product => {
              
                setId(product.id);
                setCreated_at(product.createdAt);
                console.log(product);
            })

        }



    }


    return (
        <Layout title="Cadastro de Produtos">



            <form onSubmit={submit}>

                {id &&

                    <div className="columns">

                    <Input
                        id="id"
                        label="Código"
                        value={id}
                        classComponent="is-half"
                        disabled={true}
                    />

                    <Input
                        id="created_at"
                        label="Data de Cadastro"
                        value={created_at}
                        classComponent="is-half"
                        disabled={true}

                    />
                </div>
                }

                <div className="columns">

                    <Input
                        id="price"
                        label="Preço *"
                        value={price}
                        onChange={setPrice}
                        placeholder="Digite o preço do produto"
                        classComponent="is-half"
                        maxLength={16}
                        currency={true}
                    />

                    <Input
                        id="sku"
                        label="SKU *"
                        value={sku}
                        onChange={setSku}
                        placeholder="Digite o SKU do produto"
                        classComponent="is-half"

                    />
                </div>

                <div className="columns">

                    <Input
                        id="product"
                        label="Produto *"
                        value={name}
                        onChange={setName}
                        placeholder="Digite o nome do produto"
                        classComponent="is-full"
                    />

                </div>

                <div className="columns">
                    < TextArea
                        id="desc"
                        label="Descrição *"
                        value={descr}
                        onChange={setDescr}
                        placeholder="Digite a descrição do produto"
                        classComponent="is-full"
                    />
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success"
                        >
                            { id ? "Atualizar" : "Cadastrar"}
                            
                        </button>
                    </div>
                    <div className="control">
                        <button className="button is-warning">Voltar</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

