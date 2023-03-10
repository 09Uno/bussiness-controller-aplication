import Link from "next/link";

//interface para os itens do menu lateral esquerdo da aplicação
interface IMenuProps {
    href: string;
    label: string;
}

export const Menu: React.FC = () => {

    return (


        //menu lateral esquerdo da aplicação
        <aside className="menu is-2 is-narrow-mobile is-fullHeight section is-hidden-mobile " >
            <p className="menu-label is-hidden-touch">
                Minhas Vendas
            </p>
            <ul className="menu-list">
                <MenuHome href="/" label="Home" />
                <MenuHome href="/registration/products" label="Cadastrar Produtos" />
                <MenuHome href="/consultation/products" label="Produtos Cadastrados" />
                

                <MenuHome href="/sells" label="Vendas" />
                <MenuHome href="/costumers" label="Clientes" />
                <MenuHome href="/users" label="Usuários" />
            </ul>


        </aside>

    );

}


////itens do menu lateral esquerdo da aplicação
const MenuHome: React.FC<IMenuProps> = (props: IMenuProps) => {
    return (
        <Link href={props.href}>
            <p className="is-active">{props.label}</p>

        </Link>

    )

}