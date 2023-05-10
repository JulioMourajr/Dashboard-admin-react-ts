import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import styles from './CadastrarPortifolio.module.css'
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/Textarea";

interface FormValues{
  link: string;
  image: string;
  title: string;  
}

const initialValues: FormValues = {
  link: "",
  image: "",
  title: "",
}

const validationSchema = Yup.object().shape({
  link: Yup.string().required("Campo obrigatório"),
  image: Yup.string().required("Campo obrigatório"),
  title: Yup.string().required("Campo obrigatório")
});

const CadastrarPortifolio:React.FC = ()=>{

  const onSubmit = (values: FormValues, {resetForm}:{resetForm: ()=>void}) => {
    // logica para enviar dados para o servidor
    console.log(values);
    resetForm()
    alert("Formulário enviado com sucesso!");
  }

  return (
    <fieldset className={styles.formWrapper}>
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
      >
        {({errors, touched})=>(
          <Form className={styles.form}>
            <h2 className={styles.title}>Cadastrar Portifolio</h2>
            <Input label="Link" name="link" errors={errors.link} touched={touched.link} />
            <Input label="Imagem" name="image" errors={errors.image} touched={touched.image} />
            <Textarea label="Título" name="title" errors={errors.title} touched={touched.title} />

            <button type="submit" className={styles.button}>Enviar</button>

          </Form>
        )}
      </Formik>

    </fieldset>
  )
}

export default CadastrarPortifolio;