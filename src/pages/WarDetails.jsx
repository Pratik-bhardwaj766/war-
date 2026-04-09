import { useParams, Link } from 'react-router-dom';
import { conflicts } from '../data/conflicts.js';

function WarDetails() {
  const { id } = useParams();
  const conflict = conflicts.find((c) => c.id === id);

  if (!conflict) {
    return (
      <section className="page page--padded">
        <header className="page__header">
          <h1>Conflict not found</h1>
          <p>This conflict is not in our current dataset.</p>
          <Link to="/" className="btn">
            Back to dashboard
          </Link>
        </header>
      </section>
    );
  }

  return (
    <section className="page page--padded page--two-column">
      <div>
        <header className="page__header">
          <p className="page__eyebrow">Conflict profile</p>
          <h1>{conflict.name}</h1>
          <p className="page__meta">
            {conflict.region} • {conflict.countries.join(', ')} • Since {conflict.startYear}
          </p>
        </header>

        <article className="section-block">
          <h2>Overview</h2>
          <p>{conflict.summary}</p>
        </article>

        <article className="section-block">
          <h2>Root causes</h2>
          <ul className="list">
            {conflict.causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </article>

        <article className="section-block">
          <h2>Timeline (simplified)</h2>
          <ol className="list list--ordered">
            {conflict.timeline.map((event) => (
              <li key={event}>{event}</li>
            ))}
          </ol>
        </article>
      </div>

      <aside className="sidebar">
        <section className="section-block section-block--accent">
          <h2>Humanitarian impact</h2>
          <ul className="list">
            {conflict.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section-block">
          <h2>Related organizations</h2>
          <ul className="list list--links">
            {conflict.humanitarianOrgs.map((org) => (
              <li key={org.url}>
                <a href={org.url} target="_blank" rel="noreferrer">
                  {org.name}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/donate" className="btn btn--ghost">
            Explore donation options
          </Link>
        </section>

        <section className="section-block section-block--bordered">
          <h2>Need a simpler explanation?</h2>
          <p>
            Use the AI explainer to get child-friendly, plain-language summaries of this conflict.
          </p>
          <Link to={`/chat?conflict=${conflict.id}`} className="btn btn--primary">
            Open AI explainer
          </Link>
        </section>
      </aside>
    </section>
  );
}

export default WarDetails;

