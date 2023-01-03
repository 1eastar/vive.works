export const isBrowser = typeof window !== "undefined"

export function getQueryParamValue(query?: string, key?: string): string | undefined {
  if (query) {
    const queryParams = query
    if (queryParams) {
      const paramObj = new URLSearchParams(queryParams)

      return decodeURIComponent(paramObj.get(key))
    }
  }

  return undefined
}
