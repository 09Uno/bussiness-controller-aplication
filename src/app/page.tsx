'use client'

import Head from "next/head";
import { Layout } from "@/components/index";
import { SalesDashboard } from "@/components/index";
import { useSaleDashboardService } from "./services/dashboard.service";
import { SalesDashboardData } from "@/models/dashboard";
import { useEffect, useState } from "react";

//aqui é renderizado o principal componente da aplicação, ou seja, o layout
const Home: React.FC = () => {


  const service = useSaleDashboardService()
  const [props, setProps] = useState<SalesDashboardData>({
    clients: 0,
    products: 0,
    sales: 0,
  })

  const getProps = () => {
    service.get().then(props => {
      setProps(props)
      console.log(props)
    })
  }

  useEffect(() => {
      getProps()
    

  }, [])



  return (
    <div className="home">

      <Head>
        <title>Business Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SalesDashboard clients={props.clients} products={props.products} sales={props.sales} />
      </Layout>
    </div>
  );
};

export default Home;