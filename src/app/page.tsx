


import { Layout } from "@/components/index";
import { SalesDashboard } from "@/components/index";

//aqui é renderizado o principal componente da aplicação, ou seja, o layout
const Home: React.FC = () => {



  return (
    <div className="home">
      <Layout>
          <SalesDashboard clients={100} products={100} sales={121} />
      </Layout>
    </div>
  );
};

export default Home;