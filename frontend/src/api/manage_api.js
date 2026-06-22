const api = import.meta.env.VITE_API_URL;

export const get_note = async (note_id) => {
  try {
    const response = await fetch(api + "/notes/" + note_id + "/", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return { content: "null", name: "null" };
    }
    // setContent(data.message.content);
    // setTitle(data.message.name);

    return { content: data.message.content, name: data.message.name };
  } catch (error) {
    console.log(error);
    return { content: "null", name: "null" };
  }
};

export const create_note = async (id, folder_id = null) => {
  try {
    const response = await fetch(api + `/projects/${id}/notes/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Untitled",
        content: "",
        folder: folder_id,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
      return;
    }
  } catch (error) {
    throw error;
  }
};

export async function create_folder_api(projectId, name, parentId) {
  const response = await fetch(api + `/projects/${projectId}/folders/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

export const delete_note_api = async (note_id) => {
  try {
    const response = await fetch(api + `/notes/${note_id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();

      throw {
        status: response.status,
        message: data.message,
      };

      return;
    }
  } catch (error) {
    throw error;
  }
};

export const rename_folder_api = async (folder_id, new_name) => {
  try {
    const response = await fetch(api + `/folders/${folder_id}/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: new_name,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
  } catch (error) {
    throw error;
  }
};
export const delete_folder_api = async (folder_id) => {
  try {
    const response = await fetch(api + `/folders/${folder_id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
      return;
    }
  } catch (error) {
    throw error;
  }
};

export const save_note = async (note_id, title, content) => {
  try {
    const response = await fetch(`${api}/notes/${note_id}/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        content: content,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw {
        status: response.status,
        message: data.message,
      };
    }
  } catch (error) {
    throw error;
  }
};
