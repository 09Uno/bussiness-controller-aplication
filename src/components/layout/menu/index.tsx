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
                <MenuHome href="/" label="HOME" />
                <MenuHome href="/registration/products/page" label="CADASTRAR PRODUTOS" />
                <MenuHome href="/consultation/products/page" label="PRODUTOS CADASTRADOS" />
                <MenuHome href="/registration/clients/page" label="CADASTRAR CLIENTES" />
                
{/* 
                <MenuHome href="/costumers" label="Clientes" />
                <MenuHome href="/users" label="Usuários" /> */}
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