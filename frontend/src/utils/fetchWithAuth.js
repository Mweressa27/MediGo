export default function fetchWithAuth(url, opts={}) {
  const token = localStorage.getItem('token');
  return fetch(url, {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
