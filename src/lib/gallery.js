import { createContext, useContext } from 'react';

// Estado compartilhado pelas páginas: layout estreito, imagens que falharam e o visualizador ampliado.
export const GalleryContext = createContext(null);
export const useGallery = () => useContext(GalleryContext);
