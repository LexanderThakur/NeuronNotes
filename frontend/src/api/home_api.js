const api = import.meta.env.VITE_API_URL;

export async function save_bookmark(name, link) {
  const response = await fetch(api + "/home/bookmarks/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create bookmark");
  }

  return await response.json();
}

export async function get_bookmarks() {
  const response = await fetch(api + "/home/bookmarks/", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }

  return await response.json();
}

export async function delete_bookmark(bookmarkId) {
  const response = await fetch(api + `/home/bookmarks/${bookmarkId}/`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete bookmark");
  }

  return await response.json();
}
