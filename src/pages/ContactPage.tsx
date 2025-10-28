import { useT } from '../i18n'

export function ContactPage() {
  const t = useT()
  return (
    <main className="page">
      <h2>{t('page.contact.title')}</h2>
      <div className="contact-info">
        <p><strong>{t('page.contact.phone')}</strong> +420 608 689 304</p>
        <p><strong>{t('page.contact.email')}</strong> <a href="mailto:info@4setup.cz">info@4setup.cz</a></p>
        <p><strong>Instagram:</strong> <a href="https://www.instagram.com/4setup.cz" target="_blank" rel="noreferrer">@4setup.cz</a></p>
        
        <div style={{ marginTop: '40px' }}>
          <p><strong>4setup s.r.o.</strong></p>
          <p>IČO: 23616491</p>
          <p>Varšavská 715/36</p>
          <p>120 00</p>
          <p>Praha 2</p>
        </div>
      </div>
    </main>
  )
}

