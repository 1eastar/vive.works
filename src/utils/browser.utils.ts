export const isBrowser = typeof window !== 'undefined'

/**
 * 
 * @param query query string
 * @param key The `key` of the value you want to get from `query`
 * @returns value of the `key` or `undefined`
 */
export function getValueFromQueryString(query: string, key: string): string | undefined {
  if (query && query.includes('=')) {
    const paramObj = new URLSearchParams(query)

    return decodeURIComponent(paramObj.get(key))
  }

  return undefined
}
