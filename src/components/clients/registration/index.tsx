'use client';


import { Layout } from "@/components/layout"
import { Input } from "@/components"
import { useEffect, useState } from "react";
import { Alert } from "@/components/common/message";
import { useClientsService } from "@/app/services/index";
import { Client } from "@/models/clients";
import { useRouter } from "next/router";
import { maskType } from "@/utils/masks";
import * as yup from "yup";





export const RegistrationOfClients: React.FC = () => {

    const [id, setId] = useState<string | undefined>("");
    const [createdAt, setCreatedAt] = useState<string | undefined>("");
    const [name, setName] = useState<string | undefined>("");
    const [cpf, setCpf] = useState<string | undefined>("");
    const [address, setAddress] = useState<string | undefined>("");
    const [birthDate, setBirthDate] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [phone, setPhone] = useState<string | undefined>("");
    const [message, setMessage] = useState<Array<Alert>>([]);

    const service = useClientsService();

    const router = useRouter();
    const { id: queryId } = router.query;
    const idNumber = Number(queryId);

    useEffect(() => {
        if (queryId) {
            service
                .getC(idNumber)
                .then(client => {
                    setId(client.id);
                    setName(client.name);
                    setCpf(client.cpf);
                    setAddress(client.address);
                    setBirthDate(client.birthDate);
                    setEmail(client.email);
                    setPhone(client.phone);
                    setCreatedAt(client.createdAt);
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryId])

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit")
        //como tem o mesmo nome da variável, não precisa colocar o nome da variável que a variável recebe
        const data: Client = {
            id,
            name,
            cpf,
            address,
            birthDate,
            email,
            phone
        }

        const validation = yup.object().shape({
            cpf: yup.string().trim().required("CPF é obrigatório"),
            name: yup.string().trim().required("Nome é obrigatório"),
        })
        validation.validate(data).then(() => {
            if (id) {
                service.update(data).then(() => {
                    setMessage([{ messageType: "is-success", message: "Cliente atualizado com sucesso" }])
                }
                ).catch(() => {
                    setMessage([{ messageType: "is-danger", message: "Erro ao atualizar o cliente" }])
                })
                setTimeout(() => {
                    setMessage([])
                }
                    , 3000)
            } else {
                service.save(data).then(client => {
                    setMessage([{ messageType: "is-success", message: "Cliente cadastrado com sucesso" }])
                    setId(client.id);
                    setCreatedAt(client.createdAt);
                }
                ).catch(() => {
                    setMessage([{ messageType: "is-danger", message: "Erro ao cadastrar o cliente" }])
                })
                setTimeout(() => {
                    setMessage([])
                }
                    , 3000)
            }
        }).catch(err => {
            setErrors({ ...errors, [err.path]: err.message })
        })
    }

    const cleanFields = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setId("");
        setName("");
        setCpf("");
        setAddress("");
        setBirthDate("");
        setEmail("");
        setPhone("");
        setCreatedAt("");
        setMessage([]);
    }

    return (
        <Layout title="Cadastro de Clientes" message={message}>
            <form onSubmit={submit} >
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
                            value={createdAt}
                            classComponent="is-half"
                            disabled={true}
                        />
                    </div>
                }


                <div className="columns">
                    <Input
                        id="name"
                        label="Nome do Cliente *"
                        value={name}
                        onChange={setName}
                        placeholder="Digite o nome do cliente"
                        classComponent="is-full"
                        error={errors.name}
                    />
                </div>

                <div className="columns">
                    <Input
                        id="cpf"
                        label="CPF *"
                        value={cpf}
                        onChange={(value: string) => {
                            const formattedValue = maskType(value, "cpf");
                            setCpf(formattedValue);
                        }}
                        placeholder="Digite seu CPF"
                        classComponent="is-half"
                        maxLength={14}
                        error={errors.cpf}
                    />

                    <Input
                        id="birthDate"
                        label="Data de Nascimento *"
                        value={birthDate}
                        onChange={(value: string) => {
                            const formattedValue = maskType(value, "date");
                            setBirthDate(formattedValue);
                        }}
                        placeholder="Dia de Nascimento"
                        classComponent="is-half"
                        maxLength={10}
                    />
                </div>

                <div className="columns">
                    <Input
                        id="address"
                        label="Endereço do Cliente "
                        value={address}
                        onChange={setAddress}
                        placeholder="Digite o endereço"
                        classComponent="is-full"
                    />
                </div>

                <div className="columns">
                    <Input
                        id="phone"
                        label="Telefone do Cliente "
                        value={phone}
                        onChange={(value: string) => {
                            const formattedValue = maskType(value, "phone");
                            setPhone(formattedValue);
                        }
                        }
                        placeholder="Digite o telefone do cliente"
                        classComponent="is-half"
                    />

                    <Input
                        id="email"
                        label="Email do Cliente "
                        value={email}
                        onChange={setEmail}
                        placeholder="Digite o email do cliente"
                        classComponent="is-full"
                    />
                </div>

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
    )


}