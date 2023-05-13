import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {Table, Column} from "../../../components/common/Table"

import {
  getExperiencias, 
  Experiencia,
  deleteExperiencia
} from '../../../services/experienciaService';


const ListagemExperiencias: React.FC = () => {

  const navigate = useNavigate()

  const [experiencias, setExperiencias] = React.useState<Experiencia[]>([   
  ]);

  const fetchExperiencias = async()=>{
    try {
      const experiencias = await getExperiencias();
      setExperiencias(experiencias);

    } catch (error) {
      console.log('Erro ao buscar experiências!', error);     
    }
  }

  useEffect(()=>{
    fetchExperiencias();
  }, [])
    
  const handleEdit = (experiencia: Experiencia) => {
    navigate('/curriculo/experiencia/atualizar', {state:experiencia})
  }

  const handleDelete = async (experiencia: Experiencia) => {
    try {
      await deleteExperiencia(experiencia.id);
      fetchExperiencias();
     alert('Experiencia deletada com sucesso!');
    } catch (error) {
      console.log('Erro ao excluir experiencia',error);
      alert('Erro ao excluir Experiencia!')
    } 
  }

  const columns:Column<Experiencia>[] = [
    {header:"Titulo", acessor:"titulo"},
    {header:"Descrição", acessor:"descricao"},
    {header:"Tipo", acessor:"tipo"},
    {header:"Ano Início", acessor:"anoInicio"},
    {header:"Ano Fim", acessor:"anoFim"},
  ];

  return (
   <Table
      columns={columns}
      data={experiencias}
      handleEdit={handleEdit}
      handleDelete={handleDelete}   
   />
  );
}

export default ListagemExperiencias