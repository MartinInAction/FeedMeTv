const OPEN_SUBS_API_URL = 'https://rest.opensubtitles.org'
const QUOTE_API_URL = 'http://api.quodb.com'
const QUOTE_STATIC_URL = 'http://static.quodb.com/Covers'
export let searchSubtitle = (query: string) => {
  return sendRequest(OPEN_SUBS_API_URL, `/search/query-${encodeURI(query)}`, {method: 'GET'})
}

export let searchQuote = (query: string) => {
  return sendRequest(QUOTE_API_URL,`/search/${encodeURI(query)}`, {method: 'GET'})
    .then((res) => {
      let {docs} = res
      return docs.map((movie) => ({...movie, image: !movie.image ? undefined : `${QUOTE_STATIC_URL}/${movie.image}`}))
    })
}

export let sendRequest = (apiUrl: string, endpoint: string, options: Object) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'X-User-Agent': 'TemporaryUserAgent'
  })

  return fetch(`${apiUrl}${endpoint}`, {headers, ...options})
    .then(res => (res.json ? res.json() : res))
    .catch(() => {})
}
