import { FilePlus2, FolderPen, FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button as Btn } from "../ui/button";
export default function DialogeNewPage({ isNewPageDialogOpen,setIsNewPageDialogOpen }){
    return <>
        <Dialog open={isNewPageDialogOpen} onOpenChange={setIsNewPageDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                       <FilePlus2 size="19"/> <p>Nouveau Page</p>
                    </DialogTitle>
                    <DialogDescription>
                        nom de page
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
                    <Btn onClick={()=>null} className="text-white">Ajouter</Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}