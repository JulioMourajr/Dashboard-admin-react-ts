import api from './api'

export interface Projeto{
    id?: number;
    link:string;
    image:string;
    title:string;
}

export const createProjeto = async (projeto:Projeto)
:Promise<Projeto> =>{
    const response = await api.post<Projeto>("/portifolio", projeto);
    return response.data;
}

export const getPortifolio = async():Promise<Projeto[]> => {
    const response = await api.get<Projeto[]>("/portifolio");
    return response.data;
}

export const deleteProjeto = async(id:number | any)
:Promise<Projeto> =>{
    const response = await api.delete<Projeto>(`/portifolio/${id}`);
    return response.data;
}

export const updateProjeto = async(projeto:Projeto)
:Promise<Projeto> =>{
    const response = await api.put<Projeto>(`/portifolio/
    ${projeto.id}`, projeto);
    return response.data;
}

export const getProjeto = async(id:number):Promise<Projeto> => {
    const response = await api.get<Projeto>(`/portifolio/${id}`);
    return response.data;
}

export const createOrUpdateProjeto = async(projeto:Projeto):
Promise<Projeto> => {
    if(!projeto.id) {
        return await createProjeto(projeto);
    }else{
        return await updateProjeto(projeto);
    }
}
