---
name: Lournar Coffee Design System
colors:
  surface: '#fdf8f7'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f1'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e0'
  on-surface: '#1c1b1b'
  on-surface-variant: '#484740'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#79776f'
  outline-variant: '#c9c6bd'
  surface-tint: '#605e5b'
  primary: '#605e5b'
  on-primary: '#ffffff'
  primary-container: '#faf6f1'
  on-primary-container: '#72706d'
  inverse-primary: '#c9c6c1'
  secondary: '#625e55'
  on-secondary: '#ffffff'
  secondary-container: '#e8e2d7'
  on-secondary-container: '#68645b'
  tertiary: '#615d5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#fbf5f7'
  on-tertiary-container: '#737072'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e2dd'
  primary-fixed-dim: '#c9c6c1'
  on-primary-fixed: '#1c1c19'
  on-primary-fixed-variant: '#484743'
  secondary-fixed: '#e8e2d7'
  secondary-fixed-dim: '#ccc6bb'
  on-secondary-fixed: '#1e1b15'
  on-secondary-fixed-variant: '#4a463f'
  tertiary-fixed: '#e7e1e3'
  tertiary-fixed-dim: '#cac5c7'
  on-tertiary-fixed: '#1d1b1d'
  on-tertiary-fixed-variant: '#494648'
  background: '#fdf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e0'
  ink-primary: '#2C2418'
  ink-secondary: '#6B5D4F'
  accent-espresso: '#8B6F47'
  accent-caramel: '#D4B896'
  botanical-olive: '#5C6B4F'
  terracotta-red: '#B85C3D'
  shadow-soft: rgba(44, 36, 24, 0.06)
  shadow-lift: rgba(44, 36, 24, 0.12)
  shadow-deep: rgba(44, 36, 24, 0.18)
typography:
  hero-lg:
    fontFamily: Newsreader
    fontSize: 42px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  product-title:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.3'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  micro-label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    letterSpacing: 0.08em
  price-display:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 24px
  section-gap: 40px
  item-gap: 16px
  gutter-compact: 8px
---

Diseña una aplicación web móvil de pedidos para una cafetería de especialidad llamada "Lournar Coffee". El usuario llega aquí desde un link de WhatsApp, por lo que la transición debe sentirse continua, ligera y nada intimidante — como si siguiera dentro de una conversación, no como si hubiera entrado a un "sitio de e-commerce".

═══════════════════════════════
FILOSOFÍA DEL DISEÑO
═══════════════════════════════

Esta NO es una app de delivery genérica tipo Uber Eats o Rappi. Es una experiencia premium artesanal — la versión digital de entrar a una cafetería boutique donde el barista te conoce. El diseño debe sentirse "slow" (calmado, sin prisa visual) pero las interacciones deben ser ultrarrápidas (cero fricción para pedir).

Inspiración: Blue Bottle Coffee app, Stumptown, Verve Coffee, la app de Aesop, el branding de Mast Chocolate. NO inspirado en: Starbucks, McDonald's, apps de delivery convencionales.

═══════════════════════════════
PALETA DE COLORES EXACTA
═══════════════════════════════

Primarios:
- Fondo principal: #FAF6F1 (crema cálido, casi marfil)
- Fondo secundario: #F2EBE0 (beige más profundo, para tarjetas)
- Tinta principal: #2C2418 (café tinto oscuro, NO negro puro)
- Tinta secundaria: #6B5D4F (taupe medio para texto auxiliar)

Acentos:
- Acento café: #8B6F47 (café espresso, para botones primarios)
- Acento crema: #D4B896 (caramelo suave, para hover y highlights)
- Verde botánico: #5C6B4F (oliva apagado, MUY sutil, solo para confirmaciones)
- Rojo terracota: #B85C3D (solo para alertas o eliminar items)

Sombras:
- Sombra sutil: rgba(44, 36, 24, 0.06)
- Sombra elevada: rgba(44, 36, 24, 0.12)
- Sombra profunda: rgba(44, 36, 24, 0.18)

NO usar: gradientes saturados, colores fluorescentes, blanco puro, negro puro, sombras grises azuladas.

═══════════════════════════════
TIPOGRAFÍA
═══════════════════════════════

- Titulares grandes (hero): "Fraunces" serif, peso 400, con eje variable optical para fuentes serif modernas. Tamaño 36-48px, line-height 1.1, letter-spacing -0.02em.
- Subtítulos: "Fraunces" serif, peso 500, tamaño 22-28px.
- Cuerpo: "Inter" sans-serif, peso 400, tamaño 15-16px, line-height 1.6.
- Microcopy y labels: "Inter" peso 500, tamaño 12-13px, letter-spacing 0.04em, EN MAYÚSCULAS para etiquetas pequeñas.
- Precios: "Fraunces" peso 500 con números tabulares, tamaño 18-22px.

La mezcla serif/sans-serif es clave: serif para emociones (nombre del producto, hero), sans-serif para información (precios, botones, formularios).

═══════════════════════════════
PANTALLAS A DISEÑAR (FLUJO COMPLETO)
═══════════════════════════════

PANTALLA 1: BIENVENIDA (Landing post-WhatsApp)
─────────────────────────────────────────────
- Header con altura 35vh: imagen de fondo de un café latte art visto desde arriba, con un overlay sutil cream a #FAF6F1 con gradient hacia abajo (no para "oscurecer la imagen" sino para fusionar con el fondo de la app).
- Sobre la imagen: logo "Lournar Coffee" en Fraunces 32px peso 400, color #FAF6F1 con sombra muy sutil.
- Debajo del header, en el cuerpo crema: 
  • Saludo personalizado: "Buenos días," con la hora actual del usuario (auto-detectar: "Buenas tardes" / "Buenas noches")
  • Pregunta principal: "¿Cómo te gustaría tu pedido hoy?" en Fraunces 28px
- Dos tarjetas grandes lado a lado (o stacked en móvil pequeño):
  
  TARJETA A — "RECOGER EN TIENDA"
  • Ícono: marca de tienda dibujado a mano (line art, no Material Icons)
  • Texto: "Recoger en tienda"
  • Subtexto: "Listo en 10-15 min"
  • Border: 1px solid rgba(44,36,24,0.1)
  • Background: #F2EBE0
  • Al hover: el border se vuelve #8B6F47 y la tarjeta hace lift sutil (translateY -2px con sombra)
  
  TARJETA B — "ENVÍO A DOMICILIO"
  • Ícono: bicicleta de delivery line art
  • Texto: "Envío a domicilio"
  • Subtexto: "30-45 min según zona"
  • Mismo estilo que A

- Al fondo, en footer mínimo: "Calle Araucarias, Indeco Animas · Xalapa" en Inter 12px color taupe.

DETALLE CLAVE: Esta pantalla debe sentirse como "abrir una puerta a una cafetería", no como "abrir una app". La imagen del café arriba es el "escaparate".

─────────────────────────────────────────────
PANTALLA 2: MENÚ (CATÁLOGO)
─────────────────────────────────────────────
- Sticky header minimalista (60px de alto): a la izquierda flecha back en line art, centro "Menú" en Fraunces, derecha pequeña burbuja con contador de carrito (aparece solo si hay items, con micro-animación de bump al agregar).
- Justo debajo del header, barra de filtros HORIZONTAL scrollable de categorías:
  
  [Todo] [Cafés calientes] [Cafés fríos] [Tés & infusiones] [Repostería] [Sándwiches] [Hamburguesas] [Bowls & ensaladas] [Bebidas naturales]
  
  • Pills de 36px de alto, border-radius pill (18px), background #F2EBE0, texto Inter 13px.
  • Pill activa: background #2C2418, texto #FAF6F1.
  • Transición entre pills: 250ms cubic-bezier(0.4, 0, 0.2, 1).

- Cuerpo del menú: lista de productos en formato CARD VERTICAL, no grid.
  
  CADA TARJETA DE PRODUCTO:
  • Layout: imagen cuadrada 100x100px a la izquierda, contenido a la derecha.
  • Imagen: bordes redondeados 12px, foto real del producto (NO ilustraciones, NO renders 3D, fotografía editorial estilo flat-lay con luz natural lateral).
  • A la derecha: 
    - Nombre del producto en Fraunces 18px peso 500
    - Descripción breve en Inter 13px color taupe, MAX 2 líneas con ellipsis
    - Línea inferior: precio en Fraunces 18px + botón redondo "+" de 32px en café espresso a la derecha
  • Separadores entre tarjetas: línea hairline 0.5px color rgba(44,36,24,0.08), no border completo.
  • Sin sombras en las tarjetas (la lista debe respirar).

- IMÁGENES SUGERIDAS A USAR (que Stitch genere o coloque placeholders fotográficos):
  • Cappuccino con latte art en taza de cerámica beige
  • Iced latte en vaso de cristal con hielo
  • Croissant artesanal sobre tabla de madera
  • Sándwich gourmet en pan de masa madre
  • Hamburguesa premium con papas
  • Bowl de açaí con frutos rojos
  • Pastel de zanahoria con frosting

─────────────────────────────────────────────
PANTALLA 3: DETALLE DE PRODUCTO (Modal o sheet)
─────────────────────────────────────────────
Esta pantalla se abre como BOTTOM SHEET que desliza desde abajo, ocupando 90vh, con esquinas superiores redondeadas 24px y un "handle" gris pequeño arriba (4px x 32px). No es una pantalla completa, mantiene el menú visible detrás con un overlay sutil.

- Imagen hero: 280px de alto, full width, fotografía editorial del producto.
- Below image, padding 24px:
  • Nombre: Fraunces 28px
  • Descripción larga: Inter 14px line-height 1.7, color taupe
  • Sección "PERSONALIZA TU [PRODUCTO]" con label en Inter 12px uppercase letter-spacing 0.08em color #8B6F47.

PERSONALIZACIÓN — Cada opción es una sección con título:

  TAMAÑO (radio buttons custom, NO los nativos):
  ○ Chico (8oz)  +$0
  ○ Mediano (12oz)  +$10
  ● Grande (16oz)  +$20    ← seleccionado
  
  Los radio buttons son círculos de 20px con borde 1.5px. Cuando se seleccionan: fill color café espresso con check blanco interno, animación spring 400ms.

  TIPO DE LECHE (radio):
  ● Entera (incluida)
  ○ Deslactosada  +$0
  ○ Almendras  +$15
  ○ Avena  +$15
  ○ Coco  +$15

  EXTRAS (checkboxes — pueden combinarse):
  ☐ Shot extra de espresso  +$15
  ☐ Sirope de vainilla  +$10
  ☐ Sirope de caramelo  +$10
  ☐ Sirope de avellana  +$10
  ☐ Crema batida  +$8
  
  Los checkboxes son cuadrados 20px border-radius 6px. Al marcarse: fill café espresso con check blanco, ANIMACIÓN: el check se dibuja como path SVG en 250ms (no aparece de golpe).

  AZÚCAR (slider visual):
  Sin azúcar ●────────────── Extra dulce
                  ↑
              (con marcadores: Sin / Poco / Normal / Extra)

  NOTAS PARA EL BARISTA (textarea opcional):
  Placeholder: "Ej: sin espuma, extra caliente, etc."
  Max 100 caracteres con contador visible.

  CANTIDAD (stepper):
  [ − ]  1  [ + ]
  Stepper limpio, botones circulares 36px, número en Fraunces 22px al centro.

- BOTÓN FIJO INFERIOR (sticky):
  "Agregar al pedido · $XX"  
  Full width, altura 56px, background #2C2418, texto #FAF6F1 en Inter 15px peso 500.
  El precio se actualiza en tiempo real conforme se eligen opciones (animación de número que cuenta, 200ms).
  Al tap: vibración háptica suave (especificar en spec) + animación de "✓ Agregado" que reemplaza el botón por 800ms con check verde botánico, luego cierra el sheet.

─────────────────────────────────────────────
PANTALLA 4: CARRITO / CONFIRMAR
─────────────────────────────────────────────
- Header: back arrow + "Tu pedido" + ícono de tacho para vaciar (con confirmación).
- Lista de items en formato compacto:
  
  CAFÉ LATTE
  Grande · Leche de avena · Sin azúcar
  Notas: "Extra caliente"
  
  [−] 2 [+]                          $130
  ─────────────────────
  
  Cada item swipeable a la izquierda revela "Eliminar" en rojo terracota.

- Sección "TIPO DE ENTREGA" (recordar la elección de pantalla 1 pero permitir cambiar):
  Toggle bonito de dos opciones: [Recoger] [Envío a domicilio]
  
  Si es RECOGER:
  • Solo pide: Nombre y Teléfono (auto-rellenado desde WhatsApp si es posible — mostrar campo con check verde "✓ Detectado de WhatsApp" si está auto-rellenado).
  • Muestra mapa pequeño con la ubicación de la tienda y un "tiempo estimado: 12 minutos".
  
  Si es ENVÍO:
  • Pide: Nombre, Teléfono, Dirección (calle, número, colonia), Código Postal, Referencias.
  • Al ingresar CP, automáticamente muestra "Zona: Centro · Envío $50" o la zona correspondiente.
  • Inputs con label flotante (Material Design style pero más sutil), border bottom 1px que se vuelve café espresso al focus.

- Sección "MÉTODO DE PAGO":
  Tres tarjetas seleccionables (radio cards grandes):
  
  💵 EFECTIVO
     Paga al recibir / recoger
  
  💳 TARJETA
     Paga al recibir con terminal
  
  🏦 TRANSFERENCIA
     Recibirás los datos al confirmar
  
  Cada tarjeta tiene ícono custom (no emoji genérico), texto, y al seleccionarse muestra border café espresso 2px con leve glow interno.

- Si selecciona TRANSFERENCIA, expande sección con:
  • Datos bancarios (banco, cuenta, CLABE, titular)
  • Botón "Copiar datos" en cada uno con feedback "✓ Copiado" al tap
  • Área de "Subir comprobante" con drag&drop visual y botón "Tomar foto" o "Elegir archivo"
  • Aviso amable: "Tu pedido se confirmará al recibir tu comprobante"

- Resumen final (sticky bottom card):
  
  Subtotal           $245
  Envío              $50
  ─────────────
  TOTAL              $295    ← Fraunces 24px
  
  [   Confirmar pedido   ]   ← Botón full width 56px

─────────────────────────────────────────────
PANTALLA 5: CONFIRMACIÓN (Post-pedido)
─────────────────────────────────────────────
Esta pantalla debe sentirse CELEBRATORIA pero elegante, no ruidosa.

- Animación de entrada: confetti SUTIL de partículas color crema y caramelo que caen 1.5 segundos y desaparecen. NO confetti colorido tipo party.
- Centro de pantalla:
  • Ícono grande de check dibujado a mano (no ✓ tipográfico) en círculo crema #D4B896. El check se dibuja con animación SVG path de 600ms.
  • Título: "Pedido recibido" en Fraunces 32px
  • Subtítulo: "Estamos preparando tu pedido con amor" en Inter 15px color taupe.
- Tarjeta con info:
  • # de pedido: "L-2026-0142" (corto y memorable)
  • Tiempo estimado: countdown live "Listo en aprox. 14 minutos"
  • Items resumidos
- Sección "QUÉ SIGUE":
  Timeline vertical con 4 estados:
  ● Confirmado (activo)
  ○ En preparación
  ○ Listo / En camino
  ○ Entregado
  Cada estado tiene ícono pequeño + label. Los puntos cambian de color (de gris taupe a café espresso) al avanzar.
- Botón secundario: "Volver al inicio"
- Botón terciario: "Compartir mi pedido por WhatsApp" — abre WhatsApp con un texto pre-llenado.

═══════════════════════════════
MICROINTERACCIONES Y EFECTOS
═══════════════════════════════

ESPECIFICACIONES EXACTAS DE ANIMACIÓN:

1. Transiciones entre pantallas: 
   - Pantalla 1 → 2: slide horizontal 350ms ease-out-quart, con leve fade.
   - Apertura de bottom sheet (detalle producto): spring animation, 450ms, easing custom (mass 1, damping 25).
   - Cierre de sheet: 300ms ease-in.

2. Botones:
   - Tap: scale 0.97 + brightness 0.95 durante 150ms, luego return.
   - En el botón principal de checkout, después del tap exitoso, breve pulse animation con anillo expansivo color crema.

3. Cards de productos:
   - Aparición inicial: stagger fade-in-up, cada card aparece con 50ms de delay entre sí (primera card 0ms, segunda 50ms, tercera 100ms, etc.).
   - Hover (desktop) / press (móvil): translateY(-2px) + sombra aumenta, transición 200ms.

4. Agregar al carrito:
   - El ícono "+" se transforma en check ✓ durante 600ms.
   - El contador del carrito en header hace bump animation (scale 1 → 1.3 → 1, 350ms spring).
   - Pequeña partícula "ghost" del item que vuela hacia el ícono del carrito (curva bezier, 500ms).

5. Inputs:
   - Label flotante: cuando el input recibe focus, el placeholder sube a ser label con escala 0.85 y color cambia a café espresso, 200ms.
   - Validación: cuando el CP es válido y carga la zona de envío, animación de slide-down del precio del envío con check verde botánico.

6. Carga de imágenes:
   - Skeleton screens con shimmer effect en color taupe muy claro, NO spinners.
   - Fade-in de imagen real al cargar, 400ms.

7. Scroll:
   - El header se hace más compacto al scrollear (de 60px a 48px), backdrop-filter blur(20px) con fondo semitransparente crema.
   - Smooth scroll en toda la app.

8. Estados vacíos:
   - Carrito vacío: ilustración line-art de taza vacía + texto "Aún no has agregado nada · Empieza con un café"
   - Sin conexión: ilustración line-art de nube + "Sin conexión · Tu pedido se guardará cuando vuelvas"

9. Haptic feedback (especificar en design notes):
   - Light haptic: al tap en cualquier botón
   - Medium haptic: al confirmar pedido
   - Success haptic: al recibir confirmación

═══════════════════════════════
DETALLES "HUMANOS" QUE EVITAN LA SENSACIÓN DE IA GENÉRICA
═══════════════════════════════

Estos detalles son CRÍTICOS — son lo que distingue diseño humano de diseño automatizado:

1. ASIMETRÍAS INTENCIONALES:
   - En pantalla 1, la imagen de café arriba está LIGERAMENTE descentrada (5% a la derecha) para sentirse foto, no producto.
   - El logo está alineado a la izquierda, NO centrado.

2. IMPERFECCIONES TIPOGRÁFICAS:
   - Algunos titulares tienen ligaturas activadas en Fraunces (especialmente "ff", "fi").
   - Usar comillas tipográficas correctas ("texto") no las rectas ("texto").
   - Usar el carácter "·" (middle dot) como separador en lugar de "|" en muchos lugares.

3. ESPACIADOS QUE RESPIRAN:
   - Padding general de la app: 24px (no 16, no 20 — exactamente 24).
   - Entre secciones: 40px de espacio.
   - Esto se siente "editorial", no "app de e-commerce comprimida".

4. COPYWRITING CON ALMA:
   - En lugar de "Selecciona un producto" → "Elige tu próximo café"
   - En lugar de "Carrito (3)" → "Tu pedido · 3 items"
   - En lugar de "Error al procesar" → "Algo no salió bien, ¿reintentamos?"
   - En lugar de "Confirmar" → "Confirmar mi pedido"
   - Mensaje del barista al final del pedido: incluir un detalle como "P.D. Hoy preparamos pan recién horneado, pregunta por la pieza del día."

5. ILUSTRACIONES LINE-ART CUSTOM:
   - Todos los íconos auxiliares dibujados a mano (no Material Icons, no Feather Icons genéricos).
   - Trazo de 1.5px, esquinas ligeramente redondeadas, estilo "sketch limpio".

6. FOTOGRAFÍA ESPECÍFICA:
   - Toda la fotografía tiene la misma temperatura de color (cálida, 4500K aprox).
   - Mismo estilo: luz natural, sombras suaves, fondos de madera o lino.
   - NUNCA usar fotos de stock genéricas con luz fluorescente o fondos blancos clínicos.

7. SUTILES PATRONES DE TEXTURA:
   - En el fondo principal #FAF6F1, agregar un noise texture sutil (opacity 0.02) que solo se nota si miras de cerca. Esto evita que el color plano se sienta "digital".

8. DETALLES DE MARCA EN MICROCOPY:
   - Footer: "Lournar Coffee · Tostado en Xalapa desde [año]"
   - Loading state del pedido: "Moliendo granos..." en lugar de "Cargando..."
   - Empty state de búsqueda: "Hmm, no encontramos eso. ¿Otro café?"

═══════════════════════════════
ESPECIFICACIONES MÓVILES
═══════════════════════════════

- Diseño MOBILE-FIRST. Optimizar para iPhone 14/15 (393x852) y Android estándar (412x915).
- Safe areas: respetar notch superior y home indicator inferior.
- Botones primarios: mínimo 48px de altura para tap targets.
- Texto mínimo: 13px (nunca menos, accesibilidad).
- Soporte gestos:
  • Swipe back en cualquier pantalla
  • Pull to refresh en menú
  • Swipe left para eliminar items del carrito
  • Pinch zoom en imágenes de producto

═══════════════════════════════
MODO OSCURO (OPCIONAL PERO BIENVENIDO)
═══════════════════════════════

Si Stitch puede generarlo:
- Fondo principal: #1A1612 (café muy oscuro, no negro)
- Fondo secundario: #2C2418
- Tinta principal: #FAF6F1
- Mantener los acentos (café espresso, crema) con leve ajuste de saturación para legibilidad.

═══════════════════════════════
RESUMEN DEL TONO EMOCIONAL
═══════════════════════════════

El usuario debe sentir:
- "Esto se ve cuidado, alguien pensó en cada detalle"
- "Es rápido pero no apresurado"
- "Parece premium pero no pretencioso"
- "Quiero pedir aquí seguido"

El usuario NO debe sentir:
- "Es una app más de delivery"
- "Esto lo hizo una IA"
- "Hay demasiada información"
- "Me están vendiendo agresivamente"

═══════════════════════════════
ENTREGA
═══════════════════════════════

Genera las 5 pantallas principales en vista mobile vertical (393x852px). Si es posible, también vista tablet (768x1024). Incluye el design system completo (paleta, tipografía, componentes reutilizables) en un frame separado.

Diseña como si fuera para un cliente boutique que paga $50,000 USD por el branding completo, no para un MVP genérico.