// Editor.jsx
import React, { useEffect, useState } from 'react';
import { Settings, Download, FileText, Plus } from 'lucide-react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsBlockBasic from 'grapesjs-blocks-basic';
import Toolbar from '../../components/editor/Toolbar';
import PanelFiles from '@/components/editor/PanelFiles';
import PanelStyles from '@/components/editor/PanelStyles';

const Editor = () => {
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
      width: 'auto',
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
      styleManager: {
        appendTo: '#styles',
        sectors: [
          {
            name: 'Dimension',
            open: false,
            properties: [
              { type: 'number', name: 'Width', property: 'width', units: ['px', '%', 'rem'], defaults: 'auto' },
              { type: 'number', name: 'Height', property: 'height', units: ['px', '%', 'rem'], defaults: 'auto' },
              { type: 'number', name: 'Padding', property: 'padding', units: ['px', '%', 'rem'], defaults: '0' },
              { type: 'number', name: 'Margin', property: 'margin', units: ['px', '%', 'rem'], defaults: '0' }
            ]
          },
          {
            name: 'Typography',
            open: false,
            properties: [
              { name: 'Font Size', property: 'font-size', type: 'number', units: ['px', 'em', 'rem'], defaults: '16px' },
              { name: 'Font Weight', property: 'font-weight', type: 'select', defaults: '400', options: [{ value: '100', name: 'Thin' }, { value: '400', name: 'Normal' }, { value: '700', name: 'Bold' }] },
              { name: 'Color', property: 'color', type: 'color', defaults: '#000000' },
              { name: 'Line Height', property: 'line-height', type: 'number', units: ['px', 'em', 'rem'], defaults: '1.5' },
              { name: 'Letter Spacing', property: 'letter-spacing', type: 'number', units: ['px', 'em', 'rem'], defaults: '0' }
            ]
          },
          {
            name: 'Background',
            open: false,
            properties: [
              { name: 'Background Color', property: 'background-color', type: 'color', defaults: 'transparent' },
              { name: 'Background Image', property: 'background-image', type: 'file' },
              { name: 'Background Repeat', property: 'background-repeat', type: 'select', options: [{ value: 'no-repeat', name: 'No Repeat' }, { value: 'repeat', name: 'Repeat' }, { value: 'repeat-x', name: 'Repeat X' }, { value: 'repeat-y', name: 'Repeat Y' }] },
              { name: 'Background Size', property: 'background-size', type: 'select', options: [{ value: 'auto', name: 'Auto' }, { value: 'cover', name: 'Cover' }, { value: 'contain', name: 'Contain' }] }
            ]
          },
          {
            name: 'Border',
            open: false,
            properties: [
              { name: 'Border Width', property: 'border-width', type: 'number', units: ['px'], defaults: '1px' },
              { name: 'Border Style', property: 'border-style', type: 'select', options: [{ value: 'none', name: 'None' }, { value: 'solid', name: 'Solid' }, { value: 'dotted', name: 'Dotted' }, { value: 'dashed', name: 'Dashed' }] },
              { name: 'Border Color', property: 'border-color', type: 'color', defaults: '#000000' },
              { name: 'Border Radius', property: 'border-radius', type: 'number', units: ['px', '%'], defaults: '0' }
            ]
          }
        ]
      }
      
    });

    setEditor(editor);
    return () => editor.destroy();
  }, []);

  return (
    <div className="h-screen pt-4 gap-y-5 justify-center items-center flex flex-col bg-gradient-to-r from-[#373b44] to-[#4286f4]">

      <Toolbar />

      <div className="flex-1 flex w-[95%] gap-x-5 pb-3">

        <PanelFiles />

        <div className="flex-1 w-[500px] rounded-2xl bg-white p-2">
            <div id="gjs" className="h-full w-[400px] rounded-2xl"></div>
        </div>

        <PanelStyles />

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