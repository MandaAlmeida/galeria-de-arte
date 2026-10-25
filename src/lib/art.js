import D from '../data/galeria.js';
import { workImage } from './images.js';

export const ARTISTS = D.artists.map((a, idx) => ({ ...a, idx }));
export const ARTIST_BY_SLUG = Object.fromEntries(ARTISTS.map((a) => [a.slug, a]));
export const WORK_BY_ID = Object.fromEntries(D.works.map((w) => [w.id, w]));

const CW = 'https://commons.wikimedia.org/wiki/';

export const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const pad2 = (n) => String(n).padStart(2, '0');

export function splitName(name) {
  if (name === 'Leonardo da Vinci') return ['Leonardo', 'da Vinci'];
  if (name === 'Vincent van Gogh') return ['Vincent', 'van Gogh'];
  if (name === 'Tarsila do Amaral') return ['Tarsila', 'do Amaral'];
  const parts = name.split(' ');
  return [parts[0], parts.slice(1).join(' ')];
}

// Dados derivados de uma obra para exibição: imagem, legenda, licença e rótulos de direitos.
export function describeWork(w, failed = false) {
  const artist = ARTIST_BY_SLUG[w.artist];
  const src = (w.img || w.local) && !failed ? workImage(w.id) : '';
  const movement = D.movements.find((m) => m.key === w.movement);
  return {
    ...w,
    artistName: artist.name,
    artistHref: '#/artistas/' + artist.slug,
    src,
    hasImg: !!src,
    alt: `${w.title}, de ${artist.name} (${w.date})`,
    ratio: String(w.ratio || 0.8),
    showOriginal: !!w.original && w.original !== w.title,
    movementName: movement ? movement.name : '',
    short: w.desc.split('. ')[0].replace(/\.$/, '') + '.',
    filePage: w.img ? CW + 'File:' + encodeURIComponent(w.img.replace(/ /g, '_')) : '',
    hasLocal: !!w.local && !w.img && !w.protectedUse,
    hasEduc: !!w.protectedUse,
    pendingPD: !w.img && !w.local && !!w.pdBR,
    isProtected: !w.img && !w.local && !w.pdBR,
    license: w.license
      ? w.license
      : w.local
        ? 'Domínio público (obra). Reprodução fotográfica de obra bidimensional em domínio público, enviada para este projeto.'
        : w.img
          ? (failed ? 'Não foi possível carregar a reprodução agora. ' : '') + D.licensePD
          : D.licenseProtected,
    phTitle: failed ? 'Imagem indisponível' : w.pdBR ? 'Imagem a adicionar' : 'Imagem não reproduzida',
    phText: failed ? 'A reprodução não carregou' : w.pdBR ? 'Domínio público no Brasil — reprodução ainda não adicionada' : 'Obra protegida por direitos autorais'
  };
}

// Largura base de cada obra no varal: a primeira de cada cinco e as paisagens largas ganham mais espaço.
export const wallBasis = (w, i) => (i % 5 === 0 || w.ratio > 1.3 ? '460px' : i % 3 === 1 ? '300px' : '260px');

// Borda de papel rasgado: polígono pseudoaleatório e estável a partir de uma semente.
export function torn(seed, depth = 1.3) {
  let r = (seed * 7919) % 233280;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const pts = [];
  for (let p = 0; p <= 100; p += 2.5) pts.push(p + '% ' + (rnd() * depth).toFixed(2) + '%');
  for (let p = 3; p <= 97; p += 3) pts.push((100 - rnd() * depth * 0.7).toFixed(2) + '% ' + p + '%');
  for (let p = 100; p >= 0; p -= 2.5) pts.push(p + '% ' + (100 - rnd() * depth).toFixed(2) + '%');
  for (let p = 97; p >= 3; p -= 3) pts.push((rnd() * depth * 0.7).toFixed(2) + '% ' + p + '%');
  return 'polygon(' + pts.join(',') + ')';
}

// Textura de tinta (SVG com turbulência) usada como fundo da capa e do mural.
const paintCache = {};
export function paint(base, patches, seed) {
  const key = base + patches.join('') + seed;
  if (paintCache[key]) return paintCache[key];
  const rgb = (h) => [1, 3, 5].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3));
  let svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800' preserveAspectRatio='none'><rect width='1200' height='800' fill='" + base + "'/>";
  patches.forEach((c, i) => {
    const [r, g, b] = rgb(c);
    svg += "<filter id='p" + i + "' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='" + (0.0022 + i * 0.0012).toFixed(4) + ' ' + (0.006 + i * 0.002).toFixed(4) + "' numOctaves='5' seed='" + (seed + i * 7) + "'/><feColorMatrix values='0 0 0 0 " + r + ' 0 0 0 0 ' + g + ' 0 0 0 0 ' + b + " 0 0 0 5.5 -2.5'/></filter><rect width='1200' height='800' filter='url(#p" + i + ")'/>";
  });
  svg += "<filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='turbulence' baseFrequency='0.7 0.18' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.16 0'/></filter><rect width='1200' height='800' filter='url(#g)'/></svg>";
  return (paintCache[key] = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")');
}

export function scrollToId(id, extraOffset = 12) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hdr = document.querySelector('header');
  const hh = hdr ? hdr.getBoundingClientRect().height : 64;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - hh - extraOffset, behavior: reduce ? 'auto' : 'smooth' });
}
