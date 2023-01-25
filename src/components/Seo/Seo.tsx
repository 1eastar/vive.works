/* External */
import React from 'react'

/* Internal */
import { defaultMetaData } from './Seo.constant'

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

	const _title = title ? `${title} | ${defaultMetaData.TITLE}` : defaultMetaData.TITLE
	const _description = description ?? defaultMetaData.DESCRIPTION
	const _author = author ?? defaultMetaData.AUTHOR
	const _image = image.length !== 0 ? image : defaultMetaData.IMAGE
	const _slug = slug ?? ''
	const _url = defaultMetaData.SITEURL + _slug

	return (
		<>
			<html lang={lang} />
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

export default Seo
