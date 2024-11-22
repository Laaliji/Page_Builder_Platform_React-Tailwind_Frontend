// EnhancedGrapesEditor.jsx
import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

export default function Editor(){
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: 'auto',
        storageManager: false,
        canvas: {
          styles: [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
          ],
        },
        panels: {
          defaults: [
            {
              id: 'main-toolbar',
              buttons: [
                { id: 'preview', className: 'btn-preview', label: '👁 Preview', command: 'preview' },
                { id: 'publish', className: 'btn-publish', label: '🚀 Publish', command: e => console.log('Published:', e.getHtml()) },
                { id: 'download', className: 'btn-download', label: '⬇️ Download', command: 'export-template' },
                { id: 'extract', className: 'btn-extract', label: '📤 Extract', command: e => console.log('Extracted:', e.getHtml()) },
                { id: 'settings', className: 'btn-settings', label: '⚙️', command: 'open-settings' }
              ]
            }
          ]
        },
        blockManager: {
          appendTo: '#blocks',
          blocks: [
            {
              id: 'section',
              label: '<div class="block-label"><i class="fas fa-square"></i>Section</div>',
              category: 'Basic',
              content: `
                <section class="section-block">
                  <h2>Section Title</h2>
                  <p>Add your content here...</p>
                </section>
              `,
              attributes: { class: 'section-block-item' }
            },
            {
              id: 'text',
              label: '<div class="block-label"><i class="fas fa-font"></i>Text</div>',
              category: 'Basic',
              content: '<div data-gjs-type="text">Add your text here</div>',
              attributes: { class: 'text-block-item' }
            },
            {
              id: 'image',
              label: '<div class="block-label"><i class="fas fa-image"></i>Image</div>',
              category: 'Basic',
              content: { type: 'image' },
              attributes: { class: 'image-block-item' }
            },
            {
              id: 'button',
              label: '<div class="block-label"><i class="fas fa-square"></i>Button</div>',
              category: 'Basic',
              content: `<button class="custom-button">Click me</button>`,
              attributes: { class: 'button-block-item' }
            },
            {
              id: 'form',
              label: '<div class="block-label"><i class="fas fa-form"></i>Form</div>',
              category: 'Basic',
              content: `
                <form class="custom-form">
                  <div class="form-group">
                    <label>Name:</label>
                    <input type="text" class="form-control"/>
                  </div>
                  <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-control"/>
                  </div>
                  <button type="submit" class="submit-button">Submit</button>
                </form>
              `,
              attributes: { class: 'form-block-item' }
            }
          ]
        },
        styleManager: {
          appendTo: '#styles-container',
          sectors: [
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'height', 'min-width', 'min-height', 'padding', 'margin'],
              properties: [
                {
                  name: 'Width',
                  property: 'width',
                  type: 'slider',
                  units: ['px', '%', 'rem'],
                  defaults: 'auto',
                  min: 0,
                  max: 100
                },
                {
                  name: 'Height',
                  property: 'height',
                  type: 'slider',
                  units: ['px', '%', 'rem'],
                  defaults: 'auto',
                  min: 0,
                  max: 100
                }
              ]
            },
            {
              name: 'Typography',
              open: false,
              buildProps: [
                'font-family',
                'font-size',
                'font-weight',
                'letter-spacing',
                'color',
                'line-height',
                'text-align',
                'text-decoration',
                'text-shadow'
              ]
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: [
                'background-color',
                'border',
                'border-radius',
                'box-shadow'
              ],
              properties: [
                {
                  name: 'Background',
                  property: 'background-color',
                  type: 'color'
                },
                {
                  name: 'Border Radius',
                  property: 'border-radius',
                  type: 'slider',
                  units: ['px', '%'],
                  defaults: '0',
                  min: 0,
                  max: 50
                }
              ]
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['opacity', 'transition', 'transform']
            }
          ]
        }
      });

      // Add custom commands
      editor.Commands.add('export-template', {
        run: editor => {
          const html = editor.getHtml();
          const css = editor.getCss();
          const content = `
            <html>
              <head>
                <style>${css}</style>
              </head>
              <body>${html}</body>
            </html>
          `;
          const blob = new Blob([content], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'template.html';
          a.click();
          URL.revokeObjectURL(url);
        }
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white shadow-sm flex items-center px-6">
        <div id="main-toolbar" className="flex items-center space-x-4"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar - Components */}
        <div className="w-72 bg-white border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <div id="blocks" className="component-list"></div>
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1 bg-gray-100">
          <div id="gjs" className="h-full"></div>
        </div>

        {/* Right sidebar - Styles */}
        <div className="w-72 bg-white border-l">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Styles</h2>
            <div id="styles-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom styles
const customStyles = `
  /* General Editor Styles */
  .gjs-one-bg { background-color: #ffffff; }
  .gjs-two-color { color: #2c3e50; }
  .gjs-three-bg { background-color: #f8f9fa; }
  .gjs-four-color { color: #2c3e50; }

  /* Component Blocks */
  .block-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    font-size: 14px;
    color: #2c3e50;
  }

  .block-label i {
    font-size: 16px;
    color: #4a90e2;
  }

  /* Draggable Components */
  [class*="-block-item"] {
    padding: 12px;
    margin: 8px 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    transition: all 0.2s;
    cursor: move;
  }

  [class*="-block-item"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Custom Button Styles */
  .custom-button {
    padding: 10px 20px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .custom-button:hover {
    background: #357abd;
  }

  /* Form Styles */
  .custom-form {
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #2c3e50;
  }

  .form-control {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }

  /* Submit Button */
  .submit-button {
    padding: 10px 20px;
    background: #48bb78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-button:hover {
    background: #38a169;
  }

  /* Style Manager Improvements */
  #styles-container {
    padding: 8px;
  }

  .gjs-sm-sector {
    margin-bottom: 20px;
  }

  .gjs-sm-sector-title {
    font-weight: 600;
    color: #2c3e50;
  }

  .gjs-sm-properties {
    padding: 10px;
  }

  /* Toolbar Buttons */
  .btn-preview,
  .btn-publish,
  .btn-download,
  .btn-extract,
  .btn-settings {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-preview { background: #ffffff; border: 1px solid #e2e8f0; }
  .btn-publish { background: #4a90e2; color: white; border: none; }
  .btn-download { background: #48bb78; color: white; border: none; }
  .btn-extract { background: #ffffff; border: 1px solid #e2e8f0; }
  .btn-settings { background: #ffffff; border: 1px solid #e2e8f0; }

  .btn-preview:hover,
  .btn-extract:hover,
  .btn-settings:hover {
    background: #f8f9fa;
  }

  .btn-publish:hover { background: #357abd; }
  .btn-download:hover { background: #38a169; }
`;

// Create style element
const styleElement = document.createElement('style');
styleElement.textContent = customStyles;
document.head.appendChild(styleElement);

