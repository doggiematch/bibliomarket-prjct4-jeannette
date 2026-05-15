# Backlog de Bibliomarket

Ideas y mejoras pendientes para futuras iteraciones del proyecto.

## Prioridad alta

### Mensajería entre usuarios

Implementar un sistema de mensajes internos entre comprador y vendedor para que puedan coordinar la reserva, la entrega o posibles dudas sin mostrar datos de contacto directamente.

### Mejoras de frontend y responsive

Pulir la experiencia visual de la aplicación, revisar espaciados, estados vacíos, formularios y adaptación a móvil/tablet. El objetivo es que la app se sienta cómoda tanto para publicar libros como para consultarlos.

### API de libros más rápida y con más catálogo

Investigar una alternativa o complemento a Open Library, ya que algunas respuestas pueden ser lentas o incompletas. La mejora ideal sería mantener el autocompletado de datos del libro, pero con resultados más rápidos y fiables.

## Prioridad media

### Exportar anuncio para Wallapop u otras plataformas

Crear un endpoint tipo `GET /books/:id/export` que devuelva el texto del libro formateado y listo para copiar en Wallapop, Milanuncios u otras plataformas.

Ejemplo de contenido exportado:

```txt
Título: ...
Autor: ...
Estado: ...
Precio: ...
Descripción: ...
```

### Bibliotecas públicas y privadas

Permitir que cada usuario marque su biblioteca como pública o privada. Si es pública, otros usuarios podrían consultar sus libros publicados; si es privada, solo se mostrarían los libros disponibles en el listado general.

### Géneros favoritos en el registro

Añadir al registro la posibilidad de seleccionar géneros favoritos. Esta información podría usarse después para personalizar la experiencia del usuario.

### Libro recomendado en Home

Mostrar en la Home un libro aleatorio o recomendado según los géneros favoritos del usuario. Si el usuario no ha iniciado sesión, se podría mostrar un libro disponible al azar.

## Prioridad baja

### Regateo

Crear un sistema de ofertas y contraofertas entre comprador y vendedor. Serviría para negociar el precio antes de confirmar la reserva o compra.

### Sistema de valoraciones

Añadir valoraciones entre usuarios después de una venta o intercambio. Podría incluir:

- Puntuación numérica.
- Comentario breve.
- Fecha de la valoración.
- Relación con una reserva o transacción.

Esta idea queda pendiente porque no es necesaria para el MVP, pero puede aportar confianza entre particulares.

### Intercambio de libros

Permitir que un usuario proponga intercambiar un libro en lugar de comprarlo. Para reducir riesgos, esta opción estaría pensada solo para entregas en persona.

### Compra segura

Integrar una pasarela de pago como Stripe o similar. Esta funcionalidad queda como mejora avanzada porque implica mayor complejidad legal, técnica y de seguridad.

## Notas

El foco actual de Bibliomarket sigue siendo la compraventa de libros de segunda mano entre particulares. Las mejoras del backlog deben respetar esa idea: cada usuario gestiona su propia biblioteca y decide qué libros publica, reserva, guarda como favoritos o intercambia.
