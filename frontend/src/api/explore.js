const api = import.meta.env.VITE_API_URL;

// export const get_to_follow = async () => {
//   try {
//     const response = await fetch(api + "/projects/", {
//       method: "GET",
//       credentials: "include",
//     });

//     const data = await response.json();
//     console.log(data);
//     if (!response.ok) {
//       console.log(data);
//       return [];
//     }
//     return data.message;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

export const follow = async (id) => {
  try {
    const response = await fetch(api + "/projects/" + id + "/follow/", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const get_to_follow = async (page = 1) => {
  try {
    const response = await fetch(api + `/projects/explore?page=${page}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.log(data);
      return [];
    }
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
