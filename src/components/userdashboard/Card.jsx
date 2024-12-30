import { BarChart, Clock, CheckCircle, ExternalLink } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Link } from 'react-router-dom'


export default function ProjectCard({ id,title,description,image }) {
  return (
    <Card className={cn("w-full border border-black/20 shadow-sm")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md"
        />
      </CardContent>
      <CardFooter>
        <Link to={`/project/${id}`} className='w-full gap-2 text-white bg-primary rounded-md p-2 flex items-center justify-center'>
          <ExternalLink size={18}/> <span>Ouvrir</span>
        </Link>
      </CardFooter>
    </Card>
  )
}

