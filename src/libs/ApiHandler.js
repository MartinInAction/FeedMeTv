const OPEN_SUBS_API_URL = 'https://rest.opensubtitles.org'
// const QUOTE_API_URL = 'http://api.quodb.com'
const QUOTE_API_URL = 'https://medivia-api.herokuapp.com'
const QUOTE_STATIC_URL = 'http://static.quodb.com/Covers'
export let searchSubtitle = (query: string) => {
  return sendRequest(OPEN_SUBS_API_URL, `/search/query-${encodeURI(query)}`, {method: 'GET'})
}

export let searchQuote = (query: string) => {
  return sendRequest(QUOTE_API_URL,`/feedmetv/${encodeURI(query)}`, {method: 'GET'})
    .then((res) => {
      let {docs} = res
      docs.reduce((a, b) => {
        if (a.title === b.title) {
          if (!a.moreQuotes) a.moreQuotes = [b.phrase]
          else {
            a.moreQuotes = [...a.moreQuotes, b.phrase]
          }
          return a
        }
        return b
      })
      docs = uniqueArray(docs, (x) => x.title)
      return docs.map((movie) => {
        return {...movie, image: !movie.image ? undefined : `${QUOTE_STATIC_URL}/${movie.image}`}
      })
    })
}


export let uniqueArray = (array: Object[], keyFn: (arg: *) => ?string): Array<Object> => {
  let mySet = new Set()
  if (!array) return []
  return array.filter((x) => {
    let key = keyFn(x)
    if (!key) return false
    let isNew = !mySet.has(key)
    if (isNew) mySet.add(key)
    return isNew
  }).reverse()
}

export let sendRequest = (apiUrl: string, endpoint: string, options: Object) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'X-User-Agent': 'TemporaryUserAgent'
  })

  return fetch(`${apiUrl}${endpoint}`, {headers, ...options})
    .then(res => (res.json ? res.json() : res))
    .catch((error) => {
      return Promise.reject(error)
    })
}
