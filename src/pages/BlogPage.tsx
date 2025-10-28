import { useT } from '../i18n'

export function BlogPage() {
  const t = useT()
  return (
    <main className="page">
      <h2>{t('page.blog.title')}</h2>
      <p>{t('page.blog.desc')}</p>
    </main>
  )
}

