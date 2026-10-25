import { DoorOpen, List, MagnifyingGlass } from '@phosphor-icons/react';
import { ARTIST_BY_SLUG, WORK_BY_ID } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import Logo from './Logo.jsx';

export default function Header({ narrow, navItems, q, search, onQ, clearQ, searchOpen, onSearchFocus, menuOpen, toggleMenu, openMenuSearch }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />

        {!narrow && (
          <nav aria-label="Principal" className="main-nav">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} aria-current={n.current ? 'page' : undefined} onClick={n.onClick} className="main-nav__link">{n.label}</a>
            ))}
            <label className="header-search">
              <span className="visually-hidden">Buscar artistas e obras</span>
              <MagnifyingGlass weight="duotone" aria-hidden="true" className="header-search__icon" />
              <input type="search" placeholder="Buscar artista ou obra" value={q} onChange={(e) => onQ(e.target.value)} onFocus={onSearchFocus} />
            </label>
            <a href="#/visita" className="btn btn--sun btn--lift btn--sm"><DoorOpen weight="duotone" aria-hidden="true" /> Visitar a galeria</a>
          </nav>
        )}

        {narrow && (
          <>
            <button type="button" aria-label="Buscar" onClick={openMenuSearch} className="icon-btn">
              <MagnifyingGlass weight="duotone" aria-hidden="true" size={20} />
            </button>
            <button type="button" aria-expanded={String(!!menuOpen)} aria-controls="menu-movel" onClick={toggleMenu} className="btn btn--sun btn--menu">
              <List weight="duotone" aria-hidden="true" size={20} /> <span className="btn--menu__label">Menu</span>
            </button>
          </>
        )}

        {searchOpen && <SearchDropdown q={q} search={search} clearQ={clearQ} />}
      </div>
    </header>
  );
}

function SearchDropdown({ q, search, clearQ }) {
  const { openLightbox } = useGallery();
  const empty = !search.artists.length && !search.workIds.length;
  return (
    <div role="region" aria-label="Resultados da busca" className="search-dropdown">
      <div className="search-dropdown__top">
        <span className="eyebrow eyebrow--tomato">procurando “{q}”</span>
        <button type="button" onClick={clearQ} className="link-btn">Limpar busca</button>
      </div>
      {search.artists.length > 0 && (
        <div className="search-dropdown__group">
          <span className="search-dropdown__label">Artistas</span>
          {search.artists.map((a) => (
            <a key={a.slug} href={'#/artistas/' + a.slug} onClick={clearQ} className="search-hit search-hit--artist">
              <span className="search-hit__name">{a.name}</span>
              <span className="search-hit__meta">{a.years}</span>
            </a>
          ))}
        </div>
      )}
      {search.workIds.length > 0 && (
        <div className="search-dropdown__group">
          <span className="search-dropdown__label">Obras</span>
          {search.workIds.map((id, i) => {
            const w = WORK_BY_ID[id];
            return (
              <button key={id} type="button" onClick={() => openLightbox(search.workIds, i)} className="search-hit search-hit--work">
                <span className="search-hit__title">{w.title}</span>
                <span className="search-hit__meta">{ARTIST_BY_SLUG[w.artist].name} · {w.date}</span>
              </button>
            );
          })}
        </div>
      )}
      {empty && <p className="search-dropdown__empty">Nenhum artista ou obra com esse nome. Que tal tentar «Monet», «Noite» ou «Abaporu»?</p>}
    </div>
  );
}
