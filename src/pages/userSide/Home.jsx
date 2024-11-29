import ProjectCard from "@/components/userdashboard/Card";

export default function Home(){
    return <>
        <div>
          <h3 className="text-lg font-medium">Accueil</h3>
          <p className="text-sm text-muted-foreground">
            Toutes les projets
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-2 overflow-y-scroll max-h-screen hiddenScroll lg:grid-cols-2 pt-2">
            <ProjectCard title="My WebSite" image="https://picsum.photos/300/200" description="Développement d'une application mobile pour iOS et Android"/>
            <ProjectCard title="My WebSite" image="https://picsum.photos/300/200" description="Développement d'une application mobile pour iOS et Android"/>
            <ProjectCard title="My WebSite" image="https://picsum.photos/300/200" description="Développement d'une application mobile pour iOS et Android"/>
            <ProjectCard title="My WebSite" image="https://picsum.photos/300/200" description="Développement d'une application mobile pour iOS et Android"/>
            <ProjectCard title="My WebSite" image="https://picsum.photos/300/200" description="Développement d'une application mobile pour iOS et Android"/>
        </div>
    </>
}