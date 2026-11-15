# AutoCapital — propuesta de rediseño (demo)

Propuesta de diseño para autocapital.com.co, construida como sitio estático Astro para revisión. El sitio en producción sigue en WordPress; esta demo sirve como referencia visual y de estructura.

Páginas: Inicio (con ¿Quiénes somos? y contacto), Catálogo, Vende tu carro, Consignación y Financiación.

- Formularios sin backend: arman un mensaje y abren WhatsApp.
- Inventario: snapshot del catálogo actual en `src/data/inventory.ts`.
- La demo no se indexa (`PUBLIC_NOINDEX=true` en el workflow de GitHub Pages).

```bash
npm install
npm run dev
```
