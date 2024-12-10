
import {
    TableRef
} from './consts';

export default function (editor, opt = {}) {

    const c = opt;
  const bm = editor.BlockManager;   
bm.remove(TableRef);
    bm.add(TableRef, {
      label: 'Tabel',
      category: c.blockLabel,
      attributes: { class: 'fa fa-table' },
      content: `
        <div class="T" data-gjs-type="${TableRef}"></div>
        <style>
        .T {
              float: left;

        }
        .Tbody {
          max-height: 585px;
          overflow: auto;
        }
        .Tbody tr:nth-child(even) {
        background-color: #f8f6ff;
      }
        </style>
      `
    });
  
}
