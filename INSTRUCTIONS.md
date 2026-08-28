# 🏋️‍♂️ Coach Sports & Fitness Dashboard

## 1. Objetivo

Aplicación web moderna para la gestión de un gimnasio llamada **"Coach Sports & Fitness"**, modularizando las vistas, componentes e integración de APIs a partir del diseño y arquitectura requerida.

---

## 2. Stack Tecnológico Obligatorio

### 🎨 Frontend (`./frontend` o `./gym-react`)

- **Runtime / Bundler:** Vite (última versión).
- **Framework:** React (versión moderna) utilizando archivos **JavaScript puro (`.jsx`)**.
- **Estilos:** Tailwind CSS v4 o CSS Modules / Variables CSS globales (`index.css`).
- **Iconografía:** Componentes SVG inline dedicados o Lucide-React / React Icons.
- **Gestión de Estado y Ciclo de Vida:** Hooks nativos de React (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`).

### ⚙️ Backend (`./backend`)

- **Lenguaje / Framework:** Java 17+ / Spring Boot 3+
- **Seguridad:** Spring Security + JWT (JSON Web Tokens)
- **Persistencia & ORM:** Spring Data JPA / Hibernate
- **Base de Datos:** PostgreSQL
- **Gestor de Dependencias:** Maven

---

## 🎨 3. Paleta de Colores (Electric Blue Palette)

El proyecto utiliza un sistema de color basado en un tono azul eléctrico vibrante neón sobre superficies oscuras profundas estilo cyber-sport.

### 🔹 Colores de Marca y Acentos (Brand Colors)

- **`--brand-blue` (`#00BFFF`)**: Azul Eléctrico Primario (Deep Sky Blue). Se utiliza para botones primarios, iconos activos, bordes destacados y títulos principales.
- **`--brand-blue-light` (`#33CFFF`)**: Azul Eléctrico Claro. Se usa en estados `:hover`, brillos intensos y resplandores encendidos.
- **`--brand-blue-dark` (`#0099CC` / `#0077CC`)**: Azul Eléctrico Oscuro. Utilizado en gradientes oscuros de botones y sombras profundas.
- **`--brand-blue-glow` (`rgba(0, 191, 255, 0.25)`)**: Resplandor neón medio para sombras y auras alrededor de tarjetas o botones.
- **`--brand-blue-faint` (`rgba(0, 191, 255, 0.08)`)**: Tinta azul sutil para fondos de items al pasar el cursor (`:hover`), active states o badges.

### 🖤 Fondos Oscuros y Superficies (Dark Base Palette)

- **`--bg-base` (`#080c14`)**: Fondo base de la aplicación. Azul oscuro/negro profundo futurista.
- **`--bg-surface` (`#0e1420`)**: Fondo de contenedores y áreas secundarias.
- **`--bg-card` (`#111827`)**: Fondo de tarjetas primarias, modales y barra de navegación lateral (Tailwind `slate-900`/`gray-900`).
- **Fondo de Tarjeta Traslúcida**: `rgba(17, 24, 39, 0.6)` combinado con `backdrop-blur`.

### 🌫️ Bordes y Delimitadores (Borders)

- **`--border-subtle` (`rgba(0, 191, 255, 0.12)`)**: Bordes sutiles para separadores o tablas.
- **`--border-medium` (`rgba(0, 191, 255, 0.25)`)**: Bordes principales de contenedores, modales y navegación.
- **Borde de Acento Superior**: `border-top: 3px solid #00BFFF` (utilizado en tarjetas de planes destacados y contenedores especiales).

### ⚪ Texto y Neutrales (Typography Colors)

- **Texto Principal**: `#FFFFFF` (Blanco puro para títulos principales y texto de alta visibilidad).
- **Texto Secundario**: `#9CA3AF` (Gris 400 para subtítulos, fechas, labels e iconos inactivos).
- **Texto en Contenedores Oscuros Especiales**: `#171717` (Negro/Gris muy oscuro para selects/inputs específicos si aplica).

---

## 🔤 4. Tipografías (Typography)

Se importan desde Google Fonts:

```css
@import url("https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,700;1,800;1,900&family=Inter:wght@300;400;500;600;700;800&display=swap");
```

1. **`Inter` (Tipografía Principal / Body)**
   - **Fuente**: `'Inter', sans-serif`
   - **Pesos**: `300` (Light), `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
   - **Uso**: Textos del cuerpo, tablas, formularios, botones y navegación general.

2. **`Barlow` (Tipografía Deportiva / Display & Acentos)**
   - **Fuente**: `'Barlow', sans-serif`
   - **Pesos**: `400`, `700`, `800 Italic`, `900 Italic`.
   - **Uso**: Logos, banners deportivos, cifras numéricas clave y títulos con estética agresiva/fitness.

---

## ✨ 5. Resplandores, Brillos y Sombras (Glows & Visual Effects)

### 🚀 Botón de Marca (`.btn-brand`)

```css
.btn-brand {
  background: linear-gradient(135deg, #00bfff 0%, #0077cc 100%);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
  border: none;
}
.btn-brand:hover {
  background: linear-gradient(135deg, #33cfff 0%, #0099dd 100%);
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
  transform: translateY(-1px);
}
```

### 💡 Efecto de Resplandor Neón (`.glow-blue`)

```css
.glow-blue {
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.2);
}
.glow-blue:hover {
  box-shadow: 0 0 50px rgba(0, 191, 255, 0.35);
}
```

### ⭕ Sombra de Logo Neón Circular

```html
shadow-[0_0_20px_rgba(0,191,255,0.3)]
```

### 🎯 Enfoque en Inputs y Formularios (Input Focus)

```css
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--brand-blue) !important;
  box-shadow: 0 0 0 2px rgba(0, 191, 255, 0.2) !important;
}
```

### 📜 Scrollbar Personalizada Neón

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg-base);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 191, 255, 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 191, 255, 0.5);
}
```

### ⚓ Links de Navegación (`.nav-link` & `.nav-link-active`)

- **Estado Normal**: Texto `#9CA3AF`.
- **Estado Hover**: Fondo `rgba(0, 191, 255, 0.08)`, Texto `#00BFFF`.
- **Estado Activo**: Fondo `rgba(0, 191, 255, 0.12)`, Texto `#00BFFF`, Borde izquierdo `3px solid #00BFFF`.

---

## 🛠️ 6. Reglas de Desarrollo para Nuevos Componentes

1. **Mantener la Armonía Neón / Oscura**: Todo nuevo componente debe usar los colores definidos en las variables CSS `:root` de `index.css`.
2. **Evitar colores primarios genéricos**: No utilizar azul puro `#0000FF` ni rojo brillante plano. Utilizar siempre la paleta azul eléctrico y sus variaciones con opacidad `rgba(0, 191, 255, alpha)`.
3. **Transiciones Suaves**: Aplicar `transition: all 0.2s ease` o `duration-200`/`duration-300` en Tailwind para efectos de hover y cambios de elevación/brillo.
4. **Resplandores Moderados**: Usar resplandores `glow-blue` en elementos clave (Navbar, Tarjetas Destacadas, Botones CTA, Modales) sin saturar la pantalla.

   ***

## 7. Estructura de Carpetas del Proyecto Completo

```text
Gym/
├── backend/                         # Servidor de API Rest (Java + Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/gym/
│   │       │   ├── config/          # Configuraciones (Security, CORS, JWT)
│   │       │   ├── controller/      # Endpoints REST (Members, Plans, Checkin, Reports)
│   │       │   ├── dto/             # Objetos de Transferencia de Datos (Requests / Responses)
│   │       │   ├── model/           # Entidades JPA (Member, Plan, Checkin, Payment)
│   │       │   ├── repository/      # Interfaces de Spring Data JPA
│   │       │   └── service/         # Lógica de Negocio e Integraciones
│   │       └── resources/
│   │           └── application.yml  # Configuración de base de datos PostgreSQL
│   └── pom.xml                      # Dependencias de Maven
│
└── frontend/                        # Cliente Web (Vite + React .jsx)
    ├── src/
    │   ├── assets/                  # Logos, imágenes e íconos estáticos
    │   ├── components/              # Elementos visuales y de layout
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx       # Barra de navegación lateral (Sidebar) / Header
    │   │   │   └── Footer.jsx       # Pie de página / Créditos
    │   │   └── ui/                  # Componentes reutilizables de UI
    │   │       ├── Badge.jsx        # Etiqueta de estado (Activo, Inactivo, Pendiente)
    │   │       ├── Button.jsx       # Botones reutilizables con estilos del tema
    │   │       ├── Icons.jsx        # Componentes SVG inline para íconos
    │   │       ├── Modal.jsx        # Ventana modal genérica para formularios/alertas
    │   │       ├── PageHeader.jsx   # Encabezado estándar para cada vista
    │   │       └── StatCard.jsx     # Tarjeta de métricas e indicadores
    │   ├── views/                   # Pantallas / Páginas completas de la aplicación
    │   │   ├── Checkin.jsx          # Registro y control de accesos de socios
    │   │   ├── Dashboard.jsx        # Panel principal con resumen y métricas clave
    │   │   ├── Members.jsx          # Gestión y listado de socios (CRUD)
    │   │   ├── Plans.jsx            # Gestión de planes y membresías
    │   │   └── Reports.jsx          # Reportes financieros y de asistencia
    │   ├── services/                # Capa de consumo de API (Axios / Fetch)
    │   │   ├── api.js               # Instancia base de cliente HTTP
    │   │   ├── memberService.js     # Llamadas a endpoints de socios
    │   │   ├── planService.js       # Llamadas a endpoints de planes
    │   │   └── checkinService.js    # Llamadas a endpoints de asistencia
    │   ├── data/                    # Mock Data inicial (para probar UI antes de conectar backend)
    │   │   ├── checkinData.js
    │   │   ├── membersData.js
    │   │   ├── plansData.js
    │   │   └── reportsData.js
    │   ├── App.css                  # Estilos específicos del layout principal
    │   ├── App.jsx                  # Shell principal y enrutado/renderizado de vistas
    │   ├── index.css                # Variables CSS de color, reset y estilos globales
    │   └── main.jsx                 # Punto de entrada de React
    ├── index.html                   # HTML base con importación de tipografías
    ├── package.json                 # Dependencias del Frontend (React, Vite, etc.)
    └── vite.config.js               # Configuración de Vite
```
