import { useEffect, useState } from 'react';

// Rotas por hash (#/artistas/<slug>, #/obras?artista=…, #/visita/3) — funciona em qualquer hospedagem estática.
export function parseHash() {
  const h = (location.hash || '').replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const p = (path || '').split('/').filter(Boolean);
  const params = new URLSearchParams(qs || '');
  if (!p.length) return { name: 'home' };
  if (p[0] === 'artistas' && !p[1]) return { name: 'home', anchor: 'sec-artistas' };
  if (p[0] === 'movimentos') return { name: 'home', anchor: 'sec-movimentos' };
  if (p[0] === 'artistas') return { name: 'artist', slug: p[1] };
  if (p[0] === 'obras') return { name: 'obras', filters: { artist: params.get('artista') || '', movement: params.get('movimento') || '', period: params.get('periodo') || '' } };
  if (p[0] === 'sobre') return { name: 'sobre' };
  if (p[0] === 'visita') return { name: 'visita', room: Math.max(0, Math.min(9, (parseInt(p[1], 10) || 1) - 1)) };
  return { name: 'notfound' };
}

export function useHashRoute() {
  const [state, setState] = useState(() => ({ route: parseHash(), hash: location.hash, initial: true }));
  useEffect(() => {
    const onHash = () => setState({ route: parseHash(), hash: location.hash, initial: false });
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return state;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    onChange();
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
