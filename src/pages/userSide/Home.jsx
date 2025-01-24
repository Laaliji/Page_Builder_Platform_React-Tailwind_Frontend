import { useSuccessToast } from "@/components/toast";
import ProjectCard from "@/components/userdashboard/Card";
import HomeLoading from "@/components/userdashboard/HomeLoading";
import { backend_url } from "@/constant/global";
import { getProjects } from "@/functions/projects/CRUD";
import translations from "@/locale/translations";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Home(){

    const { selectedLang } = useSelector(
      (state) => state.values
    );

    const successToast = useSuccessToast()

    const location = useLocation();

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const projectd = queryParams.get("projectd");

      if (projectd === "true") {
        successToast(translations[lang].project_deleted_successfully)
      }
    }, []);

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
      <h3 className="text-lg font-medium">{translations[selectedLang].home}</h3>
      <p className="text-sm text-muted-foreground">
        {translations[selectedLang].all_projects}
      </p>
    </div>
    <div className="grid grid-cols-1 gap-3 mt-2 overflow-y-scroll max-h-screen hiddenScroll lg:grid-cols-2 pt-2">
      {loading ? (
        <HomeLoading />
      ) : (
        projets.map((project, indx) => (
          <ProjectCard
            key={indx}
            id={project.idP}
            title={project.title}
            image={backend_url + project.image_url}
            description={project.desctiption.substring(0, 40) + " ..."}
          />
        ))
      )}
    </div>
  </>
}