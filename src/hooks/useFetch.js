import { api_url } from "@/constant/global";

const useFetch = async ({
  method,
  resource,
  body = null,
  isFormData = false,
}) => {
  const headers = isFormData ? {} : { "Content-Type": "application/json" };

  const requestOptions = {
    method,
    headers,
    body: isFormData ? body : body && JSON.stringify(body),
  };

  const response = await fetch(`${api_url}/${resource}`, requestOptions);
  return await response.json();
};

export default useFetch
