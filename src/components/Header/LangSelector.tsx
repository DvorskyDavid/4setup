import { useI18n } from '../../i18n'

export function LangSelector() {
  const { lang, setLang } = useI18n()
  return (
    <div className="lang-pill" role="group" aria-label="Language selector">
      <button
        className={`lang-pill-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        className={`lang-pill-btn ${lang === 'cz' ? 'active' : ''}`}
        onClick={() => setLang('cz')}
        aria-pressed={lang === 'cz'}
      >
        CZ
      </button>
    </div>
  )
}

