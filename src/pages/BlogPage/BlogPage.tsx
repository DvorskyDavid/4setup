import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { blogPosts } from '../../data/blogPosts'
import './blog.css'

export function BlogPage() {
  const { lang, t } = useI18n()

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-grid-bg"></div>
        <div className="blog-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h1 className="blog-hero-title">{t('page.blog.title')}</h1>
          <p className="blog-hero-subtitle">{t('page.blog.desc')}</p>
          <div className="cyber-divider"></div>
        </div>
      </section>

      <section className="blog-posts-section">
        <div className="blog-posts-grid">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
              <div className="blog-card-inner">
                <div className="blog-card-corner tl"></div>
                <div className="blog-card-corner tr"></div>
                <div className="blog-card-corner bl"></div>
                <div className="blog-card-corner br"></div>
                
                {post.image ? (
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title[lang]} />
                  </div>
                ) : (
                  <div className="blog-card-image blog-card-image-placeholder">
                    <div className="placeholder-grid"></div>
                    <span className="placeholder-icon">✦</span>
                  </div>
                )}
                
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category[lang]}</span>
                    <span className="blog-card-date">{post.date}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title[lang]}</h2>
                  <p className="blog-card-excerpt">{post.excerpt[lang]}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-readtime">{post.readTime[lang]}</span>
                    <span className="blog-card-arrow">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

