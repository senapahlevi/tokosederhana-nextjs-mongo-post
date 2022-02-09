export const fetcher = (...args) => {
  return fetch(...args).then(async (res) => {
    let payload;
    try {
      if (res.status === 204) return null; //does no have body
      payload = await res.json();
    } catch (e) {}
    if (res.ok) {
      return payload;
    } else {
      return Promise.reject(payload.error || new Error("Something went wrong"));
    }
  });
};
