import { Menu } from "./menu";

interface ILayoutProps {

    title?: string;
    children?: React.ReactNode;

}

//arquivo que renderiza o menu e o conteúdo da pagina principal
export const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
    return (
        <div className="app">
            <section className="mainContainer columns fullHeight">

                {/** componente do menu lateral esquerdo da aplicação */}
                <Menu />

                <div className="container columns is-10" >
                    <div className="section">
                        <div className="card">
                            <div className="card-header">
                                <p className="card-header-title">
                                    {props.title}
                                </p>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    {props.children}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


        </div>
    );
};

