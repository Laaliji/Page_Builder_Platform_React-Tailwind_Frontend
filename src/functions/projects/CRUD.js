import { api_url } from "@/constant/global";
import useFetch from "@/hooks/useFetch";

export async function getProjects({ idUser }) {
  const response = await fetch(`${api_url}/users/${idUser}/projects`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return (await response.json()).data;
}

export async function deleteProject({ idProject, body }) {
  const response = await fetch(`${api_url}/projects/${idProject}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return (await response.json()).STATE;
}

export async function getProject({ id }) {
  return useFetch({ method: "GET", resource: `projects/${id}` });
}

export async function updateProject({ id, body, isFormData }) {
  return useFetch({
    method: "POST",
    body,
    isFormData,
    resource: `projects/update/${id}`,
  });
}

export async function createProject({ body, isFormData }) {
  return useFetch({
    method: "POST",
    body,
    isFormData,
    resource: `projects/create`,
  });
}
