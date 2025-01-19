import useFetch from "@/hooks/useFetch";

export async function isUserConnectedWithGitHub({ idUser }){
    return useFetch({method:'GET' , resource:`user/checkGitHubConnection/${idUser}`})
}

export async function getUserInfo({ idUser }){
    return useFetch({method:'GET' , resource:`usersProfile/${idUser}`})
}

export async function updateUserProfile({ id, body , isFormData }){
    return useFetch({method:'POST' , body , isFormData , resource:`usersProfile/update/${id}`})
}

export async function updateUserProfilePassword({id , body}){
    return useFetch({method:'PUT' , body , resource:`usersProfile/${id}`})
}