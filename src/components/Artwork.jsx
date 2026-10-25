import { useGallery } from '../lib/gallery.js';

// Reprodução de uma obra. Se a imagem não existir ou falhar ao carregar, mostra um espaço reservado
// identificado com a proporção da obra.
export default function Artwork({ work, className = 'artwork', style, placeholderStyle }) {
  const { fail } = useGallery();
  if (work.hasImg) {
    return <img src={work.src} alt={work.alt} loading="lazy" className={className} style={style} onError={() => fail(work.id)} />;
  }
  return (
    <span className="artwork-placeholder" style={{ aspectRatio: work.ratio, ...placeholderStyle }} role="img" aria-label={`${work.title}: ${work.phTitle.toLowerCase()}`}>
      <span className="artwork-placeholder__title">{work.phTitle}</span>
      <span className="artwork-placeholder__text">{work.phText}</span>
    </span>
  );
}
