import React, { useEffect } from "react";

import styles from './ListagemExperiencias.module.css'
import {getExperiencias, Experiencia, deleteExperiencia} from '../../../services/experienciaService'
import { useNavigate } from "react-router-dom";

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
    navigate('/curriculo/experiencia/cadastro', {state:experiencia})
  }

  const handleDelete = async (index: number) => {
    try {
      await deleteExperiencia(index);
      fetchExperiencias();
     alert('Experiencia deletada com sucesso!');
    } catch (error) {
      console.log('Erro ao excluir experiencia',error);
      alert('Erro ao excluir Experiencia!')
    } 
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Ano de Inicio</th>
          <th>Ano de Fim</th>
          {<th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {experiencias.map((experiencia, index) => (
          <tr key={index}>
            <td>{experiencia.titulo}</td>
            <td>{experiencia.descricao}</td>
            <td>{experiencia.tipo}</td>
            <td>{experiencia.anoInicio}</td>
            <td>{experiencia.anoFim}</td>
            <td>
              <button onClick={()=>handleEdit(experiencia)}>Editar</button>
              <button onClick={()=>handleDelete(experiencia.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListagemExperiencias