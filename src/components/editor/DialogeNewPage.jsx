import React, { useState } from "react";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFirstPage, setIsDiaglogAddPageOpen, setNoPages, setRefrecher, setSelectedPageId } from "@/store/valueSlicer";
import { createPage } from "@/functions/editor/CRUD";

const DialogeNewPage = ({
  isNewPageDialogOpen,
  setIsNewPageDialogOpen,
  onNewPage,
  existingPages,
  idProject,
  pages
}) => {
  const dispatch = useDispatch();

  const { refrecher , firstPage } = useSelector((state) => state.values);

  const [loading, setLoading] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedTitle = newPageTitle.trim();
    if (!trimmedTitle) {
      setError("Page title cannot be empty");
      return;
    }

    const isDuplicate = existingPages.some(
      (page) => page.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      setError("A page with this title already exists");
      return;
    }

    const newPage = {
    id: nanoid(),
    title: trimmedTitle,
    content: {
      components: '',
      styles: ''
    }
  };

  try {
    await createPage({
      id: newPage.id,
      idProject: idProject,
      title: newPage.title,
    });
    
    onNewPage(newPage);
    dispatch(setSelectedPageId(newPage.id)); // Set the new page as selected
    dispatch(setIsDiaglogAddPageOpen(false));
    dispatch(setNoPages(false));
    setNewPageTitle('');
    setError(null);

    if(pages.length == 0 && firstPage){
      setFirstPage(false);
      window.location.reload()
    }
    
  } catch (error) {
    setError('Error creating page');
  } finally {
    setLoading(false);
  }
  };

  return (
    <Dialog
      open={isNewPageDialogOpen}
      onOpenChange={() => dispatch(setIsDiaglogAddPageOpen(false))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer Une Nouveau Page</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 pt-2">
            <div className="flex flex-col gap-4">
              <Label htmlFor="pageTitle">Titre de Page</Label>
              <Input
                id="pageTitle"
                value={newPageTitle}
                onChange={(e) => {
                  setNewPageTitle(e.target.value);
                  setError(null); 
                }}
                className="col-span-3"
                placeholder="Enter page title"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </div>
          <DialogFooter>
            <Button
              className="mt-3 text-white"
              type="submit"
              disabled={!newPageTitle.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Ajouter ...
                </>
              ) : (
                <>
                  <Save />
                  <span>Enregistrer</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogeNewPage;
