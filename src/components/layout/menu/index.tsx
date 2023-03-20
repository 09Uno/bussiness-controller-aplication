import Link from "next/link";
import Image from "next/image";
import  logo  from "@/images/business-chart.png" 

//interface para os itens do menu lateral esquerdo da aplicação
interface IMenuProps {
    href: string;
    label: string;
}

export const Menu: React.FC = () => {

    return (


        //menu lateral esquerdo da aplicação
        <aside className="menu is-2 is-narrow-mobile is-fullHeight section is-hidden-mobile " >
            <div className="menu-label is-hidden-touch">
                <Image src={logo} width={200} height={200} alt="Business chart" />
            </div>
            <ul className="menu-list">
                <MenuHome href="/" label="HOME" />
                <MenuHome href="/registration/products/page" label="Cadastrar Produtos" />
                <MenuHome href="/consultation/products/page" label="Produtos" />
                <MenuHome href="/registration/clients/page" label="Cadastrar Clientes" />
                <MenuHome href="/consultation/clients/page" label="Clientes" />
                <MenuHome href="/sells/page" label="Vendas" />
                

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