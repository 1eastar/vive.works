/* External */
import React from 'react'
import { Helmet } from 'react-helmet'

/* Internal */
import { useSiteMetadata } from '@hooks/useSiteMetadata.hook'

const SITE_TITLE = 'Vive works'

interface SeoProps {
	lang?: string
	title?: string
	description?: string
	author?: string
	date?: string
	image?: string
	slug?: string
	children?: React.ReactNode
}

// NOTE: pages가 아닌 template에는 아직 HEAD api를 사용할 수 없어서 react-helmet으로 대체
function Seo({
	lang = 'ko',
	title,
	description,
	author,
	date  = '',
	image,
	slug,
	children,
}: SeoProps) {
	const { site: { siteMetadata: _siteMetadata } } = useSiteMetadata()

	const _description = description ?? _siteMetadata.description
	const _title = title ??  _siteMetadata.title
	const _author = author ?? _siteMetadata.author
	const _image = image ?? _siteMetadata.image
	const _slug = slug ?? ''
	const _url = _siteMetadata.siteUrl + _slug

	return (
		<Helmet
			defaultTitle={SITE_TITLE}
			titleTemplate={`%s | ${SITE_TITLE}`}
		>
			<html lang={lang} />
			{ title && <title>{ title }</title> }
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
		</Helmet>
	)
}

export default Seo
