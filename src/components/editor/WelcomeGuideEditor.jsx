import { FilePlus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDispatch } from 'react-redux'
import { setIsDiaglogAddPageOpen } from '@/store/valueSlicer'
export default function WelcomeGuide({  }) {
  const dispatch = useDispatch()
  return (
    <div className="h-full w-full px-10 flex items-center justify-center bg-gray-50/50">
      <Card className="w-[450px]  border-black/20">
        <CardContent className="p-6  text-center">
          <h2 className="text-2xl font-semibold mb-4">Bienvenue Sur l'Éditeur</h2>
          <p className="text-muted-foreground mb-6">
            Commencez par créer votre première page. Vous pouvez ajouter des composants, personnaliser les styles et prévisualiser votre site Web en temps réel.
          </p>
          <Button className="gap-2 text-white" onClick={() => dispatch(setIsDiaglogAddPageOpen(true))}>
            <FilePlus className="w-4 h-4" />
            <span>Créer une Nouvelle Page</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
