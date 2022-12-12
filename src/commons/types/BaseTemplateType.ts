/* External */
import { PageProps } from 'gatsby';

export type BaseTemplateProps<T> = PageProps<object, T> & {
  pageContext: T;
};
