import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
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
import Toolbar from "../../components/editor/Toolbar";
import PanelStyles from "@/components/editor/PanelStyles";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import LeftPanel from "@/components/editor/LeftPanel";
import {
  BlockManager,
  DeviceManager,
  LayerManager,
  Panels,
  StorageManager,
  StyleManager,
} from "@/lib/editorConfig";

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
  const [editorInstance, setEditorInstance] = useState(null);
  const [activePanel, setActivePanel] = useState("block");

  useEffect(() => {
    const initEditor = async () => {
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100%",
        width: "95%",
        storageManager: StorageManager,
        panels: Panels,
        deviceManager: DeviceManager,
        blockManager: {
          ...BlockManager,
          blocks: BlockManager.blocks.map((block) => {
            const IconComponent = blockIcons[block.id] || Link;
            return {
              ...block,
              label: ReactDOMServer.renderToString(
                <div className="block-icon-wrapper">
                  {React.createElement(IconComponent, {
                    className: "block-icon",
                    size: 24,
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
        plugins: [gjsBlocksBasic],
        pluginsOpts: {
          gjsBlocksBasic: { blocks: BlockManager.blocks },
        },
      });

      await new Promise((resolve) => editor.on("load", resolve));

      setEditorInstance(editor);
    };

    initEditor();

    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorInstance) {
      const blockPanel = editorInstance.Panels.getPanel("blocks");
      const stylePanel = editorInstance.Panels.getPanel("styles");
      if (blockPanel) blockPanel.set("visible", activePanel === "block");
      if (stylePanel) stylePanel.set("visible", activePanel === "style");
    }
  }, [activePanel, editorInstance]);

  return (
    <div className="h-screen justify-center items-center flex flex-col bg-white">
      <Toolbar title="E-commerce website" editor={editorInstance} />
      <div className="flex-1 flex w-full bg-white">
        <LeftPanel editor={editorInstance} />
        <div className="flex justify-center w-[100%] bg-white py-5">
          <div id="gjs" className="h-full w-[40%] bg-white"></div>
        </div>
        {editorInstance && (
          <PanelStyles
            setTabState={setActivePanel}
            tabState={activePanel}
            editorInstance={editorInstance}
          />
        )}
      </div>
      <style jsx global>{`
        .gjs-block {
          width: calc(50% - 20px);
          height: auto;
          min-height: 90px;
          margin: 10px;
          padding: 16px;
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

        .gjs-block:hover {
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.12);
          border-color: #3b82f6;
          transform: translateY(-2px);
          background: linear-gradient(to bottom right, #ffffff, #f8faff);
        }

        .gjs-block:active {
          transform: translateY(0px);
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

        .block-icon {
          color: #3b82f6;
          transition: transform 0.2s ease;
        }

        .gjs-block:hover .block-icon {
          transform: scale(1.1);
        }

        .block-label {
          font-size: 13px;
          color: #374151;
          text-align: center;
          font-weight: 500;
          margin-top: 6px;
          transition: color 0.2s ease;
        }

        .gjs-block:hover .block-label {
          color: #3b82f6;
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

        .gjs-pn-btn:hover {
          background-color: #f8faff;
          border-color: #3b82f6;
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
          padding: 16px;
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
  );
};

export default Editor;
