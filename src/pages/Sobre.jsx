import D from '../data/galeria.js';
import { CREDITOS_EXTRAS, PROFESSORA } from '../data/creditos.js';
import { describeWork } from '../lib/art.js';

export default function Sobre() {
  return (
    <article>
      <div className="band band--grass">
        <div className="wrap page-intro page-intro--sobre">
          <span className="eyebrow eyebrow--sun">sobre o projeto</span>
          <h1 className="display-sobre">Um museu digital <em>para a sala de aula</em></h1>
        </div>
      </div>
      <div className="wrap sobre">
        <div className="sobre__intro">
          <div className="sobre__col">
            <h2>O que é</h2>
            <p>A <em>Galeria de Arte — Mestres da Pintura</em> foi desenvolvida com finalidade educativa para apresentar artistas importantes da história da pintura, valorizar a cultura e incentivar o interesse pela arte. Reúne dez pintores — do Renascimento à arte contemporânea, com destaque para o modernismo brasileiro.</p>
          </div>
          <div className="sobre__col">
            <h2>De onde vêm as informações</h2>
            <p>Os textos partem de informações publicadas por museus, acervos públicos e enciclopédias de arte, listados em cada página de artista e abaixo. Quando a leitura de uma obra é interpretação — e não fato documentado — o texto indica isso.</p>
          </div>
          <div className="sobre__col">
            <h2>Imagens e direitos</h2>
            <p>Reproduzimos sobretudo obras em domínio público no Brasil (as de Frida Kahlo desde 2025), a partir de fotografias fiéis do Wikimedia Commons. Reproduções de Tarsila do Amaral, ainda protegidas, aparecem apenas para uso didático, com aviso. Obras de Pablo Picasso, Romero Britto, Cândido Portinari e Anita Malfatti ainda estão protegidas e aparecem como espaço reservado identificado.</p>
          </div>
        </div>

        <section aria-labelledby="h-creditos" className="credits">
          <div aria-hidden="true" className="credits__backdrop" />
          <div className="credits__card">
            <h2 id="h-creditos" className="eyebrow eyebrow--tomato">Créditos</h2>
            <span className="credits__site">Galeria de Arte — Mestres da Pintura</span>
            <span className="credits__purpose">Projeto desenvolvido para fins educativos</span>
            <span className="credits__teacher">Professora responsável: {PROFESSORA}</span>
            <p>Orientação pedagógica, definição dos artistas e acompanhamento do projeto sob responsabilidade da professora {PROFESSORA}.</p>
            {CREDITOS_EXTRAS.map((c) => <span key={c.label} className="credits__extra">{c.label}: {c.value}</span>)}
          </div>
        </section>

        <section aria-labelledby="h-gref" className="sobre__refs">
          <h2 id="h-gref" className="refs__title">Referências gerais</h2>
          <ul className="ref-list">
            {D.generalRefs.map((r) => (
              <li key={r.url}><span aria-hidden="true" className="ref-list__dot" style={{ background: 'var(--grass)' }} /><a href={r.url} target="_blank" rel="noopener">{r.label}</a></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="h-img">
          <h2 id="h-img" className="refs__title refs__title--tight">Créditos das imagens</h2>
          <p className="sobre__img-note">Situação de cada obra citada nesta galeria.</p>
          <ul className="credit-rows">
            {D.works.map((work) => {
              const r = describeWork(work);
              return (
                <li key={r.id}>
                  <span className="credit-rows__title">{r.title}</span>
                  <span className="work-meta">{r.artistName} · {r.date}</span>
                  <span className="credit-rows__loc">{r.location}</span>
                  {r.filePage && (
                    <span className="credit-rows__pd">
                      <span className="badge badge--grass">Domínio público</span>
                      <a href={r.filePage} target="_blank" rel="noopener">Wikimedia Commons</a>
                    </span>
                  )}
                  {r.hasLocal && <><span className="badge badge--grass">Domínio público (BR) — imagem enviada pela equipe</span><span className="credit-rows__lic">{r.license}</span></>}
                  {r.hasEduc && <><span className="badge badge--tomato">Protegida — uso didático</span><span className="credit-rows__lic">{r.license}</span></>}
                  {r.pendingPD && <span className="badge badge--sun">Domínio público (BR) — imagem a adicionar</span>}
                  {r.isProtected && <span className="badge badge--tomato">Protegida — não reproduzida</span>}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </article>
  );
}
