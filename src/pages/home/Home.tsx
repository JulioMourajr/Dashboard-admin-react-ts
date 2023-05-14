import React, { useEffect, useState } from "react";

import styles from "./Home.module.css"

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

//import {FaGraduationCap, FaBriefcase, FaFolder} from 'react-icons/fa';

import { Projeto, getPortifolio } from "../../services/portifolioService";
import { Experiencia, getExperienciaByTipo } from "../../services/experienciaService";

const Home = ()=>{

  const [experienciasAcademicas, setExperienciasAcademicas] = 
  useState<Experiencia[]>([]);
  const [experienciasProfissionais, setExperienciasProfissionais] = 
  useState<Experiencia[]>([]);
  const [portifolio, setPortifolio] = 
  useState<Projeto[]>([]);

  const fetchExperienciasAcademicas = async()=>{
    try{
      const response = await getExperienciaByTipo('academico')
      setExperienciasAcademicas(response)
    }catch(error){
      console.log(error)
    }
  }

  const fetchExperienciasProfissionais = async () =>{
    try {
      const response = await getExperienciaByTipo('profissional');
      setExperienciasProfissionais(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPortifolio = async () =>{
    try {
      const response = await getPortifolio();
      setPortifolio(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchExperienciasAcademicas();
    fetchExperienciasProfissionais();
    fetchPortifolio();
  }, [])

  return(
    <main className={styles.container}>
      <Title className={styles.title}>
        Bem vindo ao nosso site!
        </Title>
      <p>Esta é a pagina inicial. Fique a vontade para navegar entre as páginas que está na lateral esquerda. Obrigado!</p>
      <div className={styles.InfoBoxContainer}>
        <InfoBox
          title="Experiencias Academicas"
          value={experienciasAcademicas.length}
          //icon={<FaGraduationCap size={65}/>}
          />
          <InfoBox
          title="Experiencias Profissionais"
          value={experienciasProfissionais.length}
          //icon={<FaBriefcase/>}
          />
          <InfoBox
          title="Projetos no Portifólio"
          value={portifolio.length}
          //icon={<FaFolder />}
          />
      </div>
    </main>
  )
}

export default Home;