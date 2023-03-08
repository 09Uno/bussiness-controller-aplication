import { FeedBackMessage, Alert } from "./../common/message";
import { Menu } from "./menu";

interface ILayoutProps {
    title?: string;
    children?: React.ReactNode;
    message?: Array<Alert>;
}

export const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
    return (
        <div className="app">
            <section className="mainContainer columns fullHeight">
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
                                {props.message && props.message.map((msg, index)  =>  <FeedBackMessage 
                                key={index}
                                {...msg} />)
                                

                                }   
                            
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
