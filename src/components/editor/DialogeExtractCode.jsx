import { FileJson, FilePlus2, FolderPen, FolderPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
export default function DialogeExtractCode({ isExtractCodeDialogOpen,setIsExtractCodeDialogOpen,editor }){
    return <>
        <Dialog className="" open={isExtractCodeDialogOpen} onOpenChange={setIsExtractCodeDialogOpen}>
            <DialogContent className="min-w-fit">
                <DialogHeader className="">
                    <DialogTitle className="flex items-center gap-2">
                       <FileJson size="19"/> <p>Code</p>
                    </DialogTitle>
                    <DialogDescription className="pt-3 flex gap-1 w-full overflow-hidden">
         
                        <div className="max-w-[50%] min-w-[50%] w-[50%] ">
                            <div className="text-orange-400 bg-slate-800 py-[3px] pl-2">HTML</div>
                            <div className="p-2  bg-slate-800 min-h-[200px] ">
                                <pre
                                    className=" text-wrap max-h-[300px] min-h-[300px] overflow-y-scroll"
                                    dangerouslySetInnerHTML={{
                                        __html: hljs.highlight(editor?.getHtml() || "", { language: "html" }).value,
                                    }}
                                ></pre>
                            </div>
                        </div>
        
                        <div className="max-w-[50%] min-w-[50%] w-[50%] overflow-hidden ">
                            <div className="text-yellow-400 bg-slate-800 py-[3px] pl-2">CSS</div>
                            <div className="p-2  bg-slate-800 min-h-[200px] ">
                                <pre
                                    className=" text-wrap max-h-[300px] min-h-[300px] overflow-y-scroll"
                                    dangerouslySetInnerHTML={{
                                        __html: hljs.highlight(editor?.getCss() || "", { language: "css" }).value,
                                    }}
                                ></pre>
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
}