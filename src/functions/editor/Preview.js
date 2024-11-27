export const Preview = ({ editor }) => {
    const currentPage = editor.Pages.getSelected();
    if (currentPage) {
        const pageHtml = currentPage.getMainComponent().toHTML();
        const pageCss = editor.getCss();

        const width = window.innerWidth;
        const height = window.innerHeight;

        const previewWindow = window.open('', 'Preview', `width=${width},height=${height}`);
        previewWindow.document.open();
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    ${pageCss}
                </style>
            </head>
            <body>
                ${pageHtml}
            </body>
            </html>
        `);
        previewWindow.document.close();
    } else {
        alert('No page selected');
    }
}