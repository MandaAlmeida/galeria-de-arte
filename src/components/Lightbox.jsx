import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import { WORK_BY_ID, describeWork } from '../lib/art.js';
import { useGallery } from '../lib/gallery.js';
import Artwork from './Artwork.jsx';

export default function Lightbox({ ids, index, onStep, onClose }) {
  const { failed } = useGallery();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const w = describeWork(WORK_BY_ID[ids[index]], !!failed[ids[index]]);

  // Foco no botão "Fechar" ao abrir, rolagem da página travada e foco devolvido ao fechar.
  useEffect(() => {
    const prevFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current && closeRef.current.focus();
    return () => {
      document.body.style.overflow = '';
      prevFocus && prevFocus.focus && prevFocus.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowLeft') onStep(-1);
      else if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const els = Array.from(dialogRef.current.querySelectorAll('button, a[href]'));
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="lb-title" ref={dialogRef} className="lightbox">
      <div className="lightbox__bar">
        <span className="eyebrow eyebrow--sun">obra {index + 1} de {ids.length}</span>
        <div className="lightbox__controls">
          <button type="button" aria-label="Obra anterior" onClick={() => onStep(-1)} className="lightbox__arrow"><ArrowLeft weight="duotone" aria-hidden="true" size={20} /></button>
          <button type="button" aria-label="Próxima obra" onClick={() => onStep(1)} className="lightbox__arrow"><ArrowRight weight="duotone" aria-hidden="true" size={20} /></button>
          <button type="button" ref={closeRef} aria-label="Fechar visualização ampliada" onClick={onClose} className="lightbox__close"><X weight="duotone" aria-hidden="true" size={18} /> Fechar</button>
        </div>
      </div>
      <div className="lightbox__body">
        <div className="lightbox__media">
          <Artwork key={w.id} work={w} className="lightbox__img" placeholderStyle={{ width: 'min(100%, 760px)', maxHeight: '72vh' }} />
        </div>
        <div className="lightbox__info">
          <h2 id="lb-title" className="lightbox__title">{w.title}</h2>
          <a href={w.artistHref} onClick={onClose} className="lightbox__artist">{w.artistName} →</a>
          {w.showOriginal && <span className="lightbox__original">Título original: <em>{w.original}</em></span>}
          <dl className="lightbox__facts">
            <dt>Data</dt><dd>{w.date}</dd>
            <dt>Técnica</dt><dd>{w.technique}</dd>
            <dt>Dimensões</dt><dd>{w.dims}</dd>
            <dt>Acervo</dt><dd>{w.location}</dd>
            <dt>Movimento</dt><dd>{w.movementName}</dd>
          </dl>
          <p className="lightbox__desc">{w.desc}</p>
          <p className="lightbox__fact"><span className="eyebrow eyebrow--sun">você sabia?</span> {w.fact}</p>
          <p className="license">
            {w.license}
            {w.filePage && <> <a href={w.filePage} target="_blank" rel="noopener" className="lightbox__source">Ver arquivo e licença</a></>}
          </p>
        </div>
      </div>
    </div>
  );
}
