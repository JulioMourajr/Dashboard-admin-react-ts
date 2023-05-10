import React from "react";
import * as Yup from 'yup';
import { Formik, Form} from "formik";

import { useLocation, useNavigate } from "react-router-dom";

import styles from './CadastrarExperiencia.module.css'
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/Textarea";
import Select from "../../../components/forms/Select/Select";

import { Experiencia, createExperiencia, createOrUpdateExperiencia } from "../../../services/experienciaService";


const CadastrarExperiencia:React.FC = ()=>{

  const navigate = useNavigate();

  const location = useLocation();

  const experiencia = location.state as Experiencia;

  const initialValues:Experiencia = {
    id: 0,
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
      console.log(values)
      resetForm();
      navigate('/curriculo/experiencia/lista')
      alert("Formulario enviado com sucesso!")
      
    } catch (error) {
      console.log(error)
      alert("Ocorreu um erro ao enviar o Formulario")
    }    
  };

  return (
    <fieldset className={styles.formWrapper}>
      <Formik
          initialValues={experiencia || initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
      >
        {({errors, touched})=>(
          <Form className={styles.form}>
            <h2 className={styles.title}>Cadastrar Experiencia</h2>
            <Input label="Titulo" name="titulo" errors={errors.titulo} touched={touched.titulo} />
            <Input label="Ano Inicio" name="anoInicio"  errors={errors.anoInicio} touched={touched.anoInicio}/>
            <Input label="Ano Fim" name="anoFim" errors={errors.anoFim} touched={touched.anoFim}/>

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

            <button type="submit" className={styles.button}>Salvar</button> 
          </Form>
        )}
      </Formik>

    </fieldset>
    
  )
}

export default CadastrarExperiencia;