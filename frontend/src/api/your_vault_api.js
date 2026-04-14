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
