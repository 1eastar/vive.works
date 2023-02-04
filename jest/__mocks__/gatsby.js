/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* External */
const React = require('react')

/* Internal */
const { mockStaticQueryResult } = require('./gatsby.mock')

const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      })
  ),
  Slice: jest.fn().mockImplementation(
    ({ alias, ...rest }) =>
      React.createElement('div', {
        ...rest,
        'data-test-slice-alias': alias
      })
  ),
  useStaticQuery: jest.fn().mockReturnValue(mockStaticQueryResult),
  navigate: jest.fn().mockImplementation((pathname) => location.href = location.origin + pathname)
}