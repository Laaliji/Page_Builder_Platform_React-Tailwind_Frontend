

export default (editor, config) => {
    const pn = editor.Panels;
    console.log(pn.getPanels())

    
    pn.addButton('options', [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save', style:"color:#00C6CF; margin-left: 50px; " }
    }]);
    
}
