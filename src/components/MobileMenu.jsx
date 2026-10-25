import { useEffect, useRef } from 'react';
import { DoorOpen, X } from '@phosphor-icons/react';
import { ARTIST_BY_SLUG, WORK_BY_ID } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';

export default function MobileMenu({ navItems, q, search, onQ, clearQ, focusSearch, onClose }) {
  const { openLightbox } = useGallery();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!focusSearch) return;
    const t = setTimeout(() => searchRef.current && searchRef.current.focus(), 50);
    return () => clearTimeout(t);
  }, [focusSearch]);

  const empty = !search.artists.length && !search.workIds.length;

  return (
    <div id="menu-movel" role="dialog" aria-modal="true" aria-label="Menu" className="mobile-menu">
      <div className="mobile-menu__top">
        <span className="eyebrow eyebrow--sun">Menu</span>
        <button type="button" onClick={onClose} aria-label="Fechar menu" className="mobile-menu__close">
          <X weight="duotone" aria-hidden="true" size={22} />
        </button>
      </div>

      <label className="mobile-menu__search">
        <span>Buscar artistas e obras</span>
        <input type="search" ref={searchRef} placeholder="Ex.: Abaporu, Monet" value={q} onChange={(e) => onQ(e.target.value)} />
      </label>

      {search.active && (
        <div className="mobile-menu__results">
          {search.artists.map((a) => (
            <a key={a.slug} href={'#/artistas/' + a.slug} className="mobile-menu__artist">{a.name}</a>
          ))}
          {search.workIds.map((id, i) => {
            const w = WORK_BY_ID[id];
            return (
              <button key={id} type="button" onClick={() => openLightbox(search.workIds, i)} className="mobile-menu__work">
                <span>{w.title}</span>
                <span>{ARTIST_BY_SLUG[w.artist].name}</span>
              </button>
            );
          })}
          {empty && <span className="mobile-menu__empty">Nada encontrado. Tente outro nome ou título.</span>}
          <button type="button" onClick={clearQ} className="mobile-menu__clear">Limpar busca</button>
        </div>
      )}

      <nav aria-label="Principal" className="mobile-menu__nav">
        {navItems.map((n) => (
          <a key={n.href} href={n.href} aria-current={n.current ? 'page' : undefined} onClick={n.onClick}>{n.label}</a>
        ))}
      </nav>
      <a href="#/visita" className="btn btn--sun btn--lg mobile-menu__visit"><DoorOpen weight="duotone" aria-hidden="true" /> Visitar a galeria</a>
    </div>
  );
}
