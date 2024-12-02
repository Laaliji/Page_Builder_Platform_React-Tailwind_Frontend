import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button as Btn } from "../ui/button";
import {  FolderX, Trash } from "lucide-react";
export default function DeleteDialog({ isDeleteDialogOpen,setIsDeleteDialogOpen }){
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
                />
                <DialogFooter>
                    <Btn variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Annuler
                    </Btn>
                    <Btn onClick={()=>null} className="text-white gap-2 bg-red-600 hover:bg-red-500"><Trash/> Supprimer</Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}