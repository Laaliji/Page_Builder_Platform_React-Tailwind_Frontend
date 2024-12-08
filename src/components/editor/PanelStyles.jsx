import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/tabSlicer"; // Import setActiveTab action
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PanelStyles() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);  
  const [scrollPositions, setScrollPositions] = useState({
    composants: 0,
    styles: 0,
    page: 0,
  });

  // Local state for page form
  const [pageState, setPageState] = useState({
    pageName: "",
    pageTitle: "",
  });

  // Handle tab change
  const handleTabChange = (value) => {
    dispatch(setActiveTab(value));  // Dispatch action to update the active tab in the Redux store
  };

  // Save the scroll position when the content of a tab is scrolled
  const handleScroll = (tab, event) => {
    setScrollPositions((prev) => ({
      ...prev,
      [tab]: event.target.scrollTop,
    }));
  };

  // Restore scroll position when switching tabs
  useEffect(() => {
    const currentScrollPosition = scrollPositions[activeTab];
    const scrollElement = document.getElementById(`scroll-${activeTab}`);
    if (scrollElement) {
      scrollElement.scrollTop = currentScrollPosition;
    }
  }, [activeTab, scrollPositions]);

  // Handle page form input changes
  const handlePageInputChange = (e) => {
    const { name, value } = e.target;
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Content rendering (for dynamically added components like GrapesJS)
  const renderComposantsContent = () => {
    // Dynamically add content or blocks for composants
    return (
      <div id="blocks" className="w-full">
        {/* Blocks will be dynamically added by GrapesJS */}
      </div>
    );
  };

  const renderStylesContent = () => {
    // Dynamically add styles-related content
    return (
      <div id="styles-content" className="w-full">
        
      </div>
    );
  };

  return (
    <div className="w-[35%] h-full bg-background pt-2 px-2 min-w-[300px] border-l">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="composants">Composants</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="page">Page</TabsTrigger>
        </TabsList>

        <TabsContent value="composants" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-composants"
            className="h-full w-full rounded-md border p-4"
            onScroll={(e) => handleScroll("composants", e)}
          >
            {renderComposantsContent()}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="styles" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-styles"
            className="h-full w-full rounded-md border p-4"
            onScroll={(e) => handleScroll("styles", e)}
          >
            {renderStylesContent()}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="page" className="mt-4 h-[calc(100vh-120px)]">
          <ScrollArea
            id="scroll-page"
            className="h-full w-full rounded-md border"
            onScroll={(e) => handleScroll("page", e)}
          >
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
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
