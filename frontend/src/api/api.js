const PRIMARY_URL = import.meta.env.VITE_API_URL;
const BACKUP_URL = import.meta.env.VITE_BACKUP_URL;

let api = PRIMARY_URL;

const timeout_id = setTimeout(() => {
  api = BACKUP_URL;
}, 2000);

try {
  const response = await fetch(`${PRIMARY_URL}/health/`);

  if (response.ok) {
    clearTimeout(timeout_id);
  } else {
    api = BACKUP_URL;
    clearTimeout(timeout_id);
  }
} catch {
  api = BACKUP_URL;
  clearTimeout(timeout_id);
}

export { api };
