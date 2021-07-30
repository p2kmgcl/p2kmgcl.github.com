export type Theme = {
  /* Main structure */
  html: string;
  body: string;
  wrapper: string;
  content: string;

  /* DOM Elements */
  article: string;
  figure: string;
  footer: string;
  header: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  image: string;
  paragraph: string;
  picture: string;
  section: string;
  strong: string;
  emoji: string;

  /* Custom Elements */
  anchor: string;
  entryList: string;
  entryListItem: string;
  rawDOM: string;
  tagList: string;
  tagListItem: string;
  time: string;

  /* Main menu */
  mainMenu: string;
  mainMenuNavigation: string;

  /* Footer */
  footerNavigation: string;

  /* Pages */
  notFoundPage: string;
  indexPage: string;
  teseraIndexPage: string;
  teseraTagPage: string;
  teseraEntryPage: string;
  linksPage: string;

  /* Special thing */
  entryContent: string;
  entryFooterNavigation: string;
};

declare module '*.theme.module.scss' {
  export default {} as Theme;
}
