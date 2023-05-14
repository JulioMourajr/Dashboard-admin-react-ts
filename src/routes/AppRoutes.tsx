import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '../pages/home/Home'
import ListagemPortifolios from '../pages/portifolio/ListagemPortifolio/ListagemPortifolios'
import ListagemExperiencias from '../pages/curriculo/ListagemExperiencia/ListagemExperiencia'
import ManipularProjeto from '../pages/portifolio/ManipularProjeto/ManipularProjeto'
import ManipularInformacoes from '../pages/curriculo/ManipularInformacoes/ManipularInformacoes'
import ManipularExperiencia from '../pages/curriculo/ManipularExperiencia/ManipularExperiencia'

import Layout from '../components/layout'

import { useAuth } from '../contexts/AuthContexts'

const AppRoutes:React.FC = () => {

  const {authenticated, isLoading} = useAuth();

  if(isLoading){
    return <p>Carregando...</p>
  }

  if(!authenticated){
    return <Navigate to='/login'/>
  }
  return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/curriculo/informacoes' element={<ManipularInformacoes/>}/> 
            <Route path='/curriculo/experiencia/cadastrar' element={<ManipularExperiencia/>}/>    
            <Route path='/curriculo/experiencia/atualizar' element={<ManipularExperiencia/>}/> 
            <Route path='/curriculo/experiencia/listar' element={<ListagemExperiencias/>}/>
            <Route path='/projeto/cadastrar' element={<ManipularProjeto/>}/>
            <Route path='/projeto/atualizar' element={<ManipularProjeto/>}/>
            <Route path='/portifolio/listar' element={<ListagemPortifolios/>}/> 
          </Routes>                   
      </Layout> 
  )
}

export default AppRoutes;
