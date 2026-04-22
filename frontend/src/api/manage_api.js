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
