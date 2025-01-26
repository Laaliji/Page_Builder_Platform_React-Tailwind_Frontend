import useFetch from "@/hooks/useFetch";

export async function getPagesShared({id}){
    return useFetch({
        method : "GET",
        resource : `pages/shared/${id}`
    })
}