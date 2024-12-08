import React, { useEffect, useState } from 'react';
import { grapesjs } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css'; 
import Toolbar from '../../components/editor/Toolbar'; 
import PanelStyles from '@/components/editor/PanelStyles';
import LeftPanel from '@/components/editor/LeftPanel'; 
import { BlockManager, DeviceManager, LayerManager, Panels, StorageManager, StyleManager } from '@/lib/editorConfig';

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [activePanel, setActivePanel] = useState('block'); // Track active panel (block, style, etc.)
  const [pages, setPages] = useState([
    { id: 1, name: 'Home', path: '/home' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Dashboard', path: '/dashboard' },
  ]);

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: '95%',
      storageManager: StorageManager,
      panels: Panels,
      deviceManager: DeviceManager,
      blockManager: BlockManager,
      styleManager: StyleManager,
      layerManager: LayerManager,
    });

    setEditor(editorInstance);
    return () => editorInstance.destroy();
  }, []);

  useEffect(() => {
    // Update panel visibility based on the active panel state
    if (editor) {
      const blockPanel = editor.Panels.getPanel('blocks');
      const stylePanel = editor.Panels.getPanel('styles');

      // Only set visibility if panel exists
      if (blockPanel) blockPanel.set('visible', activePanel === 'block');
      if (stylePanel) stylePanel.set('visible', activePanel === 'style');
      // Add other panels if needed
    }
  }, [activePanel, editor]);

  return (
    <div className="h-screen justify-center items-center flex flex-col bg-[whitesmoke]">
      <Toolbar title="E-commerce website" editor={editor} />

      <div className="flex-1 flex w-full bg-[whitesmoke]">
        <LeftPanel editor={editor} />
        <div className="flex justify-center w-[100%] bg-[whitesmoke] py-5">
          <div id="gjs" className="h-full w-[40%] bg-[whitesmoke]"></div>
        </div>
        <PanelStyles setTabState={setActivePanel} tabState={activePanel} />
      </div>

      <style jsx global>{`
        .gjs-block {
          width: 50%;
          height: auto;
          min-height: 45px;
          margin: 5px 0;
          padding: 1em;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 3px;
          cursor: move;
          transition: all 0.2s ease;
          text-align: center;
        }

        .gjs-block:hover {
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          border-color: #bbb;
        }

        .gjs-block-label {
          font-size: 14px;
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

        .gjs-cv-canvas {
          width: 100%;
          height: 100%;
          top: 0;
        }
      `}</style>
    </div>
  );
};

export default Editor;
