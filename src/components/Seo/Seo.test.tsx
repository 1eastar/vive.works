/* eslint-disable quotes */
/* External */
import { defaultMetaData } from '@commons/constants/Seo.constant'
import { render, cleanup, waitFor } from '@testing-library/react'

/* Internal */
import { SeoProps } from './Seo'

afterEach(cleanup)

describe('<Seo/>', () => {
  test('[snapshot] 성공적으로 렌더링된다.', () => {
    const { result } = renderSeo()

    expect(result).toMatchSnapshot()
  })

  test('props가 없으면 siteMetadata를 이용해 meta tag를 구성한다.', async () => {
    const {
      Title,
      MetaDescription,
      MetaAuthor,
      MetaDate,
      OG_Title,
      OG_Description,
      OG_Site_Name,
      OG_Image,
      OG_Type,
      OG_Url,
    } = renderSeo()

    await waitFor(() => expect(Title().text).toBe('Vive works'))

    await waitFor(() => expect(MetaDescription().getAttribute('content')).toBe('개발자 강동진의 기록들'))
    await waitFor(() => expect(MetaAuthor().getAttribute('content')).toBe('Vive Kang'))
    await waitFor(() => expect(MetaDate().getAttribute('content')).toBe(''))

    await waitFor(() => expect(OG_Title().getAttribute('content')).toBe('Vive works'))
    await waitFor(() => expect(OG_Description().getAttribute('content')).toBe('개발자 강동진의 기록들'))
    await waitFor(() => expect(OG_Site_Name().getAttribute('content')).toBe('vive works'))
    await waitFor(() => expect(OG_Image().getAttribute('content')).toBe('https://vive.works/og_image.jpeg'))
    await waitFor(() => expect(OG_Type().getAttribute('content')).toBe('website'))
    await waitFor(() => expect(OG_Url().getAttribute('content')).toBe('https://vive.works'))
  })

  test('props를 넘겨주면 props를 이용해 meta tag를 구성한다.', async () => {
    const props = {
      title: 'mockTitle',
      description: 'mockDescription',
      author: 'mockAuthor',
      date: '2222-12-22',
      image: 'https://mockImageUrl.com',
      slug: '/mockSlug',
    }

    const {
      Title,
      MetaDescription,
      MetaAuthor,
      MetaDate,
      OG_Title,
      OG_Description,
      OG_Site_Name,
      OG_Image,
      OG_Type,
      OG_Url,
    } = renderSeo(props)

    await waitFor(() => expect(Title().text).toBe('mockTitle | Vive works'))

    await waitFor(() => expect(MetaDescription().getAttribute('content')).toBe('mockDescription'))
    await waitFor(() => expect(MetaAuthor().getAttribute('content')).toBe('mockAuthor'))
    await waitFor(() => expect(MetaDate().getAttribute('content')).toBe('2222-12-22'))

    await waitFor(() => expect(OG_Title().getAttribute('content')).toBe('mockTitle | Vive works'))
    await waitFor(() => expect(OG_Description().getAttribute('content')).toBe('mockDescription'))
    await waitFor(() => expect(OG_Site_Name().getAttribute('content')).toBe('vive works'))
    await waitFor(() => expect(OG_Image().getAttribute('content')).toBe('https://mockImageUrl.com'))
    await waitFor(() => expect(OG_Type().getAttribute('content')).toBe('website'))
    await waitFor(() => expect(OG_Url().getAttribute('content')).toBe('https://vive.works/mockSlug'))
  })
})


/* Helper function */
function renderSeo(props?: SeoProps) {
  const result = render(<MockSeo {...props}/>, { container: document.head })

  const Title = () => document.querySelector("title")

  const MetaDescription = () => document.querySelector("meta[name='description']")
  const MetaAuthor = () => document.querySelector("meta[name='author']")
  const MetaDate = () => document.querySelector("meta[name='date']")

  const OG_Title = () => document.querySelector("meta[property='og:title']")
  const OG_Description = () => document.querySelector("meta[property='og:description']")
  const OG_Site_Name = () => document.querySelector("meta[property='og:site_name']")
  const OG_Image = () => document.querySelector("meta[property='og:image']")
  const OG_Type = () => document.querySelector("meta[property='og:type']")
  const OG_Url = () => document.querySelector("meta[property='og:url']")

  return {
    result,
    Title,
    MetaDescription,
    MetaAuthor,
    MetaDate,
    OG_Title,
    OG_Description,
    OG_Site_Name,
    OG_Image,
    OG_Type,
    OG_Url,
  }
}

/* 기존 Seo 컴포넌트는 하위에 html tag를 가지고 있어서 테스트가 불가능. html tag만 제거한 임시 컴포넌트 정의. */
function MockSeo({
	title,
	description,
	author,
	date  = '',
	image,
	slug,
	children,
}: SeoProps) {
	const _title = title ? `${title} | ${defaultMetaData.TITLE}` : defaultMetaData.TITLE
	const _description = description ?? defaultMetaData.DESCRIPTION
	const _author = author ?? defaultMetaData.AUTHOR
	const _image = image ? image : defaultMetaData.IMAGE
	const _slug = slug ?? ''
	const _url = defaultMetaData.SITEURL + _slug

	return (
		<>
			<title>{ _title }</title>
			<meta name='description' content={_description} />
			<meta name='author' content={_author} />
			<meta name='date' content={date} />
			<meta property='og:title' content={_title} />
			<meta property='og:description' content={_description} />
      <meta property='og:site_name' content='vive works' />
      <meta property='og:image' content={_image} />
      <meta property='og:type' content='website' />
			<meta property='og:url' content={_url}/>
			{children}
		</>
	)
}
