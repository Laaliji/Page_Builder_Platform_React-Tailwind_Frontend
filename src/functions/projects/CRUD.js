import { api_url } from "@/constant/global";

export async function getProjects({ idUser }){
    const response = await fetch(`${api_url}/users/${idUser}/projects`,{
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    })
    return (await response.json()).data
}