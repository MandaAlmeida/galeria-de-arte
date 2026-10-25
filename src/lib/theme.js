// Paletas de cada sala. THEMES: cores gerais da sala; VPAL: cores da página do artista
// (capa com textura, jornal e mural).
export const THEMES = {
  'vincent-van-gogh':  { bg: '#23389b', ink: '#f4efe6', acc: '#e9b24a', acc2: '#8fa6e0', soft: '#e6e9f4', deep: '#23389b' },
  'frida-kahlo':       { bg: '#d9694f', ink: '#1c1a22', acc: '#2f5d45', acc2: '#9c3a24', soft: '#f6e4dc', deep: '#9c3a24' },
  'tarsila-do-amaral': { bg: '#e7a9b9', ink: '#22183a', acc: '#3f6f4f', acc2: '#2f5fa8', soft: '#f6e8ec', deep: '#8e3456' },
  'leonardo-da-vinci': { bg: '#e6d8bb', ink: '#3a2a1a', acc: '#8a5a2b', acc2: '#6b4e2e', soft: '#f3ecdd', deep: '#7a4a22' },
  'claude-monet':      { bg: '#bcd5cc', ink: '#1d2b45', acc: '#8f86c4', acc2: '#3f6f4f', soft: '#eaf1ee', deep: '#3a5a8c' },
  'pablo-picasso':     { bg: '#d9a441', ink: '#1c1a22', acc: '#23389b', acc2: '#b8322a', soft: '#f6ecd6', deep: '#23389b' },
  'romero-britto':     { bg: '#d6457d', ink: '#1c1a22', acc: '#f2c230', acc2: '#2f8fc4', soft: '#f8e3ec', deep: '#a02a5c' },
  'candido-portinari': { bg: '#9e4a2c', ink: '#f4efe6', acc: '#2f5fa8', acc2: '#e9b24a', soft: '#f2e2d6', deep: '#8a3e22' },
  'anita-malfatti':    { bg: '#e5c04a', ink: '#1c1a22', acc: '#2e7a64', acc2: '#b8325f', soft: '#f8f0d4', deep: '#2e6e5a' },
  'edvard-munch':      { bg: '#1f2a40', ink: '#f4efe6', acc: '#d9692e', acc2: '#b8322a', soft: '#f6e4d9', deep: '#b4501f' }
};

export const FRAMES = ['#e9dfcc', '#e6e9f4', '#f3e1d9', '#e4eee9', '#f1e9d8', '#f3e3ea'];

export const VPAL = {
  'vincent-van-gogh':  { main: '#1d2f80', gold: '#d9a441', goldD: '#8a6220', box: '#6f6b3b', ink2: '#4b4a2a', patches: ['#e9a63a', '#3f6fb5', '#d9692e', '#f2d27a'], seed: 11, mast: 'Van Gogh', short: 'Van Gogh', stamp: { a: 'Arles', y: '1888', b: 'Provence' } },
  'frida-kahlo':       { main: '#1f5a3c', gold: '#e8a33d', goldD: '#9c3a24', box: '#7a2a1c', ink2: '#1f5a3c', patches: ['#2f7a4a', '#d9694f', '#e8a33d', '#9fc46a'], seed: 23, mast: 'Frida', short: 'Frida Kahlo', stamp: { a: 'Coyoacán', y: '1907', b: 'México' } },
  'tarsila-do-amaral': { main: '#2a5596', gold: '#f0c93c', goldD: '#8e3456', box: '#2f6b47', ink2: '#2a5596', patches: ['#7fb0e0', '#e7a9b9', '#f0c93c', '#3f8f5a'], seed: 37, mast: 'Tarsila', short: 'Tarsila', stamp: { a: 'São Paulo', y: '1922', b: 'Brasil' } },
  'leonardo-da-vinci': { main: '#4a3420', gold: '#c9a26a', goldD: '#7a4a22', box: '#5b4a32', ink2: '#4a3420', patches: ['#7a5a36', '#a88355', '#3c4a3a', '#d9c39a'], seed: 41, mast: 'Leonardo', short: 'Leonardo', stamp: { a: 'Firenze', y: '1452', b: 'Toscana' } },
  'claude-monet':      { main: '#2c4a6e', gold: '#b9a6e6', goldD: '#3a5a8c', box: '#3f6f4f', ink2: '#2c4a6e', patches: ['#7fb2a0', '#9d8fd8', '#e6b8c8', '#4f7fb0'], seed: 53, mast: 'Monet', short: 'Monet', stamp: { a: 'Giverny', y: '1883', b: 'France' } },
  'pablo-picasso':     { main: '#23389b', gold: '#d9a441', goldD: '#b8322a', box: '#2e2c33', ink2: '#23389b', patches: ['#d9a441', '#b8322a', '#5b6fc4', '#1c1a22'], seed: 61, mast: 'Picasso', short: 'Picasso', stamp: { a: 'Paris', y: '1907', b: 'Montmartre' } },
  'romero-britto':     { main: '#a02a5c', gold: '#f2c230', goldD: '#a02a5c', box: '#1c1a22', ink2: '#1f6f9c', patches: ['#f2c230', '#2f8fc4', '#d6457d', '#3fb07a'], seed: 71, mast: 'Britto', short: 'Romero Britto', stamp: { a: 'Recife', y: '1963', b: 'Brasil' } },
  'candido-portinari': { main: '#6e3018', gold: '#e9b24a', goldD: '#8a3e22', box: '#2f4f7a', ink2: '#6e3018', patches: ['#b5532e', '#2f5fa8', '#e9b24a', '#8a3e22'], seed: 83, mast: 'Portinari', short: 'Portinari', stamp: { a: 'Brodowski', y: '1903', b: 'São Paulo' } },
  'anita-malfatti':    { main: '#1e5a4c', gold: '#e5c04a', goldD: '#2e6e5a', box: '#8a2c4c', ink2: '#1e5a4c', patches: ['#2e7a64', '#e5c04a', '#b8325f', '#5aa0c0'], seed: 97, mast: 'Anita', short: 'Anita Malfatti', stamp: { a: 'São Paulo', y: '1917', b: 'Exposição' } },
  'edvard-munch':      { main: '#1f2a40', gold: '#e07a3a', goldD: '#b4501f', box: '#3a2a3a', ink2: '#1f2a40', patches: ['#d9692e', '#b8322a', '#3a5a8c', '#e9b24a'], seed: 109, mast: 'Munch', short: 'Munch', stamp: { a: 'Kristiania', y: '1893', b: 'Norge' } }
};

// [cor, border-radius, clip-path] do ícone de cada movimento na home.
export const MOV_STYLE = {
  'renascimento': ['#e6d8bb', '50%', 'none'],
  'impressionismo': ['#bcd5cc', '50%', 'none'],
  'pos-impressionismo': ['#23389b', '0', 'none'],
  'expressionismo': ['#d9692e', '0', 'polygon(50% 0,100% 100%,0 100%)'],
  'cubismo': ['#d9a441', '0', 'polygon(0 0,100% 20%,80% 100%,10% 80%)'],
  'arte-mexicana': ['#d9694f', '50% 0 50% 0', 'none'],
  'modernismo-br': ['#3f6f4f', '50% 50% 0 0', 'none'],
  'pop-art': ['#d6457d', '0', 'none']
};

// Cartões de artista na home: largura base, deslocamento vertical e altura da imagem.
export const CARD_BASES = ['440px', '300px', '340px', '300px', '420px', '320px', '300px', '440px', '320px', '360px'];
export const CARD_OFFSETS = ['0px', '40px', '10px', '60px', '0px', '30px', '50px', '0px', '20px', '44px'];

// Varal de obras (destaques e acervo).
export const WALL_OFFSETS = ['0px', '48px', '16px', '72px', '28px'];

// Mural de obras na página do artista.
export const MURAL_BASES = ['520px', '360px', '420px', '380px', '480px', '340px', '440px'];
export const MURAL_OFFSETS = ['0px', '56px', '20px', '0px', '64px', '24px', '40px'];
