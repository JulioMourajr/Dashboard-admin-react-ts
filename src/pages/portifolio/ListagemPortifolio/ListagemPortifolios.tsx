import React, { useState } from "react";

import styles from "./ListagemPortifolios.module.css"

interface Portifolio {
  link:string;
  image:string;
  title:string;
}



const ListagemPortifolios:React.FC = ()=>{
  const [portifolio, setPortifolio] = useState<Portifolio[]>([
    {
      link:'https://academy.comeialabs.com.br/',
      image:'https://picsum.photos/300/200?random=1',
      title:'Portifolio 1'
    },
    {
      link:'https://academy.comeialabs.com.br/',
      image:'https://picsum.photos/300/200?random=2',
      title:'Portifolio 2'
    },
    {
      link:'https://academy.comeialabs.com.br/',
      image:'https://picsum.photos/300/200?random=3',
      title:'Portifolio 3'
    }
  ])

  const handleEdit = (index:number) =>{
    // logica para editar
  }
  
  const handleDelete = (index:number)=>{
    setPortifolio(portifolio.filter((_, i)=> i!== index))
  }
  return(
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Imagem</th>
          <th>Link</th>
          {<th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {portifolio.map((itemPortifolio, index) => (
          <tr key={index}>
            <td>{itemPortifolio.title}</td>
            <td><img src={itemPortifolio.image} alt={itemPortifolio.title} className={styles.image}/></td>
            <td><a href={itemPortifolio.link} target="_blank" rel="noreferrer">{itemPortifolio.link}</a></td>
            {<td>
              <button onClick={()=>handleEdit(index)}>Editar</button>
              <button onClick={()=>handleDelete(index)}>Excluir</button>
        </td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListagemPortifolios