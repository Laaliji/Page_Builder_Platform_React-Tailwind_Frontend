import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText } from "lucide-react";

export function PageRenderer({ html_content, css_content, title }) {
  const styleId = `style-${title.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.id = styleId;
    styleTag.textContent = css_content;
    document.head.appendChild(styleTag);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [css_content, styleId]);

  return (
    <Card className="border-2 border-solid border-gray-200 shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] group relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-gray-100 to-gray-200 p-4">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <ExternalLink className="h-5 w-5 text-gray-500 transition-opacity opacity-0 group-hover:opacity-100" />
      </CardHeader>
      <Separator className="bg-gray-300" />
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] w-full bg-gray-50">
          <div className="p-6">
            <div
              dangerouslySetInnerHTML={{ __html: html_content }}
              className="rendered-content prose prose-sm sm:prose-base max-w-none text-gray-700 dark:prose-invert dark:text-gray-300"
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
