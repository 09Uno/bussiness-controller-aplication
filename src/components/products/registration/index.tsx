'use client';


import React, { useEffect, useState } from "react";
import { Layout, Input, TextArea } from "../../index";
import { Product } from "@/models/products";
import { useProductsService } from "@/app/services";
import { convertToBigDecimal } from "@/utils/masks";
import { Alert } from "@/components/common/message";
import * as yup from "yup";
import { useRouter } from "next/router";

interface FormErrors {
    sku?: string;
    name?: string;
    descr?: string;
    price?: string;
}


export const RegistrationOfProducts: React.FC = () => {


    const service = useProductsService();
    const [sku, setSku] = useState<string | undefined>("");
    const [price, setPrice] = useState<string | number | undefined>("");
    const [name, setName] = useState<string | undefined>("");
    const [descr, setDescr] = useState<string | undefined>("");
    const [id, setId] = useState<string | undefined>("");
    const [created_at, setCreatedA] = useState<string | undefined>("");
    const [message, setMessage] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    
    const router = useRouter();
    const { id: queryId } = router.query;
    const idNumber = Number(queryId);

    useEffect(() => {
        if (queryId) {
            service
                .get(idNumber)
                .then(product => {
                    setId(product.id);
                    setSku(product.sku);
                    setPrice(product.price);
                    setName(product.name);
                    setDescr(product.descr);
                    setCreatedA(product.createdAt);
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryId])


    const validation = yup.object().shape({
        descr: yup.string().trim().required("Descrição é obrigatório"),
        name: yup.string().trim().required("Nome é obrigatório"),
        sku: yup.string().trim().required("SKU é obrigatório"),
        price: yup.number().required("Preço é obrigatório").moreThan(0, "Preço deve ser maior que zero")
    })

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

        validation.validate(product).then(() => {
            if (id) {
                service
                .update(product)
                .then(product => {
                    console.log(product);
                    setMessage([{ messageType: "is-success", message: "Produto atualizado com sucesso" }])
                    setErrors({})
                    setTimeout(() => {
                        setMessage([])
                    }
                    , 3000)
                })
            } else {
                service
                .save(product)
                .then(product => {
                    setId(product.id);
                    setCreatedA(product.createdAt);
                    console.log(product);
                    setMessage([{ messageType: "is-success", message: "Produto cadastrado com sucesso" }])
                        setErrors({})
                        setTimeout(() => {
                            setMessage([])
                        }
                        , 3000)
                    })
            }
        }).catch(err => {
            setErrors({ ...errors, [err.path]: err.message })
        })
    }
    
    const cleanFields = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setId("");
        setSku("");
        setPrice("");
        setName("");
        setDescr("");
        setCreatedA("");
        setErrors({});
        setMessage([]);
    }
    
    return (
        <Layout title="Cadastro de Produtos" message={message}>
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
                        error={errors.price}
                    />

                    <Input
                        id="sku"
                        label="SKU *"
                        value={sku}
                        onChange={setSku}
                        placeholder="Digite o SKU do produto"
                        classComponent="is-half"
                        maxLength={16}
                        error={errors.sku}
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
                        error={errors.name}
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

                <p className="help is-danger" >
                    {errors.descr}
                </p>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success">
                            {id ? "Atualizar" : "Cadastrar"}
                        </button>
                    </div>
                    <div className="control">
                        <button onClick={cleanFields} className="button is-warning">Voltar</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}

