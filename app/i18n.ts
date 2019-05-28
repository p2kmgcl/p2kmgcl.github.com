const DEFAULT_LANGUAGE_ID = 'en';

const LANGUAGES = {
  en: 'English',
  es: 'Español',
};

const getLanguageId = (preferredLanguageId: string = ''): string => {
  if (preferredLanguageId in LANGUAGES) {
    return preferredLanguageId;
  } else {
    const languageIds = [navigator.language, ...(navigator.languages || [])];

    for (const languageId of languageIds) {
      if (languageId in LANGUAGES) {
        return languageId;
      } else {
        const [shortLanguageId] = languageId.split('-');

        if (shortLanguageId in LANGUAGES) {
          return shortLanguageId;
        }
      }
    }
  }

  return DEFAULT_LANGUAGE_ID;
};

const getLanguageKeys = async (
  preferredLanguageId: string = '',
): Promise<{ [key: string]: string }> => {
  const languageId = getLanguageId(preferredLanguageId);
  const response = await fetch(`/i18n/${languageId}.json`);
  const languageKeys = await response.json();
  return languageKeys;
};

export { getLanguageId, getLanguageKeys };
