# Expense Tracker Mobile - React Native + Expo

App mobile offline-first para tracking de gastos personales en Colombia.

## Stack Tecnológico

- **Framework**: React Native + Expo SDK 52
- **Routing**: Expo Router (file-based)
- **Estado servidor**: TanStack Query v5
- **Estado local**: Zustand
- **Base de datos local**: WatermelonDB (SQLite)
- **UI**: React Native + Expo Vector Icons
- **Gráficos**: Victory Native
- **Lenguaje**: TypeScript estricto

## Características

- ✅ Arquitectura offline-first
- ✅ Base de datos local con WatermelonDB
- ✅ Navegación por tabs con Expo Router
- ✅ Formateo de moneda colombiana (COP)
- ✅ Manejo de fechas en timezone Colombia (America/Bogota)
- ✅ Categorías y cuentas precargadas
- ✅ CRUD completo de transacciones
- ✅ Estadísticas por categoría
- ⏳ Sincronización con Supabase (próximamente)
- ⏳ Autenticación (próximamente)
- ⏳ Gráficos con Victory Native (próximamente)

## Estructura del Proyecto

```
expense-tracker-mobile/
├── app/                          # Expo Router
│   ├── (tabs)/                   # Tab navigator
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home/Dashboard
│   │   ├── transactions.tsx      # Lista transacciones
│   │   ├── add.tsx               # Agregar gasto
│   │   └── stats.tsx             # Estadísticas
│   ├── transaction/[id].tsx      # Detalle transacción
│   ├── _layout.tsx               # Root layout
│   └── +not-found.tsx
├── src/
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes base
│   │   └── ...
│   ├── database/                 # WatermelonDB
│   │   ├── models/               # Modelos
│   │   ├── schema.ts             # Schema definition
│   │   └── index.ts
│   ├── hooks/                    # Custom hooks
│   ├── providers/                # Context providers
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utilidades
```

## Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Expo CLI
- iOS Simulator (macOS) o Android Emulator

### Pasos

1. Clonar el repositorio:
```bash
cd spends-assistant-mobile
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. Iniciar el proyecto:
```bash
npm start
```

5. Ejecutar en plataforma:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Categorías Colombianas

El app viene precargado con categorías típicas de gastos en Colombia:

**Gastos:**
- 🍽️ Comida
- 🚗 Transporte
- 🎬 Entretenimiento
- 🛒 Compras
- 💡 Servicios
- 💊 Salud
- 📚 Educación
- 🏠 Hogar
- 💻 Tecnología
- 📱 Suscripciones
- 📦 Otros

**Ingresos:**
- 💰 Salario
- 💼 Freelance
- 📈 Inversiones

## Cuentas Predeterminadas

- 💳 Bancolombia Débito (*7799)
- 📱 Nequi
- 💵 Efectivo
- 💳 Bancolombia Crédito (*1234)

## Formato de Datos

### Moneda
- Formato: COP sin decimales
- Separador de miles: punto (.)
- Ejemplo: $1.250.000

### Fechas
- Timezone: America/Bogota
- Formato almacenado: YYYY-MM-DD
- Formato display: dd MMM yyyy (español)

## Base de Datos Local

### Schema WatermelonDB

**transactions**
- Transacciones con fecha, monto, categoría, cuenta
- Soporte para ingresos, gastos y transferencias
- Flag de sincronización con servidor

**categories**
- Categorías con iconos y colores
- Tipos: expense, income, transfer
- Soporte para subcategorías (parent_id)

**accounts**
- Cuentas bancarias y efectivo
- Balance actual
- Tipos: checking, savings, credit_card, cash

## Desarrollo

### Scripts Disponibles

```bash
npm start          # Iniciar Expo
npm run ios        # Ejecutar en iOS
npm run android    # Ejecutar en Android
npm run web        # Ejecutar en web
npm run lint       # Linter
npm run type-check # TypeScript check
```

### TypeScript Estricto

El proyecto usa configuración estricta de TypeScript:
- No `any` permitido
- Strict null checks
- Strict function types
- No unused variables/parameters

## Próximos Pasos

### Fase 2: Sincronización
- [ ] Implementar sync protocol con Supabase
- [ ] Manejo de conflictos offline/online
- [ ] Background sync cada 5 minutos
- [ ] Pull to refresh manual

### Fase 3: Autenticación
- [ ] Login con Supabase Auth
- [ ] Registro de usuarios
- [ ] Manejo de sesiones

### Fase 4: Funcionalidades Avanzadas
- [ ] Gráficos con Victory Native
- [ ] Filtros avanzados
- [ ] Exportar datos
- [ ] Notificaciones push
- [ ] Modo oscuro

## Backend

Este proyecto se integra con:
- **Backend**: Cloudflare Worker (TypeScript)
- **Database**: Supabase PostgreSQL
- **AI**: Gemini 2.5 Flash para parsing de gastos
- **Bot**: Telegram para notificaciones

URL del Worker: `https://expense-assistant.inyer-spends-assistant.workers.dev`

## Licencia

MIT

## Autor

Inyer Marin
