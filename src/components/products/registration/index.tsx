'use client';


import { useState } from "react";
import { Layout, Input, TextArea } from "../../index";

export const RegistrationOfProducts: React.FC = () => {


    const [sku, setSku] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");


    const submit = () => {
        const product = { sku, price, productName, desc };

        console.log(product);

    }






    return (
        <Layout title="Cadastro de Produtos">




            <div className="columns">

                <Input
                    id="price"
                    label="Preço *"
                    value={price}
                    onChange={setPrice}
                    placeholder="Digite o preço do produto"
                    classComponent="is-half"
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
                    value={productName}
                    onChange={setProductName}
                    placeholder="Digite o nome do produto"
                    classComponent="is-full"
                />

            </div>

            <div className="columns">
                < TextArea
                    id="desc"
                    label="Descrição *"
                    value={desc}
                    onChange={setDesc}
                    placeholder="Digite a descrição do produto"
                    classComponent="is-full"
                />
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-success"
                        onSubmit={submit}
                    >Cadastrar</button>
                </div>
                <div className="control">
                    <button className="button is-warning">Voltar</button>
                </div>
            </div>

        </Layout>
    );
}

