import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button as Btn } from "../ui/button";
import { FolderPen, Pencil } from "lucide-react";
export default function RenameDialog({ isRenameDialogOpen,setIsRenameDialogOpen }){
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
                />
                <DialogFooter>
                    <Btn variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
                        Annuler
                    </Btn>
                    <Btn onClick={()=>null} className="text-white">Renommer</Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}