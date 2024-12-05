import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button as Btn } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import {  AlertTriangle, CheckCircle, CheckIcon, FolderX, Loader2, Trash, TriangleAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "@/functions/projects/CRUD";
import { useState } from "react";
import { setRefrecher } from "@/store/valueSlicer";
export default function DeleteDialog({ isDeleteDialogOpen,setIsDeleteDialogOpen }){
    const { selectedProjectDeleteID } = useSelector((state) => state.values);
    const { toast } = useToast()
    const dispatch = useDispatch()
    const { refrecher } = useSelector((state) => state.values);

    const [loadingDelete,setLoadingDelete] = useState(false)
    const DeleteProject = async () => {
        setLoadingDelete(true)
        const STATE = await deleteProject({idProject : selectedProjectDeleteID})
        setLoadingDelete(false)
        if(STATE == "OK"){
            toast({
                
                variant: "custom",
                className: 'bg-[#23861e] border-none text-white text-md py-5 pl-2 font-[Poppins]',
                action: (
                    <div className="w-full flex items-center -p-1">
                      <CheckCircle className="mr-3" />
                      Projet supprimé avec succès
                    </div>
                ),
            });
        }else{
            toast({
                variant: "destructive",
                className: 'text-white text-md py-5 pl-2 font-[Poppins]',
                action: (
                    <div className="w-full flex items-center -p-1">
                      <div>
                        <div className="text-lg flex items-center">
                            <AlertTriangle className="mr-3" size="20"/>
                            Oups ! Une erreur s'est produite.
                        </div>
                        <span className="text-sm opacity-80">Il y a eu un problème lors de la suppression du projet.</span>
                      </div>
                    </div>
                ),
            })
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