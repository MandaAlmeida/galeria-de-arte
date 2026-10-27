# Galeria de Arte — Mestres da Pintura

Museu digital educativo sobre dez grandes nomes da pintura, do Renascimento à arte contemporânea. Cada artista tem uma "sala" própria com biografia, linha do tempo, estilo, obras, curiosidades, legado e referências.

Projeto orientado pela professora Bruna Neves.

## Artistas

Leonardo da Vinci · Claude Monet · Vincent van Gogh · Edvard Munch · Pablo Picasso · Anita Malfatti · Tarsila do Amaral · Cândido Portinari · Frida Kahlo · Romero Britto

## Funcionalidades

- **Página inicial** com movimentos artísticos e a galeria dos artistas.
- **Página de cada artista** com visual próprio (paleta de cores por sala).
- **Acervo de obras** com filtros por artista, período e movimento.
- **Visita virtual** que percorre as dez salas, navegável pelas setas do teclado.
- **Busca** por artista ou obra e **visualização ampliada** das imagens.
- Layout responsivo, com menu próprio para celular.

## Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vite.dev/)
- [Phosphor Icons](https://phosphoricons.com/)
- Fontes Instrument Serif e Bricolage Grotesque (via Fontsource)

## Como rodar

É preciso ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # gera a pasta dist/ para publicar
npm run preview   # serve a versão gerada em dist/
```

O `vite.config.js` usa `base: './'`, então a pasta `dist/` funciona em qualquer subpasta (por exemplo, no GitHub Pages).

## Rotas

O site usa rotas com `#`, sem necessidade de configurar o servidor:

| Rota | Página |
| --- | --- |
| `#/` | Início |
| `#/artistas/<slug>` | Sala de um artista |
| `#/obras` | Acervo de obras |
| `#/visita/<n>` | Visita virtual (salas 1 a 10) |
| `#/sobre` | Sobre o projeto |

## Estrutura

```
src/
├── App.jsx          rotas, busca, menu e visualização ampliada
├── pages/           uma página por rota
├── components/      cabeçalho, menu móvel, rodapé, lightbox, logo e imagem de obra
├── data/            conteúdo (artistas, obras, créditos)
├── lib/             utilitários, temas e mapeamento de imagens
├── assets/          imagens das obras e retratos
└── styles.css       estilos
```

## Onde editar o conteúdo

- `src/data/galeria.js` — artistas, obras, movimentos e referências.
- `src/data/creditos.js` — professora e créditos opcionais (escola, turma, estudantes, data de entrega). Campos vazios não aparecem no site.
- `src/assets/obras/<id-da-obra>.*` e `src/assets/retratos/<slug-do-artista>.*` — imagens; o nome do arquivo liga a imagem ao dado.
- `src/lib/theme.js` — cores de cada sala.

## Imagens e direitos autorais

As reproduções vêm do [Wikimedia Commons](https://commons.wikimedia.org/) e são de obras em domínio público. Obras ainda protegidas por direitos autorais não são reproduzidas: no lugar delas, o site mostra um espaço reservado identificado.

Este é um projeto educativo, sem fins comerciais.
