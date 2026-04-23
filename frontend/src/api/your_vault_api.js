const api = import.meta.env.VITE_API_URL;

export const fetch_vault = async () => {
  try {
    const response = await fetch(api + "/projects/my/", {
      credentials: "include",
    });
    const data = await response.json();
    return data.message;

    console.log(data);
  } catch (err) {
    throw err;
  }
};

export const fetch_following = async () => {
  try {
    const response = await fetch(api + "/projects/following/", {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data.message;
    }
    return [];
  } catch (err) {
    throw err;
  }
};

export const create_vault = async (name, desc, is_public) => {
  try {
    const response = await fetch(api + "/projects/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        is_public: is_public,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Couldnt create Project");
      return;
    }
  } catch (error) {
    throw error;
  }
};
