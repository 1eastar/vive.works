import '@testing-library/jest-dom'

Object.defineProperty(window, 'location', {
  value: {
    origin: 'https://vive.works',
    href: 'https://vive.works/mockPathname?tag=mockTag&key1=value1&key2=value2',
    pathname: '/mockPathname',
    search: '?tag=mockTag&key1=value1&key2=value2',
  },
})