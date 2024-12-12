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

const DialogeNewPage = ({
  isNewPageDialogOpen,
  setIsNewPageDialogOpen,
  onNewPage,
  existingPages,
}) => {
  const [newPageTitle, setNewPageTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate page title
    const trimmedTitle = newPageTitle.trim();
    if (!trimmedTitle) {
      setError("Page title cannot be empty");
      return;
    }

    // Check for duplicate page titles
    const isDuplicate = existingPages.some(
      (page) => page.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      setError("A page with this title already exists");
      return;
    }

    // Create new page with unique ID
    const newPage = {
      id: nanoid(), // Generate a unique ID
      title: trimmedTitle,
      content: {}, // Initialize with empty content
    };

    // Reset state and close dialog
    onNewPage(newPage);
    setNewPageTitle("");
    setError(null);
    setIsNewPageDialogOpen(false);
  };

  return (
    <Dialog open={isNewPageDialogOpen} onOpenChange={setIsNewPageDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pageTitle" className="text-right">
                Page Title
              </Label>
              <Input
                id="pageTitle"
                value={newPageTitle}
                onChange={(e) => {
                  setNewPageTitle(e.target.value);
                  setError(null); // Clear error on typing
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
            <Button type="submit" disabled={!newPageTitle.trim()}>
              Create Page
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogeNewPage;
