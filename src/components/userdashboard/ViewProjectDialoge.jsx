import {
  AppWindow,
  CalendarDays,
  Edit,
  Edit3,
  ExternalLink,
  FolderCog,
  GitBranch,
  Globe,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useRef, useState } from "react";
import { getProject } from "@/functions/projects/CRUD";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "@/constant/global";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { set } from "react-hook-form";
import {
  setSelectedProjectUpdateID,
  setSelectedProjectViewID,
} from "@/store/valueSlicer";

export default function ViewProjectDialoge({
  isViewProjectDialogeOpen,
  setIsViewProjectDialogeOpen,
  setIsEditProjectDialogeOpen
}) {
  const { selectedProjectUpdateID, selectedProjectViewID, refrecher } =
    useSelector((state) => state.values);

  const [image, setImage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domaineName, setDomaineName] = useState("");
  const [repository, setRepository] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const dispatch = useDispatch();

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const GetProject = async () => {
      const project = (await getProject({ id: selectedProjectViewID })).data;
      setTitle(project.title);
      setDescription(project.desctiption);
      setDomaineName(project.domaineName);
      setRepository(project.repository);
      setImageUrl(backend_url + project.image_url);
      setCreatedAt(project.created_at);
    };
    if (selectedProjectViewID) GetProject();
  }, [selectedProjectViewID]);

  return (
    <>
      <Dialog
        open={isViewProjectDialogeOpen}
        onOpenChange={setIsViewProjectDialogeOpen}
      >
        <DialogContent className="sm:max-w-[525px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex gap-2">
              <AppWindow />
              <span className="mt-[2px]">
                Informations de Projet
                <span className="border-b-[1.5px] border-opacity-70 italic opacity-80 ml-2">
                  {title}
                </span>
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className=" w-full overflow-hidden rounded-lg">
              <img
                src={
                  image_url && image_url !== ""
                    ? image_url
                    : "/placeholderImage.png"
                }
                alt={title}
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
            <div className="max-h-[265px] flex flex-col gap-3 hiddenScroll overflow-y-scroll">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Informations de domaine
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p
                      rel="noopener noreferrer"
                      className="flex -mt-1 items-center gap-1 text-blue-600 hover:underline"
                    >
                      {domaineName}
                      <ExternalLink className="h-3 w-3" />
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground " />
                    <span className="-mt-[1px]">
                      Créé le {new Date(createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Détails du projet
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Description:</span>
                    <p className="mt-1 text-muted-foreground">{description}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Dépôt de GitHub : </span>
                    <p className="mt-1 text-muted-foreground">{repository}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Fermer</Button>
              <Button
                className="flex items-center gap-1 text-white"
                onClick={() => {
                  setIsViewProjectDialogeOpen(false); 
                  setTimeout(() => setIsEditProjectDialogeOpen(true), 0); 
                  dispatch(setSelectedProjectUpdateID(selectedProjectViewID));
                }}
              >
                <Edit />
                Modifier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
