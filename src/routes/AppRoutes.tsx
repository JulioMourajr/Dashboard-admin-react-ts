import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout'

import Home from '../pages/home'
import CadastrarPortifolio from '../pages/portifolio/CadastrarPortifolio'
import ListagemPortifolios from '../pages/portifolio/ListagemPortifolio'
import CadastrarInformacoes from '../pages/curriculo/ManipularInformacoes'
import CadastrarExperiencia from '../pages/curriculo/ManipularExperiencia'
import ListagemExperiencia from '../pages/curriculo/ListagemExperiencia'
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
            <Route path='/curriculo/informacoes/cadastro' element={<CadastrarInformacoes/>}/> 
            <Route path='/curriculo/experiencia/cadastro' element={<CadastrarExperiencia/>}/>    
            <Route path='/curriculo/experiencia/lista' element={<ListagemExperiencia/>}/> 
            <Route path='/portifolio/cadastro' element={<CadastrarPortifolio/>}/>  
            <Route path='/portifolio/listagem' element={<ListagemPortifolios/>}/> 
          </Routes>                   
      </Layout> 
  )
}

export default AppRoutes;
