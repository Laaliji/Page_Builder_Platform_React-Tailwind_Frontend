export default (domComponents, { editor, ...config }) => {
    // Ensure GrapesJS has finished initializing
    if (editor && editor.Components) {
      const { columnProps = {}, maxGrid = 12 } = config;
      const type = columnProps.type || TYPES.column;
      const gsType = GS_TYPES.column;
      
      // Mapping column sizes to percentages
      const sizeClassStylesMap = {};
      for (let i = 0; i < maxGrid; i++) {
        sizeClassStylesMap[i + 1] = `${(100 / maxGrid) * (i + 1)}%`;
      }
  
      const def = {
        extend: 'cell',
        model: {
          defaults: {
            name: 'Column',
            draggable: `[data-gs-type="${GS_TYPES.columns}"]`,
            traits: [
              {
                type: 'number',
                name: 'width',
                label: 'Column Width',
                min: 1,
                max: maxGrid,
                default: Math.floor(maxGrid / 2),
                changeProp: true,
              },
            ],
            resizable: {
              updateTarget: (el, rect, opt) => {
                const selected = el.__gjsv.model;
                if (!selected) return;
  
                const currentPos = opt.resizer.currentPos;
                const side = opt.resizer.handlerAttr === 'cr' ? 'right' : 'left';
  
                // Growth direction
                const isGrowing = (side === 'right' && currentPos.x > selected.lastX) ||
                                  (side === 'left' && currentPos.x < selected.lastX);
  
                const currentWidth = selected.getColumns();
                const newWidth = isGrowing ? currentWidth + 1 : currentWidth - 1;
  
                if (newWidth >= 1 && newWidth <= maxGrid) {
                  selected.setColumns(newWidth);
                }
  
                selected.lastX = currentPos.x;
              },
              cr: true,
              cl: true,
            },
            ...columnProps,
          },
  
          init() {
            const initialWidth = this.get('width') || Math.floor(maxGrid / 2);
            this.setColumns(initialWidth);
            this.lastX = 0;
            this.on('change:width', this.onWidthChange);
          },
  
          setColumns(value) {
            if (!value || value < 1 || value > maxGrid) return;
            this.set('columns', value);
            this.addAttributes({ 'data-gs-columns': value });
            this.addStyle({ width: sizeClassStylesMap[value] });
          },
  
          getColumns() {
            return this.get('columns') || Math.floor(maxGrid / 2);
          },
  
          onWidthChange() {
            const width = parseInt(this.get('width'));
            if (width !== this.getColumns()) {
              this.setColumns(width);
            }
          },
  
          getMaxColumns() {
            return maxGrid;
          },
        },
  
        view: {
          onRender() {
            this.el.classList.add('gjs-column');
          }
        }
      };
  
      // Add default styles and attributes
      const { attributes = {}, styles = '' } = def.model.defaults;
      const defaultStyles = `[data-gs-type="${gsType}"]{ 
        vertical-align: inherit; 
        overflow: hidden; 
        word-break: break-word;
      }`;
  
      def.model.defaults.styles = styles + defaultStyles;
      def.model.defaults.attributes = { 
        ...attributes, 
        'data-gs-type': gsType 
      };
  
      // Add the component type to the editor if it is fully initialized
      editor.Components.addType(type, def);
    } else {
      console.warn('Editor or editor.Components is not available at this time');
    }
  };
  