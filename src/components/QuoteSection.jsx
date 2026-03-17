const QuoteSection = ({ quote, label }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="quote-highlight" data-reveal>
          <div className="quote-mark">"</div>
          <p>{quote}</p>
          <span>{label}</span>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
