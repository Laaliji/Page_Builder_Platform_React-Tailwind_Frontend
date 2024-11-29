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


export default function ProjectCard({ title,description,image }) {
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
        <Button className="w-full text-white">
            <ExternalLink /> <span>Ouvrir</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

