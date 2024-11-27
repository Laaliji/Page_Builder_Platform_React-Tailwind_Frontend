export const Preview = ({ editor }) => {
    const currentPage = editor.Pages.getSelected();
    if (currentPage) {
        const pageHtml = currentPage.getMainComponent().toHTML();
        const pageCss = editor.getCss();

        const previewTab = window.open('', '_blank');

        if (previewTab) {
            previewTab.document.open();
            previewTab.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Page Preview</title>
                    <style>
                        ${pageCss}
                    </style>
                </head>
                <body>
                    ${pageHtml}
                </body>
                </html>
            `);
            previewTab.document.close();
        } else {
            alert('Unable to open preview. Please allow pop-ups for this site.');
        }
    } else {
        alert('No page selected');
    }
};
