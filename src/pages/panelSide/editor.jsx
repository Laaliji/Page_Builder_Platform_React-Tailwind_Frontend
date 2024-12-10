import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import {
  FaColumns,
  FaImage,
  FaHeading,
  FaParagraph,
  FaList,
  FaTable,
  FaLink,
  FaRegWindowRestore,
  FaRegKeyboard,
  FaVideo,
  FaWaveSquare,
} from "react-icons/fa";
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
  section: FaColumns,
  text: FaParagraph,
  image: FaImage,
  button: FaRegKeyboard,
  grid: FaTable,
  "two-cols": FaColumns,
  card: FaRegWindowRestore,
  list: FaList,
  form: FaWaveSquare,
  video: FaVideo,
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
            const IconComponent = blockIcons[block.id] || FaLink;
            return {
              ...block,
              label: `
                <div class="block-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="block-icon">
                    <path d="${IconComponent.defaultProps?.svgPathData || ""}"/>
                  </svg>
                  <span class="block-label">${block.label}</span>
                </div>
              `,
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

      // Wait for the editor to be fully loaded
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
    <div className="h-screen justify-center items-center flex flex-col bg-[whitesmoke]">
      <Toolbar title="E-commerce website" editor={editorInstance} />
      <div className="flex-1 flex w-full bg-[whitesmoke]">
        <LeftPanel editor={editorInstance} />
        <div className="flex justify-center w-[100%] bg-[whitesmoke] py-5">
          <div id="gjs" className="h-full w-[40%] bg-[whitesmoke]"></div>
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
          width: 50%;
          height: auto;
          min-height: 45px;
          margin: 5px 0;
          padding: 1em;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: move;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-family: "Inter", "Segoe UI", Roboto, sans-serif;
        }
        .gjs-block:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          border-color: #3b82f6;
          transform: translateY(-3px);
        }
        .block-label {
          font-size: 12px;
          color: #333;
          text-align: center;
        }
        .gjs-one-bg {
          background-color: #fff;
        }
        .gjs-two-color {
          color: #383838;
        }
        .gjs-three-bg {
          background-color: #f5f5f5;
        }
        .gjs-four-color,
        .gjs-four-color-h:hover {
          color: #3b82f6;
        }
        #gjs {
          border: none;
        }
        .gjs-block-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .gjs-block-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .gjs-cv-canvas {
          width: 100%;
          height: 100%;
          top: 0;
        }
        .block-icon {
          font-size: 24px;
          margin-bottom: 8px;
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Editor;
