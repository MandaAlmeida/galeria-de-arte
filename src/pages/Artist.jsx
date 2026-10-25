import { ArrowLeft, ArrowRight, FrameCorners, SquaresFour } from '@phosphor-icons/react';
import D from '../data/galeria.js';
import { ARTISTS, WORK_BY_ID, describeWork, pad2, paint, scrollToId, splitName, torn } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import { portraitImage } from '../lib/images.js';
import { MURAL_BASES, MURAL_OFFSETS, THEMES, VPAL } from '../lib/theme.js';
import Artwork from '../components/Artwork.jsx';

const TOC = [
  ['biografia', 'Biografia'], ['linha-do-tempo', 'Linha do tempo'], ['estilo', 'Estilo'], ['obras', 'Obras'],
  ['curiosidades', 'Curiosidades'], ['legado', 'Legado'], ['referencias', 'Referências']
];

const TORN = { A: torn(1, 1.6), B: torn(2), C: torn(3, 1), D: torn(4, 1), E: torn(5), F: torn(6, 2.2) };

// Reproduções em destaque na capa, no jornal e na seção de estilo. Van Gogh tem uma seleção feita à mão;
// os demais usam as obras na ordem do acervo (paisagem larga primeiro no jornal).
function pickWorks(slug, works) {
  const byId = Object.fromEntries(works.map((w) => [w.id, w]));
  const ordered = works.filter((w) => w.hasImg).concat(works.filter((w) => !w.hasImg));
  const pick = (id, k) => byId[id] || ordered[k % ordered.length];
  const land = ordered.find((w) => w.hasImg && w.ratio > 1.1) || ordered[0];
  if (slug === 'vincent-van-gogh') {
    return {
      f1: pick('vg-quarto', 0),
      f2: pick('vg-girassois', 1),
      collage: [pick('vg-autorretrato-1889', 0), pick('vg-noite-estrelada', 1), pick('vg-amendoeira', 2)],
      side: pick('vg-girassois-munique', 0)
    };
  }
  const rest = ordered.filter((w) => w !== land);
  return {
    f1: land,
    f2: rest[0] || land,
    collage: [ordered[1 % ordered.length], ordered[0], ordered[2 % ordered.length]],
    side: rest[1] || rest[0] || land
  };
}

// Os dois primeiros capítulos abrem o jornal; um capítulo vira o box em destaque e o resto segue em colunas.
function splitBio(bio) {
  const bi = bio.length >= 6 ? 4 : 3;
  const box = bio[bi];
  const rest = bio.filter((b, i) => i > 1 && i !== bi);
  if (box.p.length > 1) rest.splice(Math.min(rest.length, bi - 2), 0, { h: box.h + ' (continuação)', p: box.p.slice(1) });
  return { lead: bio[0].p.concat(bio[1].p), box, rest };
}

const place = (str) => (str || '').split(', ').slice(1).join(', ') || str || '';

export default function Artist({ artist: a }) {
  const { narrow, failed, openLightbox } = useGallery();
  const t = THEMES[a.slug];
  const VP = VPAL[a.slug];
  const ids = D.works.filter((w) => w.artist === a.slug).map((w) => w.id);
  const works = ids.map((id, i) => ({ ...describeWork(WORK_BY_ID[id], !!failed[id]), open: () => openLightbox(ids, i) }));
  const picks = pickWorks(a.slug, works);
  const bio = splitBio(a.bio);
  const [first, last] = splitName(a.name);
  const num = pad2(a.idx + 1);
  const prev = ARTISTS[(a.idx + 9) % 10];
  const next = ARTISTS[(a.idx + 1) % 10];

  const vars = {
    '--v-main': VP.main, '--v-gold': VP.gold, '--v-goldD': VP.goldD, '--v-box': VP.box, '--v-ink2': VP.ink2,
    '--t-bg': t.bg, '--t-ink': t.ink, '--t-soft': t.soft, '--t-deep': t.deep
  };

  const hero = {
    a, first, last, num, VP, picks,
    years: a.years.replace('–', ' – ').trim(),
    photo: { ...a.portrait, src: portraitImage(a.slug) }
  };

  return (
    <article style={vars}>
      <section aria-labelledby="vg-nome" className="artist-hero" style={{ backgroundImage: paint(VP.main, VP.patches, VP.seed) }}>
        <div className="wrap artist-hero__inner">
          <a href="#/artistas" className="artist-hero__back"><ArrowLeft weight="duotone" aria-hidden="true" /> Voltar à galeria</a>
          {narrow ? <HeroNarrow {...hero} /> : <HeroWide {...hero} />}
        </div>
      </section>

      <nav aria-label="Seções da página" className="toc">
        <div className="wrap toc__inner">
          {TOC.map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); scrollToId(id, 70); }} className="toc__link">{label}</a>
          ))}
        </div>
      </nav>

      <Newspaper a={a} num={num} VP={VP} bio={bio} f1={picks.f1} f2={picks.f2} />
      <Timeline a={a} ids={ids} works={works} />
      <Style a={a} side={picks.side} />
      <Mural works={works} narrow={narrow} texture={paint(VP.main, VP.patches.slice(0, 3), VP.seed + 18)} />

      <section className="band" style={{ background: 'var(--t-soft)' }}>
        <div className="wrap section-pad-artist curio-legacy">
          <div id="curiosidades" className="curio-legacy__col">
            <h2 className="display-md">Curio<em>sidades</em></h2>
            <ol className="curiosities">
              {a.curiosities.map((c, i) => (
                <li key={i}><span aria-hidden="true" className="curiosities__n">{i + 1}</span>{c}</li>
              ))}
            </ol>
          </div>
          <div id="legado" className="curio-legacy__col">
            <h2 className="display-md">Legado <em>artístico</em></h2>
            <p className="legacy__quote">{a.legacy[0] || ''}</p>
            <p className="legacy__text">{a.legacy.slice(1).join(' ')}</p>
          </div>
        </div>
      </section>

      <section id="referencias" aria-labelledby="h-ref" className="wrap refs">
        <h2 id="h-ref" className="refs__title">Fontes e referências</h2>
        <ul className="ref-list">
          {a.refs.map((r) => (
            <li key={r.url}><span aria-hidden="true" className="ref-list__dot" style={{ background: 'var(--t-bg)' }} /><a href={r.url} target="_blank" rel="noopener">{r.label}</a></li>
          ))}
        </ul>
        <p className="refs__note">Os créditos de cada imagem estão junto à obra. Lista completa em <a href="#/sobre">Sobre o projeto</a>.</p>
      </section>

      <nav aria-label="Navegação entre artistas" className="wrap artist-nav">
        <div className="artist-nav__pair">
          <a href={'#/artistas/' + prev.slug} className="artist-nav__card" style={{ '--n-bg': THEMES[prev.slug].bg, '--n-ink': THEMES[prev.slug].ink }}>
            <span className="artist-nav__label"><ArrowLeft weight="duotone" aria-hidden="true" /> Artista anterior</span>
            <span className="artist-nav__name">{prev.name}</span>
          </a>
          <a href={'#/artistas/' + next.slug} className="artist-nav__card artist-nav__card--next" style={{ '--n-bg': THEMES[next.slug].bg, '--n-ink': THEMES[next.slug].ink }}>
            <span className="artist-nav__label">Próximo artista <ArrowRight weight="duotone" aria-hidden="true" /></span>
            <span className="artist-nav__name">{next.name}</span>
          </a>
        </div>
        <div className="artist-nav__links">
          <a href="#/artistas" className="underline-link"><SquaresFour weight="duotone" aria-hidden="true" /> Voltar à galeria</a>
          <a href="#/obras" className="underline-link"><FrameCorners weight="duotone" aria-hidden="true" /> Explorar as obras em destaque</a>
        </div>
      </nav>
    </article>
  );
}

// Recorte de papel com uma obra e a legenda que abre a visualização ampliada.
function TornCard({ work, clip, className = '', style }) {
  return (
    <div className={'torn-card ' + className} style={style}>
      <div className="torn-card__paper" style={{ clipPath: clip }}>
        <Artwork work={work} />
        <button type="button" onClick={work.open} className="torn-card__caption">{work.title} · {work.date} ↗</button>
      </div>
    </div>
  );
}

function PhotoCard({ photo, className = '' }) {
  return (
    <figure className={'photo-card ' + className}>
      <div className="photo-card__paper" style={{ clipPath: TORN.B }}>
        <img loading="lazy" src={photo.src} alt={photo.alt} />
        <figcaption><strong>{photo.title}</strong> · {photo.date}<br />{photo.location}</figcaption>
      </div>
    </figure>
  );
}

function HeroWide({ a, first, last, num, years, VP, photo, picks }) {
  const [c1, c2, c3] = picks.collage;
  return (
    <div className="artist-hero__cols">
      <div className="artist-hero__col">
        <div className="paper-shadow rise">
          <div className="name-card" style={{ clipPath: TORN.A }}>
            <span className="name-card__room">Sala {num} · {a.movement}</span>
            <h1 id="vg-nome" className="name-card__name"><span>{first}</span><span>{last}</span></h1>
            <span className="name-card__years">{years}</span>
            <dl className="name-card__facts">
              <dt>Nasceu</dt><dd>{place(a.born)}</dd>
              <dt>{a.died ? 'Morreu' : 'Hoje'}</dt><dd>{a.died ? place(a.died) : 'Em atividade'}</dd>
              <dt>Origem</dt><dd>{a.nationality}</dd>
            </dl>
          </div>
        </div>
        <div aria-hidden="true" className="stamp">{VP.stamp.a}<span>{VP.stamp.y}</span>{VP.stamp.b}</div>
        <div className="paper-shadow rise" style={{ animationDelay: '.3s' }}>
          <div className="intro-card" style={{ clipPath: TORN.F }}>
            <p>{a.intro}</p>
            <span>Nota da curadoria</span>
          </div>
        </div>
      </div>
      <div className="artist-hero__col artist-hero__col--center">
        <PhotoCard photo={photo} className="rise" />
        <TornCard work={c1} clip={TORN.C} className="rise" style={{ width: '72%', alignSelf: 'center', animationDelay: '.2s' }} />
      </div>
      <div className="artist-hero__col artist-hero__col--low">
        <TornCard work={c2} clip={TORN.D} className="rise" style={{ animationDelay: '.3s' }} />
        <TornCard work={c3} clip={TORN.E} className="rise" style={{ width: '84%', alignSelf: 'flex-end', animationDelay: '.4s' }} />
      </div>
    </div>
  );
}

function HeroNarrow({ a, first, last, num, years, photo, picks }) {
  const [c1, c2, c3] = picks.collage;
  return (
    <div className="artist-hero__stack">
      <div className="paper-shadow">
        <div className="name-card name-card--narrow" style={{ clipPath: TORN.A }}>
          <span className="name-card__room">Sala {num} · {a.movement}</span>
          <h1 id="vg-nome" className="name-card__name"><span>{first}</span><span>{last}</span></h1>
          <span className="name-card__years">{years} · {a.nationality}</span>
        </div>
      </div>
      <PhotoCard photo={photo} className="photo-card--narrow" />
      <div className="paper-shadow">
        <div className="intro-card intro-card--narrow" style={{ clipPath: TORN.F }}><p>{a.intro}</p></div>
      </div>
      <div className="artist-hero__pair">
        <TornCard work={c1} clip={TORN.C} />
        <TornCard work={c2} clip={TORN.D} style={{ marginTop: 28 }} />
      </div>
      <TornCard work={c3} clip={TORN.E} />
    </div>
  );
}

function Newspaper({ a, num, VP, bio, f1, f2 }) {
  return (
    <section id="biografia" aria-labelledby="vg-jornal" className="newspaper">
      <div className="newspaper__inner">
        <div className="newspaper__rule">
          <span>Galeria de Arte — Mestres da Pintura</span><span>Edição especial · Sala {num}</span>
        </div>
        <h2 id="vg-jornal" className="newspaper__masthead">{VP.mast}</h2>
        <div aria-hidden="true" className="newspaper__band"><div /></div>
        <div className="newspaper__front">
          <div className="newspaper__main">
            <div><Artwork work={f1} /></div>
            <button type="button" onClick={f1.open} className="newspaper__headline">{f1.title}</button>
            <div className="newspaper__box">
              <span>{bio.box.h}</span>
              <p>{bio.box.p[0]}</p>
            </div>
          </div>
          <div className="newspaper__side">
            <h3 className="newspaper__who">Quem foi {VP.short}?</h3>
            {bio.lead.map((para, i) => <p key={i} className="newspaper__para">{para}</p>)}
            <div className="newspaper__fig"><Artwork work={f2} /></div>
            <button type="button" onClick={f2.open} className="newspaper__credit">{f2.title}, {f2.date} · {f2.location} ↗</button>
          </div>
        </div>
        <div className="newspaper__more">
          <div className="newspaper__continued">Continua — a vida em capítulos</div>
          <div className="newspaper__columns">
            {bio.rest.map((ch) => (
              <div key={ch.h} className="newspaper__chapter">
                <h4>{ch.h}</h4>
                {ch.p.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline({ a, ids, works }) {
  return (
    <section id="linha-do-tempo" aria-labelledby="h-tl" className="timeline">
      <div className="timeline__inner">
        <div className="timeline__head">
          <span className="eyebrow" style={{ color: 'var(--t-deep)' }}>deslize para o lado →</span>
          <h2 id="h-tl" className="display-md">Linha do <em>tempo</em></h2>
        </div>
        <ol className="timeline__track">
          {a.timeline.map((x, i) => {
            const k = x.work ? ids.indexOf(x.work) : -1;
            return (
              <li key={i} className="timeline__item">
                <span aria-hidden="true" className="timeline__dot" />
                <div className="timeline__card">
                  <span className="timeline__year">{x.y}</span>
                  <span className="timeline__text">{x.t}</span>
                  {k >= 0 && <button type="button" onClick={works[k].open} className="timeline__work">ver: {works[k].title}</button>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Style({ a, side }) {
  const rows = [['Técnica', a.style.technique], ['Materiais', a.style.materials], ['Influências', a.style.influences], ['Movimentos relacionados', a.movement], ['Contribuições', a.style.contributions]];
  return (
    <section id="estilo" aria-labelledby="vg-car" className="wrap section-pad-artist">
      <div className="style-sec">
        <div className="style-sec__panel">
          <h2 id="vg-car" className="style-sec__title">Características</h2>
          <ul className="style-sec__features">
            {a.style.features.map((f, i) => <li key={i}><span aria-hidden="true" />{f}</li>)}
          </ul>
          <dl className="style-sec__rows">
            {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
        <figure className="style-sec__figure">
          <TornCard work={side} clip={TORN.D} />
          <figcaption className="style-sec__fact">
            <svg aria-hidden="true" viewBox="0 0 40 40"><path d="M34 34 C 14 34, 8 22, 10 6 M10 6 L4 13 M10 6 L16 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            {side.fact}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Mural({ works, narrow, texture }) {
  return (
    <section id="obras" aria-labelledby="vg-mural" className="mural" style={{ backgroundImage: texture }}>
      <div className="wrap section-pad-artist">
        <span className="mural__eyebrow">Na parede desta sala</span>
        <h2 id="vg-mural" className="mural__title">Galeria de <em>obras</em></h2>
        <div className="mural__wall">
          {works.map((w, i) => (
            <figure key={w.id} className="mural__item" style={{ flexBasis: MURAL_BASES[i % 7], marginTop: narrow ? 0 : MURAL_OFFSETS[i % 7] }}>
              <div className="paper-shadow paper-shadow--deep">
                <div className="mural__paper" style={{ clipPath: torn(i + 11) }}><Artwork work={w} /></div>
              </div>
              <figcaption className="mural__label">
                <button type="button" onClick={w.open} className="mural__work-title">{w.title} ↗</button>
                <span className="mural__original">{w.original} · {w.date}</span>
                <span className="mural__tech">{w.technique} · {w.dims} · {w.location}</span>
                <p className="mural__desc">{w.desc}</p>
                <p className="mural__fact"><strong>Você sabia?</strong> {w.fact}</p>
                <span className="mural__license">{w.license}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
