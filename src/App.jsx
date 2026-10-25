import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import D from './data/galeria.js';
import { ARTIST_BY_SLUG, norm, scrollToId } from './lib/art.js';
import { GalleryContext } from './lib/gallery.js';
import { useHashRoute, useMediaQuery } from './lib/hooks.js';
import Header from './components/Header.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import Footer from './components/Footer.jsx';
import Lightbox from './components/Lightbox.jsx';
import Home from './pages/Home.jsx';
import Artist from './pages/Artist.jsx';
import Obras from './pages/Obras.jsx';
import Sobre from './pages/Sobre.jsx';
import Visita from './pages/Visita.jsx';
import NotFound from './pages/NotFound.jsx';

const SITE_TITLE = 'Galeria de Arte — Mestres da Pintura';

function pageTitle(route) {
  if (route.name === 'artist' && ARTIST_BY_SLUG[route.slug]) return ARTIST_BY_SLUG[route.slug].name + ' · ' + SITE_TITLE;
  if (route.name === 'obras') return 'Obras · ' + SITE_TITLE;
  if (route.name === 'sobre') return 'Sobre o projeto · ' + SITE_TITLE;
  if (route.name === 'visita') return 'Visita virtual · ' + SITE_TITLE;
  return SITE_TITLE;
}

export default function App() {
  const { route, hash, initial } = useHashRoute();
  const narrow = useMediaQuery('(max-width: 1120px)');
  const [failed, setFailed] = useState({});
  const [lb, setLb] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // false | 'nav' | 'search' (abre já focado na busca)
  const [q, setQ] = useState('');
  const [qOpen, setQOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setQOpen(false);
    if (!initial) setLb(null);
    if (route.anchor) setTimeout(() => scrollToId(route.anchor), 60);
    else if (!initial) window.scrollTo(0, 0);
    document.title = pageTitle(route);
  }, [hash]); // eslint-disable-line react-hooks/exhaustive-deps

  const fail = useCallback((id) => setFailed((f) => (f[id] ? f : { ...f, [id]: true })), []);
  const openLightbox = useCallback((ids, i) => {
    setLb({ ids, i });
    setQOpen(false);
    setMenuOpen(false);
  }, []);
  const stepLightbox = useCallback((d) => setLb((s) => s && { ids: s.ids, i: (s.i + d + s.ids.length) % s.ids.length }), []);
  const closeLightbox = useCallback(() => setLb(null), []);

  useEffect(() => {
    if (lb) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && (qOpen || menuOpen)) {
        setQOpen(false);
        setMenuOpen(false);
        return;
      }
      const tag = (e.target && e.target.tagName) || '';
      if (route.name === 'visita' && !/INPUT|SELECT|TEXTAREA/.test(tag)) {
        if (e.key === 'ArrowRight') location.hash = '#/visita/' + ((route.room + 1) % 10 + 1);
        if (e.key === 'ArrowLeft') location.hash = '#/visita/' + ((route.room + 9) % 10 + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb, qOpen, menuOpen, route]);

  const search = useMemo(() => {
    const nq = norm(q.trim());
    if (nq.length < 2) return { active: false, artists: [], workIds: [] };
    return {
      active: true,
      artists: D.artists.filter((a) => norm(a.name + ' ' + a.fullName).includes(nq)).slice(0, 5),
      workIds: D.works.filter((w) => norm(w.title + ' ' + w.original).includes(nq)).slice(0, 8).map((w) => w.id)
    };
  }, [q]);

  const goArtists = (e) => {
    if (location.hash === '#/artistas') {
      e.preventDefault();
      setMenuOpen(false);
      scrollToId('sec-artistas');
    }
  };

  const cur = route.name;
  const navItems = [
    { label: 'Início', href: '#/', current: cur === 'home' && !route.anchor },
    { label: 'Artistas', href: '#/artistas', current: cur === 'artist' || route.anchor === 'sec-artistas', onClick: goArtists },
    { label: 'Obras', href: '#/obras', current: cur === 'obras' },
    { label: 'Sobre o Projeto', href: '#/sobre', current: cur === 'sobre' }
  ];

  const searchProps = {
    q,
    search,
    onQ: (value) => { setQ(value); setQOpen(true); },
    clearQ: () => { setQ(''); setQOpen(false); }
  };

  const skipToContent = (e) => {
    e.preventDefault();
    mainRef.current.focus();
    mainRef.current.scrollIntoView();
  };

  let page;
  if (cur === 'home') page = <Home goArtists={goArtists} />;
  else if (cur === 'artist' && ARTIST_BY_SLUG[route.slug]) page = <Artist key={route.slug} artist={ARTIST_BY_SLUG[route.slug]} />;
  else if (cur === 'obras') page = <Obras key={hash} initialFilters={route.filters} />;
  else if (cur === 'sobre') page = <Sobre />;
  else if (cur === 'visita') page = <Visita room={route.room} />;
  else page = <NotFound />;

  return (
    <GalleryContext.Provider value={{ narrow, failed, fail, openLightbox }}>
      <div className="app">
        <a href="#conteudo" className="skip-link" onClick={skipToContent}>Pular para o conteúdo</a>

        {cur !== 'visita' && (
          <Header
            narrow={narrow}
            navItems={navItems}
            {...searchProps}
            searchOpen={!narrow && qOpen && search.active}
            onSearchFocus={() => setQOpen(true)}
            menuOpen={!!menuOpen}
            toggleMenu={() => { setMenuOpen((m) => (m ? false : 'nav')); setQOpen(false); }}
            openMenuSearch={() => setMenuOpen('search')}
          />
        )}

        {narrow && menuOpen && (
          <MobileMenu navItems={navItems} {...searchProps} focusSearch={menuOpen === 'search'} onClose={() => setMenuOpen(false)} />
        )}

        <main id="conteudo" ref={mainRef} tabIndex={-1}>{page}</main>

        <Footer />

        {lb && <Lightbox ids={lb.ids} index={lb.i} onStep={stepLightbox} onClose={closeLightbox} />}
      </div>
    </GalleryContext.Provider>
  );
}
