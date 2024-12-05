import { FolderCog, FolderPlus, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EditProjectDialoge({ isEditProjectDialogeOpen , setIsEditProjectDialogeOpen }){
    return <>
        <Dialog open={isEditProjectDialogeOpen} onOpenChange={setIsEditProjectDialogeOpen}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        <FolderCog />
                        <span className="mt-[2px]">Modifier le Projet </span>
                    </DialogTitle>
                    <DialogDescription>
                        Saisissez les nouvelles données du projet pour le modifier
                    </DialogDescription>
                </DialogHeader>
                    <div className="items-start space-y-3 gap-y-1 px-1 max-h-[350px] hiddenScroll overflow-y-scroll">
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="">Nom de Projet</Label>
                            <Input value={'Test'} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="col-span-1">Nom de Domaine</Label>
                            <Input value={'Test'} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="">Titre </Label>
                            <Input value={'Test'} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="">Titre </Label>
                            <Input value={'Test'} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="name" className="">Titre </Label>
                            <Input value={'Test'} className="col-span-4" />
                        </div>
                    </div>
                <DialogFooter>
                    <Button type="submit" className="text-white flex">
                        <Save />
                        <span>Save changes</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}