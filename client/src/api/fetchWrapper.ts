export async function apiFetchWrapper<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${import.meta.env.VITE_BACKEND_API_URL}${endpoint}`;

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      let errorMessage = "Failed Request";
      try {
        const data = await res.json();
        if (data?.error) errorMessage = data.error;
      } catch (error) {
        console.log(error);
      }
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error(`API fetch error: `, error);
    throw error;
  }
}
