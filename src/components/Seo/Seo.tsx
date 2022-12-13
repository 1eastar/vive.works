/* External */
import React from 'react'

/* Internal */
import { useSiteMetadata } from '@hooks/useSiteMetadata.hook'

interface SeoProps {
	lang?: string
	title?: string
	description?: string
	author?: string
	date?: string
	image?: string
	children?: React.ReactNode
}

function Seo({
	lang = 'ko',
	title,
	description,
	author,
	date  = '',
	image,
	children,
}: SeoProps) {
	const { site: { siteMetadata: _siteMetadata } } = useSiteMetadata()

	const _description = description || _siteMetadata.description
	const _title = title ||  _siteMetadata.title
	const _author = author || _siteMetadata.author
	const _image = image || _siteMetadata.image

	return (
		<>
			<html lang={lang} />
			<title>{_title}</title>
			<meta name='description' content={_description} />
			<meta name='author' content={_author} />
			<meta name='date' content={date} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={_description} />
      <meta property="og:site_name" content="vive's log" />
      <meta property="og:image" content={_image} />
      <meta property="og:type" content="website" />
			{children}
		</>
	)
}

export default Seo
