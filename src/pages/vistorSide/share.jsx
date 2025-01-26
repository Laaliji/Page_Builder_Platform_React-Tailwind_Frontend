import { PageRenderer } from "@/components/editor/PageRender";
import ShareBanner from "@/components/ShareBanner";
import { getPages } from "@/functions/editor/CRUD";
import { getPagesShared } from "@/functions/pages/CRUD";
import { use, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Share() {
    const { id } = useParams();
    const [pages,setPages] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            setPages((await getPagesShared({id})).DATA)
        };
        if(id) fetchPages();
    }, [id]);

    return <>
    <ShareBanner />
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background pb-8">
      <div className="mx-auto mt-20  px-2 sm:px-6 lg:px-4">
        <div className="grid gap-4 md:grid-cols-2">
          {pages.map((page) => (
            <PageRenderer
              key={page.id}
              html_content={page.html_content}
              css_content={page.css_content}
              title={page.title}
            />
          ))}
        </div>
      </div>
    </div>
    </>
}

