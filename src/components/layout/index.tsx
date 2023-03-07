import { Menu } from "./menu";
import { feedBackMessage, Alert } from "./../common/message";



interface ILayoutProps {

    title?: string;
    children?: React.ReactNode;
    message?: Array<Alert>;

}

//arquivo que renderiza o menu e o conteúdo da pagina principal
export const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
    return (
        <div className="app">
            <section className="mainContainer columns fullHeight">

                {/** componente do menu lateral esquerdo da aplicação */}
                <Menu />

                <div className="container columns is-full" >
                    <div className="section">
                        <div className="card">
                            <div className="card-header">
                                <p className="card-header-title">
                                    {props.title}
                                </p>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="content">

                                {props.message && props.message.map(message => (
                                    <feedBackMessage
                                        {...message}
                                    />

                                ))}

                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    );
};

