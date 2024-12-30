import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button as Btn } from "../ui/button";
import { FolderPen, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { updateProject } from "@/functions/projects/CRUD";
import { useSelector } from "react-redux";
import { useErrorToast, useSuccessToast } from "../toast";
export default function RenameDialog({ isRenameDialogOpen,setIsRenameDialogOpen,setUpdateTitleProject }){
    const success1Toast = useSuccessToast()
    const error1Toast = useErrorToast()
    const { selectedProjectEditorID , selectedProjectName } = useSelector((state) => state.values);
    const [nameProject,setNameProject] = useState(selectedProjectName)
    const [loading,setLoading] = useState(false)

    const UpdateProject = async () => {
        setLoading(true)
        const response = await updateProject({
            id : selectedProjectEditorID,
            body : { title : nameProject }
        })
        console.log('eres',response)
        if (response.STATE == "OK"){
            setUpdateTitleProject(nameProject)
            success1Toast("le titre de projet a étè modifier avec succés")
        }else{
            error1Toast('Il y a eu un problème lors de la modification du projet.')
        }
        setLoading(false)
        setIsRenameDialogOpen(false)
    }
    return <>
        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                       <FolderPen size="19"/> <p>Renommer le projet</p>
                    </DialogTitle>
                    <DialogDescription>
                        Entrez un nouveau nom pour votre projet.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    className="focus-visible:border-none focus:border-none"
                    placeholder="Nouveau nom du projet"
                    value={nameProject}
                    onChange={(e)=>setNameProject(e.target.value)}
                />
                <DialogFooter>
                    <Btn variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
                        Annuler
                    </Btn>
                    <Btn onClick={()=>UpdateProject()} className="text-white">
                        {loading
                            ? <> <Loader2 className="animate-spin"/> <span>Enregistrer ... </span> </>
                            : 'Renommer'
                        }
                        
                    </Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}