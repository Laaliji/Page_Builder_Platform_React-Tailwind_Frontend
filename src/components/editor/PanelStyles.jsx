import { Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function PanelStyles({tabState,setTabState}){
    return <>
        <div className="w-[35%] bg-white  pt-2 px-2" id="">
            <Tabs defaultValue="composants">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger onClick={()=>setTabState(!tabState)} value="styles">Styles</TabsTrigger>
                    <TabsTrigger onClick={()=>setTabState(!tabState)} value="composants">Composants</TabsTrigger>
                    <TabsTrigger value="page">Page</TabsTrigger>
                </TabsList>
                <TabsContent value="styles" className="flex mb-4">
                    <div className="max-h-[460px] overflow-y-scroll">
                        <div id="styles"></div>
                    </div>
                </TabsContent>
                <TabsContent value="composants">
                    <div className="max-h-[460px] overflow-y-scroll">
                        <div id="blocks" className="gjs-blocks-c"></div>
                    </div>
                </TabsContent>
                <TabsContent value="page">
                    <div className="px-3 flex flex-col gap-4">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Nom de Page</Label>
                            <Input className="focus:border-none" type="text" id="text" placeholder="Nom" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Titre de Page</Label>
                            <Input className="" type="text" id="text" placeholder="Titre" />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
                
                
        </div>
    </>
}