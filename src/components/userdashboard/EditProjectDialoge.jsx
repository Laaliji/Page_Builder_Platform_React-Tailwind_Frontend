import { CheckCircle, FolderCog, Loader2, Save, Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { getProject, updateProject } from "@/functions/projects/CRUD";
import { setRefrecher } from "@/store/valueSlicer";
import { useDispatch, useSelector } from "react-redux";
import { dataURItoFile } from "@/functions/global";
import { backend_url } from "@/constant/global";
import {  useErrorToast, useSuccessToast } from "../toast";

export default function EditProjectDialoge({
  isEditProjectDialogeOpen,
  setIsEditProjectDialogeOpen,
}) {
  const { selectedProjectUpdateID, refrecher } = useSelector(
    (state) => state.values
  );

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  // States
  const [image, setImage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domaineName, setDomaineName] = useState("");
  const [repository, setRepository] = useState("");
  
  const dispatch = useDispatch();

  // Errors Messages
  const [imageError, setImageError] = useState("");
  const [image_urlError, setImageUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [domaineNameError, setDomaineNameError] = useState("");
  const [repositoryError, setRepositoryError] = useState("");

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const GetProject = async () => {
      const project = (await getProject({ id: selectedProjectUpdateID })).data;
      setTitle(project.title);
      setDescription(project.desctiption);
      setDomaineName(project.domaineName);
      setRepository(project.repository);
      setImageUrl(backend_url + project.image_url);
    };
    if (selectedProjectUpdateID) GetProject();
  }, [selectedProjectUpdateID]);

  const ImageInputRef = useRef(null);
  const handleClick = () => {
    ImageInputRef.current.click();
  };

  const HandleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UpdateProject = async () => {
    setLoadingUpdate(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("domaineName", domaineName);
    formData.append("repository", repository);

    if (image) {
      const imageFile = dataURItoFile(image, "project_image.jpg");
      formData.append("image", imageFile);
    }

    const response = await updateProject({
      id: selectedProjectUpdateID,
      body: formData,
      isFormData: true,
    });
    setLoadingUpdate(false);

    if (response.STATE == "OK") {
      successToast("Projet modifier avec succès");
      setIsEditProjectDialogeOpen(false);
      dispatch(setRefrecher(!refrecher));
    } else if (response.STATE == "INVALID_DATA") {
      const errors = response.ERRORS;
      if (errors.title) setTitleError(errors.title[0]);
      if (errors.description) setDescriptionError(errors.description[0]);
      if (errors.domaineName) setDomaineNameError(errors.domaineName[0]);
      if (errors.repository) setRepositoryError(errors.repository[0]);
      if (errors.image) setImageError(errors.image[0]);
    } else {
      errorToast("Il y a eu un problème lors de la modification du projet.");
      setIsEditProjectDialogeOpen(false);
    }
  };

  return (
    <>
      <input
        hidden
        ref={ImageInputRef}
        type="file"
        onChange={HandleChangeImage}
      />
      <Dialog
        open={isEditProjectDialogeOpen}
        onOpenChange={setIsEditProjectDialogeOpen}
      >
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
          <div className="items-start space-y-3 pb-3 gap-y-1 px-1 max-h-[350px] hiddenScroll overflow-y-scroll">
            <div className="gap-2">
              <Label htmlFor="name" className="">
                Image de projet
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg col-span-1 min-w-full min-h-24">
                  <img
                    src={
                      image_url && image_url !== ""
                        ? image_url
                        : "/placeholderImage.png"
                    }
                    className="mt-2 rounded-lg border-2 min-h-24 border-slate-500 bg-cover"
                  />
                </div>
                <div
                  onClick={handleClick}
                  className="mt-2 min-h-24 col-span-2 border-2 flex cursor-pointer rounded-lg justify-center items-center border-slate-400 border-dashed"
                >
                  <Upload className="text-slate-500" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="">
                Nom de Projet
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-4"
              />
              {titleError.length > 0 && <span className="text-red-500 col-span-4 -mt-2">{titleError}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="min-w-fit whitespace-nowrap">
                Nom de Domaine
              </Label>
              <Input
                value={domaineName}
                onChange={(e) => setDomaineName(e.target.value)}
                className="col-span-4"
              />
              {domaineNameError.length > 0 && <span className="text-red-500 col-span-4 -mt-2">{domaineNameError}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="">
                Desctiption
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-4"
              />
              {descriptionError.length > 0 && <span className="text-red-500 col-span-4 -mt-2">{descriptionError}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="">
                Repository
              </Label>
              <Input
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                className="col-span-4"
              />
              {repositoryError.length > 0 && <span className="text-red-500 col-span-4 -mt-2">{repositoryError}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={UpdateProject}
              type="submit"
              className="text-white flex"
            >
              {loadingUpdate ? (
                <>
                  <Loader2 className="animate-spin" /> Enregistrer...
                </>
              ) : (
                <>
                  <Save />
                  <span>Enregistrer</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
