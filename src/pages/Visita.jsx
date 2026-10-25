import { ArrowLeft, ArrowRight, SignOut } from '@phosphor-icons/react';
import D from '../data/galeria.js';
import { ARTISTS, WORK_BY_ID, describeWork } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import { THEMES } from '../lib/theme.js';
import Artwork from '../components/Artwork.jsx';

export default function Visita({ room }) {
  const { failed, openLightbox } = useGallery();
  const a = ARTISTS[room];
  const t = THEMES[a.slug];
  const ids = D.works.filter((w) => w.artist === a.slug).map((w) => w.id);

  return (
    <section aria-label="Visita virtual" className="visit" style={{ '--t-bg': t.bg, '--t-ink': t.ink, '--t-soft': t.soft }}>
      <div className="visit__bar">
        <div className="visit__room">
          <span className="eyebrow">Sala {room + 1} de 10</span>
          <h1>{a.name}</h1>
        </div>
        <a href="#/" className="btn btn--paper btn--shadow"><SignOut weight="duotone" aria-hidden="true" /> Sair da visita</a>
      </div>

      <div className="visit__hall">
        <div className="visit__wall">
          {ids.map((id, i) => {
            const w = describeWork(WORK_BY_ID[id], !!failed[id]);
            return (
              <figure key={id} className="visit__work">
                <button type="button" onClick={() => openLightbox(ids, i)} aria-label={`Ver detalhes de ${w.title}`} className="visit__frame">
                  <span className="visit__mat"><Artwork work={w} className="visit__img" placeholderStyle={{ height: '100%', maxWidth: '72vw' }} /></span>
                </button>
                <figcaption className="visit__label">
                  <strong>{w.title}</strong>
                  {w.date} · {w.technique}
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div aria-hidden="true" className="visit__floor" />
      </div>

      <div className="visit__footer">
        <div className="visit__about">
          <span className="visit__meta">{a.nationality} · {a.years} · {a.movement}</span>
          <p>{a.summary}</p>
          <a href={'#/artistas/' + a.slug}>Ir para a página de {a.name} →</a>
        </div>
        <nav aria-label="Mapa das salas" className="visit__map">
          <span className="eyebrow">mapa da exposição</span>
          <div className="visit__rooms">
            {ARTISTS.map((x, i) => {
              const here = i === room;
              return (
                <a
                  key={x.slug}
                  href={'#/visita/' + (i + 1)}
                  aria-label={`Sala ${i + 1}: ${x.name}`}
                  aria-current={here ? 'page' : undefined}
                  title={x.name}
                  className="visit__room-link"
                  style={here ? { background: THEMES[x.slug].bg, color: THEMES[x.slug].ink, boxShadow: '3px 3px 0 var(--ink)' } : undefined}
                >{i + 1}</a>
              );
            })}
          </div>
          <div className="visit__steps">
            <a href={'#/visita/' + ((room + 9) % 10 + 1)} className="btn btn--paper"><ArrowLeft weight="duotone" aria-hidden="true" /> Sala anterior</a>
            <a href={'#/visita/' + ((room + 1) % 10 + 1)} className="btn btn--cobalt">Próxima sala <ArrowRight weight="duotone" aria-hidden="true" /></a>
          </div>
          <span className="visit__hint">No teclado, use ← → para trocar de sala. No celular, deslize as obras para o lado.</span>
        </nav>
      </div>
    </section>
  );
}
