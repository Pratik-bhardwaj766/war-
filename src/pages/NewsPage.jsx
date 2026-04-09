import { useEffect, useState } from 'react';

const NEWS_API_URL =
  'https://newsapi.org/v2/everything?' +
  new URLSearchParams({
    q: 'war OR conflict OR humanitarian crisis',
    sortBy: 'publishedAt',
    language: 'en',
    pageSize: '12'
  }).toString();

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    if (!apiKey) {
      setStatus('error');
      setErrorMessage(
        'No News API key configured. Set VITE_NEWS_API_KEY in a .env file at the project root.'
      );
      return;
    }

    const controller = new AbortController();

    async function fetchNews() {
      try {
        setStatus('loading');
        const response = await fetch(NEWS_API_URL, {
          headers: {
            Authorization: apiKey
          },
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        setArticles(data.articles || []);
        setStatus('success');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setStatus('error');
        setErrorMessage(
          'Could not load news right now. This may be due to an invalid API key, rate limits, or connectivity issues.'
        );
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    fetchNews();

    return () => controller.abort();
  }, []);

  return (
    <section className="page page--padded">
      <header className="page__header">
        <h1>Latest Conflict News</h1>
        <p>
          Headlines from around the world related to wars, conflicts, and humanitarian crises.
          Articles come from the NewsAPI.org service.
        </p>
      </header>

      {status === 'loading' && <p>Loading latest news…</p>}

      {status === 'error' && (
        <div className="alert alert--error">
          <p>{errorMessage}</p>
          <p className="alert__hint">
            To enable live news, create a free account at{' '}
            <a href="https://newsapi.org" target="_blank" rel="noreferrer">
              NewsAPI.org
            </a>{' '}
            and set your API key as <code>VITE_NEWS_API_KEY</code> in a <code>.env</code> file.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="grid grid--news">
          {articles.map((article) => (
            <article key={article.url} className="card card--news">
              <div className="card__body">
                <p className="card__source">
                  {article.source?.name || 'Unknown source'} •{' '}
                  {new Date(article.publishedAt).toLocaleString()}
                </p>
                <h2>{article.title}</h2>
                {article.description && <p className="card__summary">{article.description}</p>}
              </div>
              <div className="card__footer">
                <a href={article.url} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  Read full article
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default NewsPage;

