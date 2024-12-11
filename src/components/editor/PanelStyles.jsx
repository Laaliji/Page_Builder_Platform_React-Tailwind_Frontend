import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/tabSlicer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PanelStyles({ editorInstance }) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);

  const [scrollPositions, setScrollPositions] = useState({
    composants: 0,
    styles: 0,
    page: 0,
  });

  const [pageState, setPageState] = useState({
    pageName: "",
    pageTitle: "",
  });

  const [tabContent, setTabContent] = useState({
    composants: null,
    styles: null,
    page: null,
  });

  const handleTabChange = (value) => {
    console.log("Tab changed to:", value);
    dispatch(setActiveTab(value));
    setTabContent((prev) => ({ ...prev, [value]: null }));
  };

  const handleScroll = (tab, event) => {
    setScrollPositions((prev) => ({
      ...prev,
      [tab]: event.target.scrollTop,
    }));
  };

  useEffect(() => {
    console.log("Active tab changed:", activeTab);
    const currentScrollPosition = scrollPositions[activeTab];
    const scrollElement = document.getElementById(`scroll-${activeTab}`);
    if (scrollElement) {
      scrollElement.scrollTop = currentScrollPosition;
    }
  }, [activeTab, scrollPositions]);

  const handlePageInputChange = (e) => {
    const { name, value } = e.target;
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderComposants = useCallback(() => {
    console.log("Rendering Composants tab");
    if (!editorInstance || !editorInstance.BlockManager) {
      console.warn("Editor instance or BlockManager not available");
      return null;
    }
    const blocksContainer = document.createElement("div");
    blocksContainer.id = "blocks";
    blocksContainer.appendChild(editorInstance.BlockManager.render());
    return blocksContainer;
  }, [editorInstance]);

  const renderStyles = useCallback(() => {
    console.log("Rendering Styles tab");
    if (!editorInstance || !editorInstance.StyleManager) {
      console.warn("Editor instance or StyleManager not available");
      return null;
    }
    const stylesContainer = document.createElement("div");
    stylesContainer.id = "styles";
    stylesContainer.appendChild(editorInstance.StyleManager.render());
    return stylesContainer;
  }, [editorInstance]);

  const renderPage = useCallback(() => {
    console.log("Rendering Page tab");
    return (
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pageName">Nom de Page</Label>
          <Input
            type="text"
            id="pageName"
            name="pageName"
            value={pageState.pageName}
            onChange={handlePageInputChange}
            placeholder="Nom"
            className="border-black/15"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pageTitle">Titre de Page</Label>
          <Input
            type="text"
            id="pageTitle"
            name="pageTitle"
            value={pageState.pageTitle}
            onChange={handlePageInputChange}
            placeholder="Titre"
            className="border-black/15"
          />
        </div>
      </div>
    );
  }, [pageState, handlePageInputChange]);

  useEffect(() => {
    if (activeTab === "composants" && !tabContent.composants) {
      setTabContent((prev) => ({ ...prev, composants: renderComposants() }));
    } else if (activeTab === "styles" && !tabContent.styles) {
      setTabContent((prev) => ({ ...prev, styles: renderStyles() }));
    } else if (activeTab === "page" && !tabContent.page) {
      setTabContent((prev) => ({ ...prev, page: renderPage() }));
    }
  }, [activeTab, renderComposants, renderStyles, renderPage, tabContent]);

  return (
    <div className="w-[25%] h-full bg-background pt-2 px-2 min-w-[300px] border-l border-black/15">
      {" "}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="composants">Composants</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
        </TabsList>

        <TabsContent value="composants" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-composants"
            className="h-full w-full rounded-md  p-4"
            onScroll={(e) => handleScroll("composants", e)}
          >
            {tabContent.composants && (
              <div
                ref={(node) => node && node.appendChild(tabContent.composants)}
              />
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="styles" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-styles"
            className="h-full w-full rounded-md  p-4"
            onScroll={(e) => handleScroll("styles", e)}
          >
            {tabContent.styles && (
              <div
                ref={(node) => node && node.appendChild(tabContent.styles)}
              />
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="page" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-page"
            className="h-full w-full rounded-md  p-4"
            onScroll={(e) => handleScroll("page", e)}
          >
            {tabContent.page}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
