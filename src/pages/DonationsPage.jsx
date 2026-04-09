import { conflicts } from '../data/conflicts.js';

const additionalOrgs = [
  {
    name: 'International Committee of the Red Cross (ICRC)',
    url: 'https://www.icrc.org',
    focus: 'Global conflict zones, medical care, missing persons, prisoners of war'
  },
  {
    name: 'Doctors Without Borders (MSF)',
    url: 'https://www.msf.org',
    focus: 'Emergency medical aid in conflict and disaster zones'
  },
  {
    name: 'UNHCR – The UN Refugee Agency',
    url: 'https://www.unhcr.org',
    focus: 'Protection and support for refugees and displaced people'
  },
  {
    name: 'International Rescue Committee (IRC)',
    url: 'https://www.rescue.org',
    focus: 'Humanitarian aid and long-term support in crisis-affected areas'
  }
];

function combinedOrgs() {
  const fromConflicts = conflicts.flatMap((c) => c.humanitarianOrgs || []);
  const unique = new Map();

  [...fromConflicts, ...additionalOrgs].forEach((org) => {
    if (!unique.has(org.url)) {
      unique.set(org.url, org);
    }
  });

  return Array.from(unique.values());
}

function DonationsPage() {
  const orgs = combinedOrgs();

  return (
    <section className="page page--padded">
      <header className="page__header">
        <h1>Support Humanitarian Organizations</h1>
        <p>
          The organizations below operate in or around conflict zones, helping civilians with
          food, shelter, medical care, and legal protection. Always do your own research before
          donating.
        </p>
      </header>

      <div className="grid grid--donations">
        {orgs.map((org) => (
          <article key={org.url} className="card card--donation">
            <h2>{org.name}</h2>
            {org.focus && <p className="card__summary">{org.focus}</p>}
            <a href={org.url} target="_blank" rel="noreferrer" className="btn btn--primary">
              Visit website
            </a>
          </article>
        ))}
      </div>

      <section className="section-block section-block--bordered">
        <h2>Responsible giving</h2>
        <ul className="list">
          <li>Verify the organization through trusted charity evaluators where available.</li>
          <li>Prefer direct donations through official websites over unfamiliar links.</li>
          <li>
            Consider supporting long-term programs (healthcare, education, livelihood) in addition
            to emergency relief.
          </li>
        </ul>
      </section>
    </section>
  );
}

export default DonationsPage;

