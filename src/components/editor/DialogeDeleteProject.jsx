import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button as Btn } from "../ui/button";
import {  FolderX, Loader2, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProject } from "@/functions/projects/CRUD";
import { useAlertToast, useErrorToast } from "../toast";
import { useNavigate , replace } from "react-router-dom";
export default function DeleteDialog({ isDeleteDialogOpen,setIsDeleteDialogOpen }){
    const { selectedProjectEditorID } = useSelector((state) => state.values);
    const [titleProject,setTitleProject] = useState("")
    const [loading,setLoading] = useState(false)

    const navigation = useNavigate()

    const errorToast = useErrorToast()
    const alertToast = useAlertToast()

    const DeleteProject = async () => {
        setLoading(true)
        const response = await deleteProject({
            idProject : selectedProjectEditorID,
            body : { title : titleProject }
        })

        if(response == "INVALID_DATA"){
            alertToast('Le nom de projet est n\' est pas correct')
        }else if(response == 'OK'){
            navigation('/dash/user/home?projectd=true',{replace})
        }else{
            errorToast()
        }

        setLoading(false)
    }

    return <>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                       <FolderX size="19"/> <p>Supprimer le projet</p>
                    </DialogTitle>
                    <DialogDescription>
                        Entrez le nom de projet pour le supprimer
                    </DialogDescription>
                </DialogHeader>
                <Input
                    className="focus-visible:border-none focus:border-none"
                    placeholder="Nom du projet"
                    values={titleProject}
                    onChange={(e)=>setTitleProject(e.target.value)}
                />
                <DialogFooter>
                    <Btn variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Annuler
                    </Btn>
                    <Btn onClick={()=>DeleteProject()} className="text-white gap-2 bg-red-600 hover:bg-red-500">
                        {loading
                            ? <><Loader2 className="animate-spin" /> Suppression ...</>
                            : <><Trash/> Supprimer</>
                        }
                    </Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}