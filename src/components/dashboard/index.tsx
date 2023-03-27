import { Card } from "primereact/card"



interface DashboardProps {
    clients?: number
    products?: number
    sales?: number
}

export const SalesDashboard: React.FC<DashboardProps> = ({ clients, products, sales }) => {

    const productsStyle = {
        backgroundColor: 'red',
        color: '#fff',
    }
    const clientsStyle = {
        backgroundColor: 'green',
        color: '#fff',
    }
    const salesStyle = {
        backgroundColor: 'blue',
        color: '#fff',
    }

    return (
    
            <div className="p-fluid">
                <div className="p-grid">
                    <div className="p-col">
                        <Card title="Produtos" style={productsStyle}>
                            <p className="p-m-0">{products}</p>
                        </Card>
                    </div>
                    <div className="p-col">
                        <Card title="Clientes" style={clientsStyle}>
                            <p className="p-m-0">{clients}</p>
                        </Card>
                    </div>
                    <div className="p-col">
                        <Card title="Vendas" style={salesStyle}>
                            <p className="p-m-0">{sales}</p>
                        </Card>
                    </div>
                </div>
            </div>
        
    )
}