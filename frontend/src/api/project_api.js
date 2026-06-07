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

export async function total_projects() {
  try {
    const response = await fetch(api + "/projects/totalProjects/", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get total projects");
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    throw error;
  }
}
export async function total_following() {
  try {
    const response = await fetch(api + "/projects/totalFollowing/", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get total projects");
    }

    const data = await response.json();
    console.log(data);
    return data.message;
  } catch (error) {
    throw error;
  }
}
