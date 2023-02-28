import { Menu } from "./menu";


//arquivo que renderiza o menu e o conteúdo da pagina principal
export const Layout: React.FC = () => {
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
                                    Home
                                </p>
                            </div>
                                <button className="button is-dark">Novo Cadastro</button>
                        </div>
                    </div>
                </div>

            </section>


        </div>
    );
};

