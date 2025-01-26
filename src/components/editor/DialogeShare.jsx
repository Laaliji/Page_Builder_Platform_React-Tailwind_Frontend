import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProject } from "@/functions/projects/CRUD";
import { useParams } from "react-router-dom";
import { frontend_url } from "@/constant/global";
import { useSuccessToast } from "../toast";

export default function DialogeShare({isShareDialogOpen,setIsShareDialogOpen}){

    const { id } = useParams()
    const [shareLink, setShareLink] = useState("");
    
    const successToast = useSuccessToast()

    const handleShare = async () => {
        navigator.clipboard.writeText(frontend_url+"share/"+shareLink)
        successToast("Projet partagé")
        setIsShareDialogOpen(false)
    }

    useEffect(() => {
        const getLink = async () => {
            setShareLink((await getProject({id})).data.shared_link)
        }
        if(id) getLink()
    }, [id]);

    return <>
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Partager le lien</DialogTitle>
                    <DialogDescription>
                        Toute personne disposant de ce lien pourra le voir.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Lien
                        </Label>
                        <Input
                            id="link"
                            readOnly
                            value={frontend_url+"share/"+shareLink}
                        />
                    </div>
                    <Button onClick={handleShare} size="sm" className="px-3 text-white">
                        <span className="sr-only">Copier</span>
                        <Copy />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="text-white">
                            Fermer
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}