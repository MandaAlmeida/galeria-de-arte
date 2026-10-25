// Créditos opcionais exibidos na home e em "Sobre o projeto". Campos vazios não aparecem.
export const PROFESSORA = 'Bruna Neves';

export const CREDITOS_EXTRAS = [
  ['Escola', ''],
  ['Turma', ''],
  ['Estudantes', ''],
  ['Data de entrega', '']
].filter(([, value]) => value).map(([label, value]) => ({ label, value }));
