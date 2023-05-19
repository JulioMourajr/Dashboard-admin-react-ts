import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { Projeto, deleteProjeto, getPortifolio } from "../../../services/portifolioService";

const ListagemPortifolios:React.FC = ()=>{
  const navigate = useNavigate();
  const [portifolio, setPortifolio] = useState<Projeto[]>([]);

  const fetchPortifolio = async () =>{
    try {
      const portifolio = await getPortifolio();
      setPortifolio(portifolio);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar portifolio!")      
    }
  }

  useEffect(()=>{
    fetchPortifolio();
  }, [portifolio]);
    
  const handleEdit = (itemPortifolio:Projeto) =>{
    navigate("/projeto/atualizar", {state:itemPortifolio})
  }
  
  const handleDelete = async (portifolio:Projeto)=>{
    try{
      await deleteProjeto(portifolio.id);
      fetchPortifolio();
      alert("Portifolio excluido com sucesso!")
    } catch(error) {
      console.log(error);
      alert("Erro ao excluir portifolio!")
    }
  }

  const columns:Column<Projeto>[] = [
    {header: "Titulo", acessor:"title"},
    {header: "Imagem", acessor:"image"},
    {header: "Link", acessor:"link"},
  ];

  return(
   <Table
      columns={columns}
      data={portifolio}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
   />
  )
}

export default ListagemPortifolios