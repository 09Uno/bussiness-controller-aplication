'use client';


import { useState } from "react";
import { Layout, Input } from "../../index";

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
                id="sku"
                label="SKU *"   
                value={sku}
                onChange={setSku}
                placeholder="Digite o SKU do produto"

                />
        
                
                    <div className="field column is-half">
                        <div className="control">
                            <label className="label" htmlFor="inputPrice" >Preço *</label>
                            <input className="input"
                                id="price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Digite o valor " />

                        </div>
                </div>
            </div>

            <div className="columns">
                <div className="field column is-full ">
                    <div className="control">
                        <label className="label" htmlFor="inputProduct" >Produto *</label>
                        <input className="input"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            id="product"
                            placeholder="Digite o nome do produto" />
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="field column is-full" >
                    <label className="label" htmlFor="inputDesc" >Descrição  *</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Digite a descrição do produto" />
                    </div>
                </div>
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

export { Input };
