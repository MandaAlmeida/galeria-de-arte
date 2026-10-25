import { PROFESSORA } from '../data/creditos.js';

const STRIPE = ['#23389b', '#e9b24a', '#d9694f', '#b8322a', '#d46a8c', '#3f6f4f', '#c9bfe0', '#9e4a2c'];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="site-footer__stripe">
        {STRIPE.map((c) => <span key={c} style={{ background: c }} />)}
      </div>
      <div className="site-footer__inner">
        <div className="site-footer__credits">
          <span className="site-footer__title">Galeria de Arte — <em>Mestres da Pintura</em></span>
          <span className="eyebrow eyebrow--lilac">Projeto desenvolvido para fins educativos</span>
          <span className="site-footer__teacher">Professora responsável: {PROFESSORA}</span>
        </div>
        <nav aria-label="Rodapé" className="site-footer__nav">
          <a href="#/">Início</a>
          <a href="#/artistas">Artistas</a>
          <a href="#/obras">Obras</a>
          <a href="#/sobre">Sobre e referências</a>
        </nav>
      </div>
    </footer>
  );
}
