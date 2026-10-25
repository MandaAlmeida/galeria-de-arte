// Reproduções das obras (src/assets/obras/<id>.*) e fotos dos artistas (src/assets/retratos/<slug>.*).
const obras = import.meta.glob('../assets/obras/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const retratos = import.meta.glob('../assets/retratos/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

const byName = (files) => Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
);

const OBRAS = byName(obras);
const RETRATOS = byName(retratos);

export const workImage = (id) => OBRAS[id] || '';
export const portraitImage = (slug) => RETRATOS[slug] || '';
