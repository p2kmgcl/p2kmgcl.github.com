export const THEMES: Record<string, () => Promise<unknown>> = {
  comic: () => import('./themes/comic.theme.module.scss'),
  simplicity: () => import('./themes/simplicity.theme.module.scss'),
};
