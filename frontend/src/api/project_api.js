const api = "http://localhost:8000";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}

export async function fetch_project(projectId) {
  const response = await fetch(api + `/projects/manage/${projectId}/`, {
    headers: authHeaders(),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return json.message;
}

export async function create_folder_api(projectId, name, parentId) {
  const response = await fetch(api + `/projects/${projectId}/folders/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      name,
      project: projectId,
      parent: parentId,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error("Folder creation failed");
  }

  return json;
}
