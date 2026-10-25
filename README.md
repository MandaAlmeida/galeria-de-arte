# Galeria de Arte — Mestres da Pintura (React)

Versão em React + Vite do museu digital educativo.

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera a pasta dist/ para publicar
```

## Onde editar

- `src/data/galeria.js` — artistas, obras, movimentos e referências.
- `src/data/creditos.js` — professora e créditos opcionais (escola, turma, estudantes, data de entrega).
- `src/assets/obras/<id-da-obra>.*` e `src/assets/retratos/<slug-do-artista>.*` — imagens; o nome do arquivo liga a imagem ao dado.
- `src/lib/theme.js` — cores de cada sala.
- `src/styles.css` — estilos.

## Estrutura

- `src/App.jsx` — rotas (`#/`, `#/artistas/<slug>`, `#/obras`, `#/sobre`, `#/visita/<n>`), busca, menu e visualização ampliada.
- `src/pages/` — uma página por rota.
- `src/components/` — cabeçalho, menu móvel, rodapé, visualização ampliada e imagem de obra.
