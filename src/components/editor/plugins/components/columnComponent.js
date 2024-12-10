const columnComponent = (editor) => {
  const domComponents = editor.DomComponents;

  // Check if domComponents is defined
  if (!domComponents || typeof domComponents.addType !== 'function') {
    console.error('DomComponents not initialized or addType is not available');
    return;
  }

  // Add the custom column type
  domComponents.addType('column', {
    model: {
      defaults: {
        tagName: 'div',
        classes: ['gs-column'], // Custom class for columns
        resizable: true, // Make it resizable
        droppable: true, // Allow nesting other components
        traits: [
          {
            type: 'text',
            label: 'Column Width',
            name: 'width',
            changeProp: 1,
          },
        ],
      },
    },
    view: {
      onRender() {
        this.el.style.minHeight = '50px'; // Ensure a minimum height for columns
      },
    },
  });
};

export default columnComponent;
