import React from 'react';

import { NavLink } from 'react-router-dom';


import styles from './Sidebar.module.css'
import { useAuth } from '../../../contexts/AuthContexts';

const SideBar:React.FC = ()=>{
  const {logout} = useAuth();
  return(
    <div className={styles.sidebar}>
      <nav className={styles.navigation}> 

      <ul>
        <li>
          <NavLink to="/">
            <h3>Dashboard</h3>
          </NavLink>
        </li>
      </ul>

      <h3>Currículo</h3>
      <ul>
        <li>
          <NavLink to="/curriculo/informacoes">
            Informações
          </NavLink>
        </li>
        <li>
          <NavLink to="/curriculo/experiencia/cadastrar">
            Cadastrar Experiencia
          </NavLink>
        </li>
        <li>
          <NavLink to="/curriculo/experiencia/listar">
            Listar Experiencias
          </NavLink>
        </li>
      </ul>

      <h3>Portifolio</h3>
      <ul>
          <li>
            <NavLink to="/projeto/cadastrar">
              Cadastrar Projeto
            </NavLink>
          </li>
          <li>
            <NavLink to="/portifolio/listar">
              Listar Portifolios
            </NavLink>
          </li>
      </ul>

      <ul>
        <li>
          <NavLink onClick={logout} to="/login">
            <h3>Logout</h3>
          </NavLink>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default SideBar