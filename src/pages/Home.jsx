import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import D from '../data/galeria.js';
import { CREDITOS_EXTRAS, PROFESSORA } from '../data/creditos.js';
import { ARTISTS, ARTIST_BY_SLUG, WORK_BY_ID, describeWork, pad2, wallBasis } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import { portraitImage, workImage } from '../lib/images.js';
import { CARD_BASES, CARD_OFFSETS, FRAMES, MOV_STYLE, THEMES, WALL_OFFSETS } from '../lib/theme.js';
import Artwork from '../components/Artwork.jsx';

const HERO_IDS = ['vg-noite-estrelada', 'ld-mona-lisa', 'cm-nenufares'];
const FEATURED_IDS = D.works.filter((w) => w.featured).map((w) => w.id);

export default function Home({ goArtists }) {
  return (
    <>
      <Hero goArtists={goArtists} />
      <ArtistRooms />
      <Featured />
      <Movements />
      <AboutTeaser />
    </>
  );
}

function Hero({ goArtists }) {
  const { openLightbox } = useGallery();
  const pieces = [
    { cls: 'hero-art--noite', label: 'Ampliar A Noite Estrelada, de Vincent van Gogh', alt: 'A Noite Estrelada, de Vincent van Gogh (1889)' },
    { cls: 'hero-art--mona', label: 'Ampliar Mona Lisa, de Leonardo da Vinci', alt: 'Mona Lisa, de Leonardo da Vinci (c. 1503–1519)' },
    { cls: 'hero-art--nenufares', label: 'Ampliar Nenúfares, de Claude Monet', alt: 'Nenúfares, de Claude Monet (1906)' }
  ];
  return (
    <section aria-labelledby="hero-title" className="hero wrap">
      <div className="hero__text">
        <span className="eyebrow eyebrow--cobalt">Museu digital · Dez mestres da pintura</span>
        <h1 id="hero-title" className="hero__title">
          <span>A arte tem</span>
          <span className="hero__title-em">mil formas</span>
          <span>de ver</span>
          <span className="hero__title-end">o mundo.</span>
        </h1>
        <p className="hero__lead">Dez mestres da pintura, cinco séculos de cor. Entre nas salas, conheça cada artista e descubra como cada um inventou o seu jeito de olhar.</p>
        <div className="hero__actions">
          <a href="#/artistas" onClick={goArtists} className="btn btn--ink btn--lift btn--xl">Entrar na galeria <ArrowRight weight="duotone" aria-hidden="true" /></a>
          <a href="#/visita" className="eyebrow hero__visit">ou faça a visita virtual <ArrowUpRight weight="duotone" aria-hidden="true" size={18} /></a>
        </div>
      </div>

      <div aria-label="Colagem com três pinturas em domínio público" role="group" className="hero__collage">
        <div aria-hidden="true" className="hero__shape hero__shape--cobalt" />
        <div aria-hidden="true" className="hero__shape hero__shape--sun" />
        <div aria-hidden="true" className="hero__shape hero__shape--dot" />
        {pieces.map((p, i) => (
          <button key={HERO_IDS[i]} type="button" onClick={() => openLightbox(HERO_IDS, i)} aria-label={p.label} className={'hero-art ' + p.cls}>
            <img src={workImage(HERO_IDS[i])} alt={p.alt} />
          </button>
        ))}
        <span className="hero__badge">Obras em domínio público</span>
      </div>
    </section>
  );
}

function ArtistRooms() {
  const { narrow } = useGallery();
  return (
    <section id="sec-artistas" aria-labelledby="t-mestres" className="band band--cobalt">
      <div className="wrap section-pad">
        <div className="section-head">
          <div className="section-head__titles">
            <span className="eyebrow eyebrow--sun">conheça os mestres</span>
            <h2 id="t-mestres" className="display-xl">Dez salas, <em className="c-sun">dez mundos.</em></h2>
          </div>
          <p className="section-head__note">Cada sala tem as cores e as formas do seu artista. Escolha uma porta e entre.</p>
        </div>
        <div className="room-cards">
          {ARTISTS.map((a, i) => {
            const t = THEMES[a.slug];
            const num = pad2(i + 1);
            return (
              <a
                key={a.slug}
                href={'#/artistas/' + a.slug}
                aria-label={`Sala ${num}: ${a.name}. Conhecer artista`}
                className="room-card"
                style={{ '--t-bg': t.bg, '--t-ink': t.ink, flexBasis: CARD_BASES[i], marginTop: narrow ? 0 : CARD_OFFSETS[i], animationDelay: i * 60 + 'ms' }}
              >
                <div className="room-card__top">
                  <span className="eyebrow">Sala {num}</span>
                  <span className="room-card__years">{a.years}</span>
                </div>
                <div className="room-card__photo" style={{ height: i % 3 === 0 ? 260 : 200 }}>
                  <span className="room-card__frame"><img src={portraitImage(a.slug)} alt={a.portrait.alt} loading="lazy" /></span>
                </div>
                <h3 className="room-card__name">{a.name}</h3>
                <div className="tags">
                  <span className="tag">{a.nationality}</span>
                  <span className="tag tag--ink">{a.movement}</span>
                </div>
                <p className="room-card__summary">{a.summary}</p>
                <span className="room-card__cta">Conhecer artista <ArrowRight weight="duotone" aria-hidden="true" /></span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const { narrow, failed, openLightbox } = useGallery();
  return (
    <section id="sec-destaques" aria-labelledby="t-destaques" className="wrap section-pad">
      <div className="section-head">
        <div className="section-head__titles">
          <span className="eyebrow eyebrow--tomato">parede de destaques</span>
          <h2 id="t-destaques" className="display-xl">Obras que <em className="c-cobalt">mudaram</em> o jeito de pintar</h2>
        </div>
        <a href="#/obras" className="underline-link">Ver o acervo completo <ArrowRight weight="duotone" aria-hidden="true" /></a>
      </div>
      <div className="wall">
        {FEATURED_IDS.map((id, i) => {
          const w = describeWork(WORK_BY_ID[id], !!failed[id]);
          return (
            <figure key={id} className="wall-item" style={{ flexBasis: wallBasis(w, i), marginTop: narrow ? 0 : WALL_OFFSETS[i % 5] }}>
              <button type="button" onClick={() => openLightbox(FEATURED_IDS, i)} aria-label={`Ampliar ${w.title}, de ${w.artistName}`} className="framed framed--lift" style={{ background: FRAMES[i % FRAMES.length] }}>
                <span className="framed__mat"><Artwork work={w} /></span>
              </button>
              <figcaption className="wall-item__label">
                <span className="work-title">{w.title}</span>
                <span className="work-meta">{w.artistName} · {w.date}</span>
                <span className="wall-item__short">{w.short}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function Movements() {
  return (
    <section id="sec-movimentos" aria-labelledby="t-mov" className="band band--sand">
      <div className="wrap section-pad">
        <div className="section-head__titles movements__head">
          <span className="eyebrow">mapa de estilos</span>
          <h2 id="t-mov" className="display-xl">Explore os <em>movimentos</em></h2>
          <p className="movements__intro">Rótulos ajudam a estudar, mas muitos artistas passaram por vários estilos — e alguns recusaram o nome que receberam.</p>
        </div>
        <div className="movements">
          {D.movements.map((m) => {
            const [color, radius, clip] = MOV_STYLE[m.key] || ['#fff', '0', 'none'];
            return (
              <article key={m.key} className="movement">
                <div className="movement__top">
                  <span aria-hidden="true" className="movement__shape" style={{ background: color, borderRadius: radius, clipPath: clip }} />
                  <span className="eyebrow">{m.span}</span>
                </div>
                <h3 className="movement__name">{m.name}</h3>
                <p className="movement__text">{m.text}</p>
                <div className="movement__links">
                  {m.artists.map((slug) => (
                    <a key={slug} href={'#/artistas/' + slug} className="chip-link">{ARTIST_BY_SLUG[slug].name}</a>
                  ))}
                  <a href={'#/obras?movimento=' + m.key} className="movement__works">ver obras →</a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section aria-labelledby="t-sobre-home" className="wrap section-pad">
      <div className="about-teaser">
        <div className="about-teaser__text">
          <span className="eyebrow eyebrow--grass">sobre o projeto</span>
          <h2 id="t-sobre-home" className="display-lg">Uma galeria para <em className="c-tomato">aprender olhando</em></h2>
          <p>Este site foi desenvolvido com finalidade educativa para apresentar artistas importantes da história da pintura, valorizar a cultura e incentivar o interesse pela arte. As informações vêm de museus, acervos públicos e enciclopédias de arte, e cada imagem traz sua fonte e sua situação de direitos.</p>
          <a href="#/sobre" className="underline-link">Fontes, créditos e direitos das imagens <ArrowRight weight="duotone" aria-hidden="true" /></a>
        </div>
        <div className="about-teaser__card-wrap">
          <div aria-hidden="true" className="about-teaser__backdrop" />
          <div className="about-teaser__card">
            <span className="about-teaser__site">Galeria de Arte — Mestres da Pintura</span>
            <span className="eyebrow eyebrow--grass">Projeto desenvolvido para fins educativos</span>
            <span className="about-teaser__teacher">Professora responsável: {PROFESSORA}</span>
            {CREDITOS_EXTRAS.map((c) => <span key={c.label} className="about-teaser__extra">{c.label}: {c.value}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
