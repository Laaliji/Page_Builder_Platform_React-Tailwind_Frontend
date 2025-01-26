import useFetch from "@/hooks/useFetch";


export async function hasPages({idProject}){
    return useFetch({
        method : "GET",
        resource : `pages/existePages/${idProject}`
    })
}

export async function getPages({idProject}){
    return useFetch({
        method : "GET",
        resource : `pages/${idProject}`
    })
} 

export async function getPage({idPage}){
    return useFetch({
        method : "GET",
        resource : `page/${idPage}`
    })
}

export async function updatePageMetaData({ idPage , title , htmlPageTitle }){
    return useFetch({
        method : "POST",
        resource : `pages/${idPage}`,
        body : {title, html_page_title : htmlPageTitle}
    })
}

export async function createPage({ id , idProject , title }){
    return useFetch({
        method : "POST",
        resource : `pages`,
        body : {title, id, project_id : idProject}
    })
}

export async function insertContent({idPage, htlmContent , cssContent }){
    return useFetch({
        method : "PUT",
        resource : `pages/${idPage}`,
        body : { html_content : htlmContent , css_content : cssContent }
    })
}

export async function deletePage({idPage}){
    return useFetch({
        method : "DELETE",
        resource : `pages/${idPage}`
    })
}

