import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import D from '../data/galeria.js';
import { ARTIST_BY_SLUG, WORK_BY_ID, describeWork, norm, wallBasis } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import { THEMES } from '../lib/theme.js';
import Artwork from '../components/Artwork.jsx';

const EMPTY = { q: '', artist: '', movement: '', period: '' };
const OPT_MOVEMENTS = D.movements.filter((m) => D.works.some((w) => w.movement === m.key));
const OPT_PERIODS = D.periods.filter((p) => D.works.some((w) => w.period === p.key));

export default function Obras({ initialFilters }) {
  const { failed, openLightbox } = useGallery();
  const [f, setF] = useState({ ...EMPTY, ...initialFilters });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const fq = norm(f.q.trim());
  const ids = D.works.filter((w) =>
    (!f.artist || w.artist === f.artist) &&
    (!f.movement || w.movement === f.movement) &&
    (!f.period || w.period === f.period) &&
    (!fq || norm(w.title + ' ' + w.original + ' ' + ARTIST_BY_SLUG[w.artist].name).includes(fq))
  ).map((w) => w.id);

  const hasFilters = !!(f.q || f.artist || f.movement || f.period);
  const clearFilters = () => {
    setF(EMPTY);
    if (location.hash !== '#/obras') history.replaceState(null, '', '#/obras');
  };

  return (
    <section aria-labelledby="h-acervo">
      <div className="band band--lilac">
        <div className="wrap page-intro">
          <span className="eyebrow">todas as paredes</span>
          <h1 id="h-acervo" className="display-hero">O <em>acervo</em></h1>
          <p>Filtre por artista, movimento ou período — ou procure pelo título da obra.</p>
        </div>
      </div>
      <div className="wrap collection">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="filters">
          <div className="field">
            <label htmlFor="f-q">Título ou artista</label>
            <input id="f-q" type="search" placeholder="Ex.: Retirantes" value={f.q} onChange={set('q')} />
          </div>
          <div className="field">
            <label htmlFor="f-a">Artista</label>
            <select id="f-a" value={f.artist} onChange={set('artist')}>
              <option value="">Todos os artistas</option>
              {D.artists.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-m">Movimento</label>
            <select id="f-m" value={f.movement} onChange={set('movement')}>
              <option value="">Todos os movimentos</option>
              {OPT_MOVEMENTS.map((m) => <option key={m.key} value={m.key}>{m.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-p">Período</label>
            <select id="f-p" value={f.period} onChange={set('period')}>
              <option value="">Todos os períodos</option>
              {OPT_PERIODS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </div>
        </form>

        <div className="collection__status">
          <span aria-live="polite" className="eyebrow">{ids.length === 1 ? '1 obra encontrada' : ids.length + ' obras encontradas'}</span>
          {hasFilters && <button type="button" onClick={clearFilters} className="btn btn--paper btn--sm"><X weight="duotone" aria-hidden="true" /> Limpar filtros</button>}
        </div>

        {ids.length === 0 && (
          <div className="collection__empty">
            <p className="collection__empty-title">Nenhuma obra nesta combinação.</p>
            <p>Tente remover um filtro ou buscar outro título.</p>
            <button type="button" onClick={clearFilters} className="btn btn--cobalt">Mostrar todas as obras</button>
          </div>
        )}

        <div className="collection__grid">
          {ids.map((id, i) => {
            const w = describeWork(WORK_BY_ID[id], !!failed[id]);
            return (
              <figure key={id} className="collection__item" style={{ flexBasis: wallBasis(w, i) }}>
                <button type="button" onClick={() => openLightbox(ids, i)} aria-label={`Ampliar ${w.title}, de ${w.artistName}`} className="framed framed--lift framed--tight" style={{ background: THEMES[w.artist].bg }}>
                  <span className="framed__mat"><Artwork work={w} /></span>
                </button>
                <figcaption className="collection__caption">
                  <span className="work-title">{w.title}</span>
                  <span className="work-meta">{w.artistName} · {w.date}</span>
                  <span className="collection__movement">{w.movementName}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
