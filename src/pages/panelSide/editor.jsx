import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import grapesjs from "grapesjs";
import plugin from "grapesjs-blocks-basic";
import "grapesjs/dist/css/grapes.min.css";
import Toolbar from "../../components/editor/Toolbar";
import PanelStyles from "../../components/editor/PanelStyles";
import LeftPanel from "../../components/editor/LeftPanel";
import store from "@/store/store";

import {
  BlockManager,
  DeviceManager,
  LayerManager,
  Panels,
  StorageManager,
  StyleManager,
} from "@/lib/editorConfig";
import {
  LayoutGrid,
  Type,
  Image,
  SquareDashedMousePointer,
  Columns,
  CreditCard,
  List,
  FormInput,
  Video,
  AudioLines,
  Map,
  ChevronDown,
  GalleryHorizontal,
  FlagTriangleRight,
  Sliders,
  AlertCircle,
  Quote,
  AlignJustify,
  DollarSign,
  MessageSquareQuote,
  HelpCircle,
  Timer,
  Mail,
  UserPlus,
  Newspaper,
  Link,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getProject } from "@/functions/projects/CRUD";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  setFirstPage,
  setSaveLoading,
  setSelectedPageId,
  setSelectedProjectEditorID,
  setSelectedProjectName,
} from "@/store/valueSlicer";
import { backend_url } from "@/constant/global";
import { getPages, hasPages, insertContent } from "@/functions/editor/CRUD";
import WelcomeGuide from "@/components/editor/WelcomeGuideEditor";
import {
  CanvasSkeleton,
  RightPanelSkeleton,
} from "@/components/editor/EditorSkeleton";
import ToolbarLoading from "@/components/userdashboard/ToolBarLoading";
const blockIcons = {
  section: LayoutGrid,
  text: Type,
  image: Image,
  button: SquareDashedMousePointer,
  grid: Columns,
  "two-cols": Columns,
  card: CreditCard,
  list: List,
  form: FormInput,
  video: Video,
  audio: AudioLines,
  map: Map,
  accordion: ChevronDown,
  carousel: GalleryHorizontal,
  tabs: AlignJustify,
  "progress-bar": Sliders,
  alert: AlertCircle,
  quote: Quote,
  timeline: FlagTriangleRight,
  "pricing-table": DollarSign,
  testimonial: MessageSquareQuote,
  faq: HelpCircle,
  countdown: Timer,
  "contact-form": Mail,
  "login-form": FormInput,
  "register-form": UserPlus,
  "image-slider": Image,
  newsletter: Newspaper,
  link: Link,
};

const Editor = () => {
  const { id } = useParams();

  const [projectID, setProjectID] = useState(null);

  const dispatch = useDispatch();
  const { selectedProjectEditorID , selectedPageId , noPages, refrecher } = useSelector(
    (state) => state.values
  );

  // States
  const [image, setImage] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domaineName, setDomaineName] = useState("");
  const [repository, setRepository] = useState("");

  const [refetchInstance, setRefetchInstance] = useState(false);
  const [refrecherLoad, setRefrecherLoad] = useState(false);
  const [projectHasPages, setProjectHasPages] = useState(false);
  const [isEditorInitialized, setIsEditorInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [activePanel, setActivePanel] = useState("block");
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  const saveCurrentPageContent = useCallback(async () => {
    if (!editorInstance) return;

    const pageContent = {
      components: editorInstance.getHtml(),
      styles: editorInstance.getCss(),
    };
    dispatch(setSaveLoading(true))
    const res = await insertContent({
      idPage: selectedPageId,//currentPage,
      htlmContent: pageContent.components,
      cssContent: pageContent.styles,
    });

    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === selectedPageId ? { ...page, content: pageContent } : page //currentPage
      )
    );
    dispatch(setSaveLoading(false))
  }, [editorInstance]);

  const loadPageContent = useCallback(
    (pageId) => {
      if (editorInstance) {
        const pageToLoad = pages.find((page) => page.id === pageId);

        if (pageToLoad && pageToLoad.content) {
          // Clear existing content first
          editorInstance.setComponents("");
          editorInstance.setStyle("");

          // Restore page-specific content
          if (pageToLoad.content.components) {
            editorInstance.setComponents(pageToLoad.content.components);
          }
          if (pageToLoad.content.styles) {
            editorInstance.setStyle(pageToLoad.content.styles);
          }
        }
      }
    },
    [editorInstance,refrecherLoad, pages]//editorInstance, pages, 
  );

  // Page change handler
  const handlePageChange = useCallback(
    (pageId) => {
      // Update current page and load its content
      ///setCurrentPage(pageId);
      setSelectedPageId(pageId)
      loadPageContent(pageId);
    },
    [] //saveCurrentPageContent, loadPageContent
  );

  // New page creation handler
  const handleNewPage = useCallback(
    (newPage) => {
      // Prevent duplicate pages
      if (pages.some((page) => page.id === newPage.id)) return;

      setPages((prevPages) => [
        ...prevPages,
        {
          ...newPage,
          content: {
            components: "",
            styles: "",
          },
        },
      ]);

      // Automatically switch to the new page
      handlePageChange(newPage.id);
    },
    []//[pages, handlePageChange]
  );

  const initializeEditor = useCallback(async () => {
    if (!projectHasPages || editorRef.current) return null;

    const container = document.getElementById("gjs");
    if (!container) return;

    try {
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100%",
        width: "95%",
        storageManager: false,
        panels: Panels,
        deviceManager: DeviceManager,
        blockManager: {
          ...BlockManager,
          blocks: BlockManager.blocks.map((block) => {
            const IconComponent = blockIcons[block.id] || blockIcons.link;
            return {
              ...block,
              label: ReactDOMServer.renderToString(
                <div className="block-icon-wrapper">
                  {React.createElement(IconComponent, {
                    className: "block-icon",
                    size: 30,
                    strokeWidth: 1.5,
                  })}
                  <span className="block-label">{block.label}</span>
                </div>
              ),
            };
          }),
        },
        styleManager: StyleManager,
        layerManager: LayerManager,
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {
            blocks: ["column1", "column2", "column3", "column3-7"],
            flexGrid: true,
            addBasicStyle: true,
            category: "Mise en page",
            labelColumn1: "1 Column",
            labelColumn2: "2 Columns",
            labelColumn3: "3 Columns",
            labelColumn37: "2 Columns 3/7",
          },
        },
        canvas: {
          styles: [
            "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
          ],
        },
      });

      return new Promise((resolve) => {
        editor.on("load", () => {
          editorRef.current = editor;
          setEditorInstance(editor);
          setIsEditorInitialized(true);
          resolve(editor);
        });
      });
    } catch (error) {
      console.error("Error initializing editor:", error);
      setIsEditorInitialized(false);
      return null;
    }
  }, [projectHasPages]);

  useEffect(() => {
    if (!isLoading && projectHasPages && !editorRef.current) {
      initializeEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
        setEditorInstance(null);
        setIsEditorInitialized(false);
      }
    };
  }, [isLoading, projectHasPages, initializeEditor]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor?.Panels) return;

    const blockPanel = editor.Panels.getPanel("blocks");
    const stylePanel = editor.Panels.getPanel("styles");

    if (blockPanel) {
      blockPanel.set("visible", activePanel === "block");
    }
    if (stylePanel) {
      stylePanel.set("visible", activePanel === "style");
    }
  }, [activePanel]);

  // Effet séparé pour la gestion du contenu des pages
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !selectedPageId) return; ////currentPage

    loadPageContent(selectedPageId); //currentPage
  }, [selectedPageId, loadPageContent]);//currentPage

  // Gestion des événements de l'éditeur
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // editor.on('component:update', saveCurrentPageContent);
    // editor.on('style:update', saveCurrentPageContent);

    // return () => {
    //   editor.off('component:update', saveCurrentPageContent);
    //   editor.off('style:update', saveCurrentPageContent);
    // };
  }, []); //saveCurrentPageContent

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (!id) return;

        setProjectID(id);
        setIsLoading(true);
        dispatch(setSelectedProjectEditorID(id));

        // First check if project has pages
        const pagesResponse = await hasPages({ idProject: id });
        const hasProjectPages = pagesResponse.EXISTE;
        dispatch(setFirstPage(!hasProjectPages))
        setProjectHasPages(hasProjectPages);

        const Allpages = [];

        const responsePages = await getPages({ idProject: id });
        if (responsePages.STATE === "OK" && responsePages.DATA.length > 0) {
          // Ensure we have pages before setting the ID
          const firstPageId = responsePages.DATA[0]?.id;
          if (firstPageId) {
            dispatch(setSelectedPageId(firstPageId));
            
            responsePages.DATA.forEach((page) => {
              Allpages.push({
                id: page.id,
                title: page.title,
                content: {
                  components: page.html_content,
                  styles: page.css_content,
                },
              });
            });
            
            setPages(Allpages);
            loadPageContent(firstPageId);
          }
        }
        if (Allpages.length > 0) {
          setPages(Allpages);
          //setCurrentPage(Allpages[0].id);
          setSelectedPageId(Allpages[0].id)
          loadPageContent(Allpages[0].id)
          console.log("currentPageID : ",selectedPageId)
        }
        setRefrecherLoad(!refrecherLoad);

        // Then fetch project details
        const response = await getProject({ id: id });
        const project = response.data;

        if (project) {
          dispatch(setSelectedProjectName(project.title || null));
          setTitle(project.title || "");
          setDescription(project.description || "");
          setDomaineName(project.domaineName || "");
          setRepository(project.repository || "");
          setImageUrl(backend_url + project.image_url);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id, refrecher]);

  return (
    <Provider store={store}>
      <div className="h-screen justify-center items-center flex flex-col bg-white">
        {isLoading ? (
          <ToolbarLoading />
        ) : (
          <Toolbar
            saveCurrentPageContent={saveCurrentPageContent}
            idProject={projectID}
            title={title}
            editor={editorInstance}
            pages={pages}
            setPages={setPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            handleNewPage={handleNewPage}
          />
        )}

        <div className="flex-1 flex w-full bg-white">
          <LeftPanel editor={editorInstance} />
          <div className="flex justify-center w-[100%] bg-black/5 py-5">
            {isLoading ? (
              <CanvasSkeleton />
            ) : (
              <>
                {(projectHasPages && !noPages) 
                ? (
                    <div
                      id="gjs"
                      key="editor-container"
                      className="h-full w-[40%] bg-white"
                    ></div>
                  )
                : ((!projectHasPages || noPages) && <WelcomeGuide/>)
                }
              </>
            )}
          </div>
          {isLoading ? (
            <RightPanelSkeleton />
          ) : (
            projectHasPages &&
            editorInstance && !noPages && (
              <PanelStyles
                pages={pages}
                setPages={setPages}
                currentPageID={currentPage}
                setTabState={setActivePanel}
                tabState={activePanel}
                editorInstance={editorInstance}
                className="w-[25%] min-w-[250px]"
                setCurrentPage={setCurrentPage}
              />
            )
          )}
        </div>
        <style jsx global>{`
          .gjs-block {
            width: calc(33.33% - 8px);
            height: auto;
            min-height: 80px;
            margin: 4px;
            padding: 12px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            cursor: move;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            font-family: "Inter", system-ui, -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .block-icon {
            color: #6b7280;
            transition: color 0.2s ease, transform 0.2s ease;
            width: 32px;
            height: 32px;
          }

          .gjs-block:hover .block-icon {
            transform: scale(1.1);
            color: #3b82f6;
          }

          .block-icon-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            gap: 8px;
          }

          .block-label {
            font-size: 13px;
            color: #374151;
            text-align: center;
            font-weight: 500;
            margin-top: 6px;
            transition: color 0.2s ease;
          }

          .gjs-one-bg {
            background-color: #ffffff;
          }

          .gjs-two-color {
            color: #111827;
          }

          .gjs-three-bg {
            background-color: #ffffff;
          }

          .gjs-four-color,
          .gjs-four-color-h:hover {
            color: #3b82f6;
          }

          #gjs {
            border: none;
          }

          .gjs-cv-canvas {
            width: 100%;
            height: 100%;
            top: 0;
          }

          .gjs-pn-btn {
            border-radius: 6px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease;
          }

          .gjs-pn-btn.gjs-pn-active {
            background-color: #3b82f6;
            color: #ffffff;
            border-color: #3b82f6;
          }

          .gjs-category-title,
          .gjs-layer-title,
          .gjs-block-category .gjs-title,
          .gjs-sm-sector-title {
            font-weight: 600;
            font-size: 14px;
            color: #111827;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
            background: #ffffff;
          }

          .gjs-block-category {
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
          }

          .gjs-block-category.gjs-open {
            border-bottom: none;
          }

          .gjs-blocks-c {
            padding: 8px;
            background: #ffffff;
          }

          .gjs-field {
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
          }

          .gjs-field:focus-within {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
          }

          .gjs-category-title,
          .gjs-layer-title {
            background-color: #ffffff;
            padding: 12px 16px;
            font-weight: 600;
            color: #111827;
            border-bottom: 1px solid #e5e7eb;
          }

          .gjs-layer-count {
            background-color: #f1f5f9;
            color: #3b82f6;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 12px;
            font-weight: 500;
          }
        `}</style>
      </div>
    </Provider>
  );
};

export default Editor;
