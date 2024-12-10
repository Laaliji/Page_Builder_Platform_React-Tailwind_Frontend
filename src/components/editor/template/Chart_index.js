import grapesjs from 'grapesjs';
import loadComponents from './components'; 
import loadBlocks from './blocks';
import loadCommands from './commands';
import loadPanels from './panels';
import parserHtmlCaseSensitive from './ParserHtmlCaseSensitive';

import {
    ChartPluginRef
} from './consts';

export default function addChartPlugin() {
    grapesjs.plugins.add(ChartPluginRef, (editor, opts = {}) => {

        
        editor.TraitManager.addType('pre', {
                                                                
            noLabel: true,
            
            getInputEl() {
                const { model} = this;
                const {text} = model.props();
                const label = text;
                const input = `<div type="text" style="font-size: 1rem; line-height:30px; margin:10px; word-wrap: break-word; width: 180px;">${label}</div>`;
                return input;
            }
        }
                                                            
		) 



        let c = opts;
 
        let defaults = {
            blocks: [ChartPluginRef],

            blockLabel: 'Charts',

            blockCategory: 'Extra',

            defaultStyle: true,

        };
        console.log(defaults)

        for (let name in defaults) {
            if (!(name in c))
                c[name] = defaults[name];
        }

        loadComponents(editor, c);

        loadBlocks(editor, c);

        loadCommands(editor, c);

        loadPanels(editor, c); 

        const em = editor.getModel();
        const emConf = em.get('Config');
        emConf.textTags = ['br', 'b', 'i', 'u', 'a', 'ul', 'ol'];
        em.get('Parser').parserHtml = parserHtmlCaseSensitive(emConf);
        em.get('Parser').parseHtml = (str) => {
            const pHtml = em.get('Parser').parserHtml;
            pHtml.compTypes = em.get('DomComponents').getTypes();
            let res = pHtml.parse(str, em.get('Parser').parserCss);
            return res;
        };

        editor.on("load", () => {
            const openBl = editor.Panels.getButton('views', 'open-blocks');
            openBl && openBl.set('active', 1);
        });

    });
}

