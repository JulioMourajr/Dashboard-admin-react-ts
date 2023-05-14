import React, {useEffect, useState}from "react";

import * as Yup from 'yup';
import { AxiosError } from "axios";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Title from "../../../components/common/Title";
import Textarea from "../../../components/forms/Textarea/Textarea";
import InformacoesCard from "./InformacoesCard/InformacoesCard";
import Button from "../../../components/common/Button/Button";

import { Informacoes, getInformacoes, deleteInformacoes, createOrUpdateInformacoes } from "../../../services/informacoesService";

import styles from './ManipularInformacoes.module.css'

const ManipularInformacoes:React.FC = ()=>{

  const [informacoes, setInformacoes] = useState<Informacoes>();

  const initialValues : Informacoes = {
    foto: '',
    nome: '',
    cargo: '',
    resumo:'',
  }

  const validationSchema = Yup.object().shape({

    foto: Yup.string().required("Campo obrigatório"),
    nome: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    resumo: Yup.string().required("Carpo obrigatório"),

  });

  const fetchInformacao = async ()=>{
    try {
      const informacao = await getInformacoes();
      setInformacoes(informacao)
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status!==404){
          console.log("Erro ao buscar as informacões: ", error)
        }
      }  else{
        console.log("Ocorreu um erro desconhecido ao buscar as informacões: ", error)
      }  
    }
  } 

  useEffect(()=>{
    fetchInformacao()
  }, [])


  const onSubmit = async(values:Informacoes)=>{
    try {
      await createOrUpdateInformacoes(values);
      setInformacoes(values);
      alert('Formulario Enviado!')
    } catch (error) {
      console.error('Erro ao enviar o formulario:', error);
      alert('Ocorreu um erro ao enviar o formulario. Tente novamente.')
    }
  }

  const handleDelete = async()=>{   
    try {
      await deleteInformacoes();
      setInformacoes(undefined);
      alert('Formulario Apagado com sucesso.')
    } catch (error) {
      alert('Ocorreu um erro ao deletar. Tente novamente.')
    }
  }
  
  return(
    <div className={styles.container}>

      <Form
      initialValues={informacoes || initialValues} 
      enableReinitialize={true}
      validationSchema={validationSchema} 
      onSubmit={onSubmit} >
        
        {({errors, touched}) =>(       

        <>

          <Title> Informacoes</Title>

          <Input 
            label="Foto"
            name="foto"
            errors={errors.foto}
            touched={touched.foto}
          />

          <Input 
            label="Nome"
            name="nome"
            errors={errors.nome}
            touched={touched.nome}
          />

          <Input 
            label="Cargo"
            name="cargo"
            errors={errors.cargo}
            touched={touched.cargo}
          />

          <Textarea 
            label="Resumo"
            name="resumo"
            errors={errors.resumo}
            touched={touched.resumo}
          />

          <Button type="submit">Salvar</Button>      

        </>

        )}
      </Form>
        
      {informacoes && 
        <div className={styles.cardContainer}>
          <InformacoesCard informacoes={informacoes} />

          <Button  onClick={handleDelete} red>Deletar</Button>
        </div>  
        
      } 

    </div>
  );
};

export default ManipularInformacoes;