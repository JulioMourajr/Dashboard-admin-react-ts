import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button/Button";
import Textarea from "../../../components/forms/Textarea/Textarea";
import Title from "../../../components/common/Title/Title";


import { Experiencia, createOrUpdateExperiencia } from "../../../services/experienciaService";


const ManipularExperiencia:React.FC = ()=>{
  const navigate = useNavigate();
  const experiencia = useLocation().state as Experiencia;

  const initialValues:Experiencia = {
    titulo:"",
    descricao:"",
    tipo:"",
    anoInicio:"",
    anoFim:"",
  }

  const validationSchema = Yup.object().shape({

    titulo: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string(),
    tipo: Yup.string().required("Campo obrigatório"),
    anoInicio: Yup.number().required("Campo obrigatório").typeError('Um numero é obrigatorio'),
    anoFim:  Yup.number().required("Campo obrigatório").typeError('Um numero é obrigatorio'),
  });

  const onSubmit = async (values:Experiencia,{resetForm}:{resetForm:()=> void })=>{
    try {
      await createOrUpdateExperiencia(values)
      resetForm();
      navigate('/curriculo/experiencia/listar')
      alert("Formulario enviado com sucesso!")     
    } catch (error) {
      console.log(error)
      alert("Ocorreu um erro ao enviar o Formulario")
    }    
  };

  return (
      <Form
          initialValues={experiencia || initialValues}
          validationSchema={validationSchema} 
          onSubmit={onSubmit}
      >
        {({errors, touched})=> (

          <>
          {
            !experiencia ? 
            <Title>Cadastrar Experiência</Title>
            :
            <Title>Atualizar Experiência</Title>
          }
          
          <Input 
            label="Titulo" 
            name="titulo"
            errors={errors.titulo} 
            touched={touched.titulo}
            />

          <Input 
            label="Ano Inicio"
            name="anoInicio"  
            type="number"
            errors={errors.anoInicio} 
            touched={touched.anoInicio}
          />
             
          <Input 
            label="Ano Fim" 
            name="anoFim" 
            type="number"
            errors={errors.anoFim}
            touched={touched.anoFim}
          />

            <Select
              label="Tipo de experiência"
              name="tipo"
              options={[
                {value:"profissional", 
                label: "Profissional"},
                {value:"academico", 
                label: "Acadêmico"},
              ]}
              errors={errors.tipo}
              touched={touched.tipo}
            />          

            <Textarea 
            label="Descrição" 
            name="descricao" 
            errors={errors.tipo} 
            touched={touched.tipo}/>

            <Button type="submit">Salvar</Button>
          </>
        )}
      </Form>    
  )
}

export default ManipularExperiencia;