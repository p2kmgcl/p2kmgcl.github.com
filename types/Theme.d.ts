export type Theme = {
  /* Main structure */
  html: string;
  body: string;
  wrapper: string;
  content: string;

  /* DOM Elements */
  article: string;
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
  snippetList: string;
  rawDOM: string;
  tagList: string;
  tagListItem: string;
  time: string;

  /* Main menu */
  mainMenu: string;
  mainMenuNavigation: string;

  /* Footer */
  footer: string;
  footerNavigation: string;

  /* Pages */
  notFoundPage: string;
  indexPage: string;
  teseraIndexPage: string;
  teseraTagPage: string;
  teseraEntryPage: string;
  snippetIndexPage: string;
  snippetEntryPage: string;
  linksPage: string;

  /* Special thing */
  entryContent: string;
  snippetContent: string;
};

declare module '*.theme.module.scss' {
  export default {} as Theme;
}
