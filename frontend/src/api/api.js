const PRIMARY_URL = import.meta.env.VITE_API_URL;
const BACKUP_URL = import.meta.env.VITE_BACKUP_URL;

let api = BACKUP_URL;

try {
  const response = await fetch(`${PRIMARY_URL}/health/`, {
    signal: AbortSignal.timeout(2000),
  });

  if (response.ok) {
    api = PRIMARY_URL;
  }
} catch {
  api = BACKUP_URL;
} finally {
  console.log(api);
}

export { api };
