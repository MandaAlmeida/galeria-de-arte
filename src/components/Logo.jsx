export default function Logo() {
  return (
    <a href="#/" aria-label="Galeria de Arte — Mestres da Pintura, início" className="logo">
      <span aria-hidden="true" className="logo__mark">
        <span className="logo__sun" />
        <span className="logo__square" />
        <span className="logo__triangle" />
      </span>
      <span className="logo__text">
        <span className="logo__name">Galeria de Arte</span>
        <span className="logo__tag">mestres da pintura</span>
      </span>
    </a>
  );
}
