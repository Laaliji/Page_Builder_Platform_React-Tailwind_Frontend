// Layout Blocks Implementation for Grapesjs BlockManager
export function initLayoutBlocks(editor) {
    const blockManager = editor.BlockManager;
  
    // Utility function to create flexible grid blocks
    const createGridBlock = (columns, label) => {
      const gridItems = Array.from({ length: columns }, (_, i) => 
        `<div class="grid-item grid-item-${i + 1}">Column ${i + 1}</div>`
      ).join('');
  
      return {
        id: `grid-${columns}-cols`,
        label: label || `${columns} Column Grid`,
        category: 'Layout',
        content: `
          <div class="grid-container grid-${columns}-columns" style="
            display: grid; 
            grid-template-columns: ${Array(columns).fill('1fr').join(' ')}; 
            gap: 15px;
          ">
            ${gridItems}
          </div>
        `,
        attributes: { 
          class: `gjs-block-grid-${columns}-cols`,
          title: `Create a ${columns} column grid layout`
        }
      };
    };
  
    // Flexible Column Layouts
    const columnLayouts = [
      createGridBlock(2, 'Two Columns'),
      createGridBlock(3, 'Three Columns'),
      createGridBlock(4, 'Four Columns'),
    ];
  
    // Responsive Flex Layout Block
    const flexLayoutBlock = {
      id: 'flex-layout',
      label: 'Flexible Layout',
      category: 'Layout',
      content: `
        <div class="flex-container" style="
          display: flex; 
          flex-wrap: wrap; 
          gap: 15px; 
          justify-content: space-between;
        ">
          <div class="flex-item" style="flex: 1; min-width: 200px;">Flex Item 1</div>
          <div class="flex-item" style="flex: 1; min-width: 200px;">Flex Item 2</div>
          <div class="flex-item" style="flex: 1; min-width: 200px;">Flex Item 3</div>
        </div>
      `,
      attributes: { 
        class: 'gjs-block-flex-layout',
        title: 'Create a responsive flexible layout'
      }
    };
  
    // Advanced Float Layout with Responsive Considerations
    const advancedFloatLayout = {
      id: 'advanced-float',
      label: 'Float Layout',
      category: 'Layout',
      content: `
        <div class="float-container" style="overflow: hidden;">
          <div class="float-left" style="
            float: left; 
            width: 60%; 
            padding-right: 15px; 
            box-sizing: border-box;
          ">
            Main Content
          </div>
          <div class="float-right" style="
            float: right; 
            width: 40%; 
            padding-left: 15px; 
            box-sizing: border-box;
          ">
            Sidebar Content
          </div>
        </div>
      `,
      attributes: { 
        class: 'gjs-block-advanced-float',
        title: 'Create a float-based layout with main content and sidebar'
      }
    };
  
    // Masonry-like Grid Layout
    const masonryLayoutBlock = {
      id: 'masonry-layout',
      label: 'Masonry Grid',
      category: 'Layout',
      content: `
        <div class="masonry-container" style="
          column-count: 3; 
          column-gap: 15px; 
          width: 100%;
        ">
          <div class="masonry-item" style="
            break-inside: avoid; 
            margin-bottom: 15px; 
            background: #f0f0f0; 
            padding: 15px;
          ">Item 1</div>
          <div class="masonry-item" style="
            break-inside: avoid; 
            margin-bottom: 15px; 
            background: #e0e0e0; 
            padding: 15px;
          ">Item 2</div>
          <div class="masonry-item" style="
            break-inside: avoid; 
            margin-bottom: 15px; 
            background: #d0d0d0; 
            padding: 15px;
          ">Item 3</div>
        </div>
      `,
      attributes: { 
        class: 'gjs-block-masonry',
        title: 'Create a masonry-style grid layout'
      }
    };
  
    // Add all blocks to BlockManager
    [
      ...columnLayouts, 
      flexLayoutBlock, 
      advancedFloatLayout, 
      masonryLayoutBlock
    ].forEach(block => blockManager.add(block.id, block));
  }
