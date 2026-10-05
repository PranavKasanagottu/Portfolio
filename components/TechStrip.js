export default function TechStrip({ items }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <div className="strip" aria-label="Technologies I use">
      {rows.map((row, i) => (
        <div key={i} className={`strip-row ${i ? "rev" : ""}`}>
          <div className="strip-track">
            {[...row, ...row, ...row, ...row].map((t, j) => (
              <span key={j} className="chip" aria-hidden={j >= row.length}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}