/* External */
import { memo } from 'react';

/* Internal */
import { BaseTemplateProps } from '@commons/types/BaseTemplateType';
import Seo from '@components/Seo';
import Layout from '@components/Layout';

export type PageContext = {
    html: string
    title: string
    description: string
    author: string
    date: string
    image: string
}
    
function PostTemplate(props: BaseTemplateProps<PageContext>) {
    return (
        <Layout>
            <code>
                <pre>{JSON.stringify(props, null, 4)}</pre>
            </code>
        </Layout>
    )
}
    
PostTemplate.displayName = 'PostTemplate'

export default memo(PostTemplate);
