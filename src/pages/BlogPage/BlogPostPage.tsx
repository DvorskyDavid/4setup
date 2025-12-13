import { useParams, Link, Navigate } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { getPostBySlug } from '../../data/blogPosts'
import './blog.css'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useI18n()
  
  const post = slug ? getPostBySlug(slug) : undefined
  
  if (!post) {
    return <Navigate to="/blog" replace />
  }

  // Simple markdown-like parsing for headers and bold text
  const parseContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let currentParagraph: string[] = []
    let listItems: string[] = []
    let listType: 'ul' | 'ol' | null = null

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ')
        elements.push(
          <p key={elements.length} dangerouslySetInnerHTML={{ 
            __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        )
        currentParagraph = []
      }
    }

    const flushList = () => {
      if (listItems.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul'
        elements.push(
          <ListTag key={elements.length}>
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ 
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }} />
            ))}
          </ListTag>
        )
        listItems = []
        listType = null
      }
    }

    lines.forEach((line) => {
      const trimmed = line.trim()
      
      if (trimmed.startsWith('## ')) {
        flushParagraph()
        flushList()
        elements.push(<h2 key={elements.length}>{trimmed.slice(3)}</h2>)
      } else if (trimmed.startsWith('### ')) {
        flushParagraph()
        flushList()
        elements.push(<h3 key={elements.length}>{trimmed.slice(4)}</h3>)
      } else if (trimmed.match(/^[0-9]+\.\s/)) {
        flushParagraph()
        if (listType !== 'ol') {
          flushList()
          listType = 'ol'
        }
        listItems.push(trimmed.replace(/^[0-9]+\.\s/, ''))
      } else if (trimmed.startsWith('- ')) {
        flushParagraph()
        if (listType !== 'ul') {
          flushList()
          listType = 'ul'
        }
        listItems.push(trimmed.slice(2))
      } else if (trimmed === '') {
        flushParagraph()
        flushList()
      } else {
        currentParagraph.push(trimmed)
      }
    })

    flushParagraph()
    flushList()

    return elements
  }

  return (
    <main className="blog-post-page">
      <article className="blog-post">
        <header className="blog-post-header">
          <Link to="/blog" className="blog-back-link">
            <span className="back-arrow">←</span>
            <span>{t('blog.backToList')}</span>
          </Link>
          
          <div className="blog-post-meta">
            <span className="blog-post-category">{post.category[lang]}</span>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-readtime">{post.readTime[lang]}</span>
          </div>
          
          <h1 className="blog-post-title">{post.title[lang]}</h1>
          <div className="cyber-divider"></div>
        </header>

        <div className="blog-post-content">
          {parseContent(post.content[lang])}
        </div>

        <footer className="blog-post-footer">
          <div className="blog-cta-box">
            <div className="cyber-corner top-left"></div>
            <div className="cyber-corner top-right"></div>
            <div className="cyber-corner bottom-left"></div>
            <div className="cyber-corner bottom-right"></div>
            <h3 className="blog-cta-title">{t('blog.ctaTitle')}</h3>
            <Link to="/contact" className="btn primary blog-cta-btn">
              {t('hero.cta')}
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}

