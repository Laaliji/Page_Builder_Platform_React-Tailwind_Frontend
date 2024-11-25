// Editor.jsx
import React, { useEffect, useState } from 'react';
import { Settings, Download, FileText, Plus } from 'lucide-react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsBlockBasic from 'grapesjs-blocks-basic';
import Toolbar from '../../components/editor/Toolbar';
import PanelStyles from '@/components/editor/PanelStyles';
import LeftPanel from '@/components/editor/LeftPanel';

const Editor = () => {
  const [tabState,setTabState] = useState(false);
  const [editor, setEditor] = useState(null);
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [pages, setPages] = useState([
    { id: 1, name: 'Home', path: '/home' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Dashboard', path: '/dashboard' },
  ]);

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: '95%',
      storageManager: false,
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true,
                className: 'btn-toggle-borders',
                label: '<u>B</u>',
                command: 'sw-visibility',
              },
            ],
          }
        ]
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '', 
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px',
          },
        ]
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          // Basic Components
          { id: 'section', label: 'Section', category: 'Composants', content: '<section class="section"><h1>Section Title</h1><p>Section content goes here</p></section>', attributes: { class: 'gjs-block-section' } },
          { id: 'text', label: 'Text', category: 'Composants', content: { type: 'text', content: 'Insert your text here', style: { padding: '10px' } }, attributes: { class: 'gjs-block-text' } },
          { id: 'image', label: 'Image', category: 'Composants', content: { type: 'image' }, attributes: { class: 'gjs-block-image' } },
          { id: 'button', label: 'Button', category: 'Composants', content: '<button class="button">Click me</button>', attributes: { class: 'gjs-block-button' } },
      
          // Layout Components
          { id: 'grid', label: 'Grid', category: 'Mise en page', content: '<div class="grid-container"><div class="grid-item">1</div><div class="grid-item">2</div><div class="grid-item">3</div><div class="grid-item">4</div></div>', attributes: { class: 'gjs-block-grid' } },
          { id: 'two-cols', label: 'Two Columns', category: 'Mise en page', content: '<div class="two-cols-container"><div class="col">Column 1</div><div class="col">Column 2</div></div>', attributes: { class: 'gjs-block-two-cols' } },
          { id: 'float', label: 'Float Layout', category: 'Mise en page', content: '<div class="float-container"><div class="float-item" style="float:left; width:50%;">Left</div><div class="float-item" style="float:right; width:50%;">Right</div></div>', attributes: { class: 'gjs-block-float' } },
      
          // Advanced Components
          { id: 'card', label: 'Card', category: 'Avancé', content: '<div class="card"><h2>Card Title</h2><p>Card content goes here</p><button>Click Me</button></div>', attributes: { class: 'gjs-block-card' } },
          { id: 'list', label: 'List', category: 'Avancé', content: '<ul class="list"><li>List Item 1</li><li>List Item 2</li><li>List Item 3</li></ul>', attributes: { class: 'gjs-block-list' } },
          { id: 'form', label: 'Form', category: 'Avancé', content: '<form class="form"><input type="text" placeholder="Enter text" /><button type="submit">Submit</button></form>', attributes: { class: 'gjs-block-form' } },
          
          // Additional Components
          { id: 'video', label: 'Video', category: 'Médias', content: '<video controls><source src="movie.mp4" type="video/mp4">Your browser does not support the video tag.</video>', attributes: { class: 'gjs-block-video' } },
          { id: 'audio', label: 'Audio', category: 'Médias', content: '<audio controls><source src="audio.mp3" type="audio/mp3">Your browser does not support the audio tag.</audio>', attributes: { class: 'gjs-block-audio' } },
          { id: 'map', label: 'Map', category: 'Médias', content: '<iframe src="https://www.google.com/maps/embed" width="600" height="450" frameborder="0" style="border:0"></iframe>', attributes: { class: 'gjs-block-map' } },
          { id: 'accordion', label: 'Accordion', category: 'Widgets', content: '<div class="accordion"><h3>Section 1</h3><div><p>Section 1 Content</p></div><h3>Section 2</h3><div><p>Section 2 Content</p></div></div>', attributes: { class: 'gjs-block-accordion' } },
          { id: 'carousel', label: 'Carousel', category: 'Widgets', content: '<div class="carousel"><div class="carousel-item">Item 1</div><div class="carousel-item">Item 2</div><div class="carousel-item">Item 3</div></div>', attributes: { class: 'gjs-block-carousel' } },
          { id: 'tabs', label: 'Tabs', category: 'Widgets', content: '<div class="tabs"><ul><li>Tab 1</li><li>Tab 2</li></ul><div class="tab-content">Content for Tab 1</div><div class="tab-content">Content for Tab 2</div></div>', attributes: { class: 'gjs-block-tabs' } },
          { id: 'progress-bar', label: 'Progress Bar', category: 'Widgets', content: '<div class="progress-bar"><div class="progress" style="width: 70%;">70%</div></div>', attributes: { class: 'gjs-block-progress-bar' } },
          { id: 'alert', label: 'Alert', category: 'Widgets', content: '<div class="alert">This is an alert message</div>', attributes: { class: 'gjs-block-alert' } },
          { id: 'quote', label: 'Quote', category: 'Composants', content: '<blockquote class="quote">This is a quote</blockquote>', attributes: { class: 'gjs-block-quote' } },
          { id: 'timeline', label: 'Timeline', category: 'Widgets', content: '<div class="timeline"><div class="timeline-item">Item 1</div><div class="timeline-item">Item 2</div></div>', attributes: { class: 'gjs-block-timeline' } },
          { id: 'pricing-table', label: 'Pricing Table', category: 'Widgets', content: '<div class="pricing-table"><div class="pricing-item"><h3>Basic</h3><p>$10</p></div><div class="pricing-item"><h3>Pro</h3><p>$20</p></div></div>', attributes: { class: 'gjs-block-pricing-table' } },
          { id: 'testimonial', label: 'Testimonial', category: 'Widgets', content: '<div class="testimonial"><p>"This is a testimonial"</p><cite>- Author</cite></div>', attributes: { class: 'gjs-block-testimonial' } },
          { id: 'faq', label: 'FAQ', category: 'Widgets', content: '<div class="faq"><h3>Question 1</h3><p>Answer 1</p><h3>Question 2</h3><p>Answer 2</p></div>', attributes: { class: 'gjs-block-faq' } },
          { id: 'countdown', label: 'Countdown', category: 'Widgets', content: '<div class="countdown"><span>10:00</span></div>', attributes: { class: 'gjs-block-countdown' } },
          { id: 'contact-form', label: 'Contact Form', category: 'Forms', content: '<form class="contact-form"><input type="text" placeholder="Name" /><input type="email" placeholder="Email" /><textarea placeholder="Message"></textarea><button type="submit">Send</button></form>', attributes: { class: 'gjs-block-contact-form' } },
          { id: 'login-form', label: 'Login Form', category: 'Forms', content: '<form class="login-form"><input type="text" placeholder="Username" /><input type="password" placeholder="Password" /><button type="submit">Login</button></form>', attributes: { class: 'gjs-block-login-form' } },
          { id: 'register-form', label: 'Register Form', category: 'Forms', content: '<form class="register-form"><input type="text" placeholder="Username" /><input type="email" placeholder="Email" /><input type="password" placeholder="Password" /><button type="submit">Register</button></form>', attributes: { class: 'gjs-block-register-form' } },
          { id: 'image-slider', label: 'Image Slider', category: 'Médias', content: '<div class="image-slider"><div class="slider-item">Image 1</div><div class="slider-item">Image 2</div></div>', attributes: { class: 'gjs-block-image-slider' } },
          { id: 'newsletter', label: 'Newsletter', category: 'Forms', content: '<form class="newsletter"><input type="email" placeholder="Email" /><button type="submit">Subscribe</button></form>', attributes: { class: 'gjs-block-newsletter' } }
        ]
      }
      
      ,
      styleManager : {
        appendTo: "#styles",
        sectors: [
          {
            name: "General",
            buildProps: [
              "float",
              "display",
              "position",
              "top",
              "right",
              "left",
              "bottom",
            ],
            properties: [
              {
                name: "Alignment",
                property: "float",
                type: "radio",
                defaults: "none",
                list: [
                  { value: "none", className: "fa fa-times" },
                  { value: "left", className: "fa fa-align-left" },
                  { value: "right", className: "fa fa-align-right" },
                ],
              },
              { property: "position", type: "select" },
            ],
          },
          {
            name: "Dimension",
            open: false,
            buildProps: [
              "width",
              "max-width",
              "min-width",
              "height",
              "max-height",
              "min-height",
              "margin",
              "padding",
            ],
            properties: [
              {
                id: "flex-width",
                type: "integer",
                name: "Width",
                units: ["px", "%"],
                property: "flex-basis",
                toRequire: 1,
              },
              {
                property: "margin",
                properties: [
                  { name: "Top", property: "margin-top" },
                  { name: "Right", property: "margin-right" },
                  { name: "Bottom", property: "margin-bottom" },
                  { name: "Left", property: "margin-left" },
                ],
              },
              {
                property: "padding",
                properties: [
                  { name: "Top", property: "padding-top" },
                  { name: "Right", property: "padding-right" },
                  { name: "Bottom", property: "padding-bottom" },
                  { name: "Left", property: "padding-left" },
                ],
              },
            ],
          },
          {
            name: "Typography",
            open: false,
            buildProps: [
              "font-family",
              "font-size",
              "font-weight",
              "letter-spacing",
              "color",
              "line-height",
              "text-align",
              "text-decoration",
              "text-shadow",
            ],
            properties: [
              { name: "Font", property: "font-family" },
              { name: "Weight", property: "font-weight" },
              { name: "Font color", property: "color" },
              {
                property: "text-align",
                type: "radio",
                defaults: "left",
                list: [
                  { value: "left", name: "Left", className: "fa fa-align-left" },
                  {
                    value: "center",
                    name: "Center",
                    className: "fa fa-align-center",
                  },
                  { value: "right", name: "Right", className: "fa fa-align-right" },
                  {
                    value: "justify",
                    name: "Justify",
                    className: "fa fa-align-justify",
                  },
                ],
              },
              {
                property: "text-decoration",
                type: "radio",
                defaults: "none",
                list: [
                  { value: "none", name: "None", className: "fa fa-times" },
                  {
                    value: "underline",
                    name: "underline",
                    className: "fa fa-underline",
                  },
                  {
                    value: "line-through",
                    name: "Line-through",
                    className: "fa fa-strikethrough",
                  },
                ],
              },
              {
                property: "text-shadow",
                properties: [
                  { name: "X position", property: "text-shadow-h" },
                  { name: "Y position", property: "text-shadow-v" },
                  { name: "Blur", property: "text-shadow-blur" },
                  { name: "Color", property: "text-shadow-color" },
                ],
              },
            ],
          },
          {
            name: "Decorations",
            open: false,
            buildProps: [
              "opacity",
              "border-radius",
              "border",
              "box-shadow",
              "background-bg",
            ],
            properties: [
              {
                type: "slider",
                property: "opacity",
                defaults: 1,
                step: 0.01,
                max: 1,
                min: 0,
              },
              {
                property: "border-radius",
                properties: [
                  { name: "Top", property: "border-top-left-radius" },
                  { name: "Right", property: "border-top-right-radius" },
                  { name: "Bottom", property: "border-bottom-left-radius" },
                  { name: "Left", property: "border-bottom-right-radius" },
                ],
              },
              {
                property: "box-shadow",
                properties: [
                  { name: "X position", property: "box-shadow-h" },
                  { name: "Y position", property: "box-shadow-v" },
                  { name: "Blur", property: "box-shadow-blur" },
                  { name: "Spread", property: "box-shadow-spread" },
                  { name: "Color", property: "box-shadow-color" },
                  { name: "Shadow type", property: "box-shadow-type" },
                ],
              },
              {
                id: "background-bg",
                property: "background",
                type: "bg",
              },
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["transition", "perspective", "transform"],
            properties: [
              {
                property: "transition",
                properties: [
                  { name: "Property", property: "transition-property" },
                  { name: "Duration", property: "transition-duration" },
                  { name: "Easing", property: "transition-timing-function" },
                ],
              },
              {
                property: "transform",
                properties: [
                  { name: "Rotate X", property: "transform-rotate-x" },
                  { name: "Rotate Y", property: "transform-rotate-y" },
                  { name: "Rotate Z", property: "transform-rotate-z" },
                  { name: "Scale X", property: "transform-scale-x" },
                  { name: "Scale Y", property: "transform-scale-y" },
                  { name: "Scale Z", property: "transform-scale-z" },
                ],
              },
            ],
          },
          {
            name: "Flex",
            open: false,
            properties: [
              {
                name: "Flex Container",
                property: "display",
                type: "select",
                defaults: "block",
                list: [
                  { value: "block", name: "Disable" },
                  { value: "flex", name: "Enable" },
                ],
              },
              {
                name: "Flex Parent",
                property: "label-parent-flex",
                type: "integer",
              },
              {
                name: "Direction",
                property: "flex-direction",
                type: "radio",
                defaults: "row",
                list: [
                  {
                    value: "row",
                    name: "Row",
                    className: "icons-flex icon-dir-row",
                    title: "Row",
                  },
                  {
                    value: "row-reverse",
                    name: "Row reverse",
                    className: "icons-flex icon-dir-row-rev",
                    title: "Row reverse",
                  },
                  {
                    value: "column",
                    name: "Column",
                    title: "Column",
                    className: "icons-flex icon-dir-col",
                  },
                  {
                    value: "column-reverse",
                    name: "Column reverse",
                    title: "Column reverse",
                    className: "icons-flex icon-dir-col-rev",
                  },
                ],
              },
              {
                name: "Justify",
                property: "justify-content",
                type: "radio",
                defaults: "flex-start",
                list: [
                  {
                    value: "flex-start",
                    className: "icons-flex icon-just-start",
                    title: "Start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-just-end",
                  },
                  {
                    value: "space-between",
                    title: "Space between",
                    className: "icons-flex icon-just-sp-bet",
                  },
                  {
                    value: "space-around",
                    title: "Space around",
                    className: "icons-flex icon-just-sp-ar",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-just-sp-cent",
                  },
                ],
              },
              {
                name: "Align",
                property: "align-items",
                type: "radio",
                defaults: "center",
                list: [
                  {
                    value: "flex-start",
                    title: "Start",
                    className: "icons-flex icon-al-start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-al-end",
                  },
                  {
                    value: "stretch",
                    title: "Stretch",
                    className: "icons-flex icon-al-str",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-al-center",
                  },
                ],
              },
              {
                name: "Flex Children",
                property: "label-parent-flex",
                type: "integer",
              },
              {
                name: "Order",
                property: "order",
                type: "integer",
                defaults: 0,
                min: 0,
              },
              {
                name: "Flex",
                property: "flex",
                type: "composite",
                properties: [
                  {
                    name: "Grow",
                    property: "flex-grow",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: "Shrink",
                    property: "flex-shrink",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: "Basis",
                    property: "flex-basis",
                    type: "integer",
                    units: ["px", "%", ""],
                    unit: "",
                    defaults: "auto",
                  },
                ],
              },
              {
                name: "Align",
                property: "align-self",
                type: "radio",
                defaults: "auto",
                list: [
                  {
                    value: "auto",
                    name: "Auto",
                  },
                  {
                    value: "flex-start",
                    title: "Start",
                    className: "icons-flex icon-al-start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-al-end",
                  },
                  {
                    value: "stretch",
                    title: "Stretch",
                    className: "icons-flex icon-al-str",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-al-center",
                  },
                ],
              },
            ],
          },
        ],
      }
      
      
    });

    setEditor(editor);
    return () => editor.destroy();
  }, [tabState]);

  return (
    <div className="h-screen justify-center items-center flex flex-col bg-[whitesmoke]">

      <Toolbar title="E-commerce website"/>

      <div className="flex-1 flex w-full bg-[whitesmoke]">

        <LeftPanel />

        <div className="flex justify-center w-[100%] bg-[whitesmoke] py-5">
            <div id="gjs" className="h-full w-[40%]  bg-[whitesmoke]"></div>
        </div>

        <PanelStyles setTabState={setTabState} tabState={tabState} />

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