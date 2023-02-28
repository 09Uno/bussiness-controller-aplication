import { Layout } from "./components";


//aqui é renderizado o principal componente da aplicação, ou seja, o layout
const Home: React.FC = () => {
  return (
    <div className="home">
      <Layout />
    </div>
  );
};

export default Home;