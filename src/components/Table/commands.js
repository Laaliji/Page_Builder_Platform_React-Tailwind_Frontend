/**
 * Adds loadHtmltemplate command
 */
import axios from 'axios'
import {
  addWidget,
  updateWidget,
  getWidgets,
  getWidgetData
} from './actions'
import {loadHtmltemplate} from "./consts";

export default (editor, config) => {
  const cm = editor.Commands;

  cm.add(loadHtmltemplate, e => {
      const pHtml = e.getModel().get('Parser').parserHtml;
      // JSX expression in attributes are quoted, so unquote them before passing on
      let html = pHtml.unquoteJsxExpresionsInAttributes(e.getHtml());
      config.setHtmlString(html);
      config.setCssString(e.getCss());
  });
  cm.add
    ('save-db',
      {
        run: function (editor, sender) {
          sender && sender.set('active');
          editor.store();
        }
      });
 
  
}
