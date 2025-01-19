import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button as Btn } from "../ui/button";
import { AlertTriangle, CheckCircle, FolderX, Loader2, Trash, TriangleAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "@/functions/projects/CRUD";
import { useState } from "react";
import { setRefrecher } from "@/store/valueSlicer";
import { useErrorToast, useSuccessToast } from "../toast";
export default function DeleteDialog({ isDeleteDialogOpen,setIsDeleteDialogOpen }){
    const { selectedProjectDeleteID } = useSelector((state) => state.values);
    
    const dispatch = useDispatch()
    const { refrecher } = useSelector((state) => state.values);

    const [loadingDelete,setLoadingDelete] = useState(false)

    const successToast = useSuccessToast();
    const errorToast = useErrorToast();

    const DeleteProject = async () => {
        setLoadingDelete(true)
        const STATE = await deleteProject({idProject : selectedProjectDeleteID})
        setLoadingDelete(false)
        if(STATE == "OK"){
            successToast("Projet supprimé avec succès")
        }else{
            errorToast("Il y a eu un problème lors de la modification du projet.")
        }
        setIsDeleteDialogOpen(false)
        dispatch(setRefrecher(!refrecher))
    }

    return <>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                       <FolderX size="19"/> <p>Supprimer le projet</p>
                    </DialogTitle>
                    <DialogDescription className="flex text-md flex-col justify-center items-center gap-2 my-9">
                        <TriangleAlert size="50"/>
                        Etes-vous sûr d'avoir supprimé le projet ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-center items-center">
                    <Btn variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Annuler
                    </Btn>
                    <Btn onClick={()=>DeleteProject()} className="text-white gap-2 bg-red-600 hover:bg-red-500">
                        {loadingDelete 
                            ? <><Loader2 className="animate-spin" /> Suppression ...</>
                            : <><Trash/> Supprimer</>
                        }
                        
                    </Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}