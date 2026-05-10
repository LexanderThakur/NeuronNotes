const api = import.meta.env.VITE_API_URL;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}

export async function fetch_project(projectId) {
  const response = await fetch(api + `/projects/manage/${projectId}/`, {
    credentials: "include",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return json.message;
}
