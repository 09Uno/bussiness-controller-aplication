import { Layout } from "@/components/layout"
import { Input, TextArea } from "@/components"
import { useState } from "react";
import { Alert } from "@/components/common/message";

export const RegistrationOfClients: React.FC = () => {

    const [id, setId] = useState<string | undefined>("");
    const [created_at, setCreated_at] = useState<string | undefined>("");
    const [name, setName] = useState<string | undefined>("");
    const [cpf, setCpf] = useState<string | undefined>("");
    const [address, setAddress] = useState<string | undefined>("");
    const [birtDay, setBirtDay] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [phone, setPhone] = useState<string | undefined>("");

    const [message, setMessage] = useState<Array<Alert>>([]);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit")
    }


    return (
        <Layout title="Cadastro de Clientes">
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
                            value={created_at}
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
                    // error={errors.name}
                    />

                </div>


                <div className="columns">

                    <Input
                        id="cpf"
                        label="CPF *"
                        value={cpf}
                        onChange={setCpf}
                        placeholder="Digite o preço do produto"
                        classComponent="is-half"
                        maxLength={11}
                        currency={true}
                    // error={errors.price}
                    />


                    <Input
                        id="birtDay"
                        label="Data de Nascimento *"
                        value={birtDay}
                        onChange={setBirtDay}
                        placeholder="Dia de Nascimento"
                        classComponent="is-half"
                        maxLength={11}
                    // error={errors.sku}
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
                    // error={errors.name}
                    />

                </div>

                <div className="columns">

                    <Input
                        id="phone"
                        label="Telefone do Cliente "
                        value={phone}
                        onChange={setPhone}
                        placeholder="Digite o telefone do cliente"
                        classComponent="is-half"
                    // error={errors.name}
                    />

            

                

                    <Input
                        id="email"
                        label="Email do Cliente "
                        value={email}
                        onChange={setEmail}
                        placeholder="Digite o email do cliente"
                        classComponent="is-full"
                    // error={errors.name}
                    />

                </div>



                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success"
                        >
                            {id ? "Atualizar" : "Cadastrar"}

                        </button>
                    </div>
                    <div className="control">
                        <button className="button is-warning">Voltar</button>
                    </div>
                </div>

            </form>

        </Layout>
    )


}