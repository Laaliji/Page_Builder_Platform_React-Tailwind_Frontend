import React from 'react';

/**
 * This component fixes the issue with non-boolean attributes in GrapesJS
 * It filters out problematic attributes and converts them to strings if needed
 */
class GrapesjsFilter extends React.Component {
  componentDidMount() {
    // Fix the style elements with problematic attributes
    this.fixStyleElements();
    
    // Set up a mutation observer to fix dynamically added style elements
    this.setupMutationObserver();
  }

  componentWillUnmount() {
    // Disconnect the observer when component unmounts
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  fixStyleElements() {
    // Find all style elements in the document
    const styleElements = document.querySelectorAll('style');
    
    styleElements.forEach(element => {
      // Fix jsx attribute
      if (element.hasAttribute('jsx')) {
        element.setAttribute('jsx', 'jsx');
      }
      
      // Fix global attribute
      if (element.hasAttribute('global')) {
        element.setAttribute('global', 'global');
      }
    });
  }
  
  setupMutationObserver() {
    // Create a mutation observer to watch for dynamically added style elements
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check if nodes were added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Look for style elements
          mutation.addedNodes.forEach(node => {
            if (node.tagName === 'STYLE') {
              // Fix attributes on the newly added style element
              if (node.hasAttribute('jsx')) {
                node.setAttribute('jsx', 'jsx');
              }
              if (node.hasAttribute('global')) {
                node.setAttribute('global', 'global');
              }
            }
          });
        }
      });
    });
    
    // Start observing the document with the configured parameters
    this.observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }
  
  render() {
    // This component doesn't render anything visible
    return null;
  }
}

export default GrapesjsFilter; 