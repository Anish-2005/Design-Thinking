const ProcessSection = ({ steps, quoteText, quoteAuthor, sectionRef }) => {
  return (
    <section ref={sectionRef} id="design-thinking" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-kicker">The process</p>
          <h2 className="section-title">A structured path from insight to action</h2>
          <p className="section-subtitle">
            The project follows a disciplined, human-centered workflow that balances empathy, creativity, and
            experimentation.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <article key={step.title} className="process-card" data-reveal style={{ '--delay': `${index * 0.08}s` }}>
              <div className="process-index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="quote-card" data-reveal style={{ '--delay': '0.15s' }}>
          <p>{quoteText}</p>
          <span>- {quoteAuthor}</span>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
