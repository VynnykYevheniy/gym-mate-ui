import i18n from 'i18next';
import translationEN from '../locales/en.json';
import translationUK from '../locales/uk.json';
import translationRU from '../locales/ru.json';

i18n.init({
	interpolation: { escapeValue: false }, // React already does escaping
	lng: 'en', // default language
	resources: {
		en: { translation: translationEN },
		uk: { translation: translationUK },
		ru: { translation: translationRU },
	},
});

export default i18n;
