import ProjectCard from "@/components/userdashboard/Card";
import HomeLoading from "@/components/userdashboard/HomeLoading";
import { getProjects } from "@/functions/projects/CRUD";
import { Suspense, useEffect, useState } from "react";

export default function Home(){

    const [projets,setProjects] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

      const GetProjects = async () => {
        setProjects(await getProjects({idUser:1}))
        setLoading(false)
      }; GetProjects()

    },[])

    return <>
        <div>
          <h3 className="text-lg font-medium">Accueil</h3>
          <p className="text-sm text-muted-foreground">
            Toutes les projets
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-2 overflow-y-scroll max-h-screen hiddenScroll lg:grid-cols-2 pt-2">
            {loading
            ? <HomeLoading />
            : projets.map((project,indx)=>{
              return  <ProjectCard key={indx} title={project.title} image={project.image_url} description={(project.desctiption).substring(0,60)+' ...'} />
            })}
        </div>
    </>
}