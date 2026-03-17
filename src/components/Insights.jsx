const Insights = ({ items }) => {
  return (
    <section className="section section-muted">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-kicker">Key insights</p>
          <h2 className="section-title">What the course reinforced</h2>
          <p className="section-subtitle">
            The project highlighted the habits and mindsets that move good ideas into outcomes.
          </p>
        </div>

        <div className="insight-grid">
          {items.map((insight, index) => (
            <article
              key={insight.title}
              className="insight-card"
              data-reveal
              style={{ '--delay': `${index * 0.08}s` }}
            >
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
