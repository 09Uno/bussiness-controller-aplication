'use client';


import { useState } from "react";
import { Layout } from "../../layout/index";



export const RegistrationOfProducts: React.FC = () => {


    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [productName, setProductName] = useState("");
    const [desc, setDesc] = useState("");


    const submit = () => {
        const product = { sku, price, productName, desc };

        console.log(product);

    }






    return (
        <Layout title="Cadastro de Produtos">
            <div className="columns is-half">
                <div className="field" >
                    <label className="label" htmlFor="inputSKU" >SKU: *</label>
                    <input className="input"
                        id="sku"
                        value={sku}
                        onChange={e => setSku(e.target.value)}
                        placeholder="Digite o SKU do produto" />
                </div>
                <div className="field">
                    <label className="label" htmlFor="inputPrice" >Preço *</label>
                    <input className="input"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Digite o valor do produto" />
                </div>
            </div>

            <div className="columns is-full">
                <div className="field ">
                    <label className="label" htmlFor="inputProduct" >Produto *</label>
                    <input className="input"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        id="product"
                        placeholder="Digite o nome do produto" />
                </div>
            </div>
            <div className="columns is-full">

                <div className="field">
                    <label className="label" htmlFor="inputDesc" >Descrição  *</label>
                    <textarea className="textarea"
                        id="desc"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder="Digite a descrição do produto" />
                </div>

            </div>
            <div className="columns is-full">
                <div className="field is-grouped ">
                    <div className="control">
                        <button className="button is-success"
                            onSubmit={submit}
                        >Cadastrar</button>
                    </div>
                    <div className="control">
                        <button className="button is-warning">Voltar</button>
                    </div>
                </div>
            </div>

        </Layout>
    );
}