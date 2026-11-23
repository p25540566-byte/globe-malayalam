
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  limit
} from 'firebase/firestore';

import { db } from './firebase';

const categories = [
  'പ്രധാന വാർത്തകൾ',
  'ലോകം',
  'ഇന്ത്യ',
  'കേരളം',
  'രാഷ്ട്രീയം',
  'സാമ്പത്തികം',
  'ശാസ്ത്രം',
  'സാങ്കേതികവിദ്യ',
  'പരിസ്ഥിതി',
  'വിശകലനം'
];

function App() {
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] =
    useState('പ്രധാന വാർത്തകൾ');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const newsQuery = query(
          collection(db, 'news'),
          where('published', '==', true),
          limit(30)
        );

        const snapshot = await getDocs(newsQuery);

        const articles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setNews(articles);
      } catch (error) {
        console.error('News loading error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const filteredNews = news.filter(article => {
    const matchesCategory =
      activeCategory === 'പ്രധാന വാർത്തകൾ' ||
      article.category === activeCategory;

    const text = (
      (article.titleMl || '') +
      ' ' +
      (article.title || '')
    ).toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="website">

      {/* Top Bar */}
      <div className="topbar">
        <span>GLOBE MALAYALAM</span>
        <span>ലോകത്തെ അറിയുക, മലയാളത്തിൽ.</span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="logo">🌍</div>
          <div>
            <h1>GLOBE <span>MALAYALAM</span></h1>
            <p>GLOBAL NEWS • MALAYALAM</p>
          </div>
        </div>

        <div className="header-right">
          <span>INDEPENDENT JOURNALISM</span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        {categories.map(category => (
          <button
            key={category}
            className={
              activeCategory === category ? 'active' : ''
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Breaking News */}
      <div className="breaking">
        <strong>BREAKING NEWS</strong>
        <span>പുതിയ വാർത്തകൾക്കായി Globe Malayalam പിന്തുടരുക.</span>
      </div>

      {/* Advertisement */}
      <div className="advertisement">
        <small>ADVERTISEMENT</small>
        <p>Advertisement Space</p>
      </div>

      {/* Main Content */}
      <main className="container">

        <section className="section-heading">
          <h2>{activeCategory}</h2>
          <span>GLOBE MALAYALAM NEWS</span>
        </section>

        {/* Search */}
        <div className="search-box">
          <input
            type="search"
            placeholder="വാർത്തകൾ തിരയുക..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* News */}
        {loading ? (
          <p className="message">വാർത്തകൾ ലോഡ് ചെയ്യുന്നു...</p>
        ) : filteredNews.length > 0 ? (

          <div className="news-grid">
            {filteredNews.map(article => (
              <article className="news-card" key={article.id}>

                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.titleMl || article.title}
                  />
                )}

                <div className="news-info">
                  <span className="category-label">
                    {article.category}
                  </span>

                  <h3>
                    {article.titleMl || article.title}
                  </h3>

                  <p>
                    {article.content?.slice(0, 180)}
                  </p>

                  <small>GLOBE MALAYALAM</small>
                </div>

              </article>
            ))}
          </div>

        ) : (
          <div className="empty-news">
            <span>🌍</span>
            <h3>വാർത്തകൾ ഉടൻ ലഭ്യമാകും</h3>
            <p>
              പ്രസിദ്ധീകരിച്ച വാർത്തകൾ ഇവിടെ കാണാം.
            </p>
          </div>
        )}

        {/* Advertisement */}
        <div className="advertisement">
          <small>ADVERTISEMENT</small>
          <p>Advertisement Space</p>
        </div>

      </main>

      {/* Footer */}
      <footer className="footer">
        <h2>GLOBE MALAYALAM</h2>
        <p>ലോകത്തെ അറിയുക, മലയാളത്തിൽ.</p>
        <p>World News • India • Kerala • Science</p>
        <small>© 2026 Globe Malayalam</small>
      </footer>

    </div>
  );
}

export default App;
