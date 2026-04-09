import { Link } from 'react-router-dom';
import { conflicts } from '../data/conflicts.js';

function Dashboard() {
  return (
    <section className="page page--padded">
      <header className="page__header">
        <h1>Global Conflict Dashboard</h1>
        <p>
          Explore major ongoing conflicts, understand their causes, and see how they impact
          civilians and the world.
        </p>
      </header>

      <div className="grid grid--conflicts">
        {conflicts.map((conflict) => (
          <Link
            key={conflict.id}
            to={`/conflict/${conflict.id}`}
            className="card card--conflict"
          >
            <div className={`conflict-pill conflict-pill--${conflict.intensity}`}>
              {conflict.intensity.toUpperCase()}
            </div>
            <h2>{conflict.name}</h2>
            <p className="card__meta">
              {conflict.region} • Since {conflict.startYear}
            </p>
            <p className="card__summary">{conflict.summary}</p>
            <p className="card__cta">View timeline &amp; impact →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;

