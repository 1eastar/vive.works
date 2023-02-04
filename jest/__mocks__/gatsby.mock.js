export const mockStaticQueryResult = {
  site: {
    siteMetadata: {
      title: 'Vive works',
      description: '개발자 강동진의 기록들',
      author: 'Vive Kang',
      siteUrl: 'https://vive.works',
      image: 'https://vive.works/og_image.jpeg',
    },
  },
  allMdx: {
    nodes: [
      {
        body: 'no titles',
        frontmatter: { slug: '/mockSlug1', tags: ['tag1', 'tag2'] },
      },
      {
        body: 'only one title\n# first title\nfirst content',
        frontmatter: { slug: '/mockSlug2', tags: ['tag2', 'tag3'] },
      },
      {
        body: 'several titles\n# first title\nfirst content\n## second title\nsecond content\n### third title\nthird content\n## fourth title\nfourth content\n# fifth title\nfifth content',
        frontmatter: { slug: '/mockSlug3', tags: ['tag2', 'tag3', 'tag4'] },
      },
      {
        body: 'several same titles\n# first title\nfirst content\n# first title\nfirst content\n# first title\nfirst content\n# first title\nfirst content',
        frontmatter: { slug: '/mockSlug4', tags: ['tag5'] },
      },
      {
        body: 'duplicated slug',
        frontmatter: { slug: '/mockSlug2', tags: [] },
      },
    ],
  },
}
