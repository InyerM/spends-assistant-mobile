# 👋 Bienvenido a Expense Tracker Mobile

App mobile offline-first para tracking de gastos personales en Colombia.

## 🚀 Inicio Rápido (< 5 min)

```bash
npm install
npm start
# Presionar 'i' para iOS o 'a' para Android
```

Lee: [`QUICKSTART.md`](./QUICKSTART.md)

## 📖 Guías de Documentación

### 1️⃣ Para Empezar
- **[QUICKSTART.md](./QUICKSTART.md)** - Ejecuta la app en 5 minutos
- **[SETUP.md](./SETUP.md)** - Instalación detallada y troubleshooting

### 2️⃣ Entender el Proyecto
- **[README.md](./README.md)** - Overview completo del proyecto
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Resumen de lo construido
- **[CHECKLIST.md](./CHECKLIST.md)** - Lista de verificación completa

### 3️⃣ Arquitectura y Código
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura offline-first explicada

## 🎯 Estado Actual

**✅ MVP COMPLETADO - 100%**

La app está lista para:
- Crear, ver, editar y eliminar transacciones
- Funcionar completamente offline
- Formatear moneda colombiana (COP)
- Manejar fechas en timezone Colombia
- Ver estadísticas por categoría

## 📁 Navegación del Código

```
expense-tracker-mobile/
├── app/                          # 📱 Screens (Expo Router)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx             # 🏠 Home/Dashboard
│   │   ├── transactions.tsx      # 📝 Lista
│   │   ├── add.tsx               # ➕ Agregar
│   │   └── stats.tsx             # 📊 Stats
│   └── transaction/[id].tsx      # 🔍 Detail
│
├── src/
│   ├── components/               # 🎨 UI Components
│   │   ├── ui/                   # Base components
│   │   ├── TransactionCard.tsx
│   │   └── EmptyState.tsx
│   ├── database/                 # 💾 WatermelonDB
│   │   ├── models/               # Models
│   │   └── schema.ts             # Schema
│   ├── hooks/                    # 🎣 Custom Hooks
│   ├── providers/                # 🔌 Providers
│   ├── types/                    # 📝 TypeScript
│   └── utils/                    # 🛠️ Utils
│
└── 📚 Documentación (este nivel)
```

## 🎓 Flujo de Lectura Sugerido

### Para ejecutar rápido:
1. `QUICKSTART.md` → ejecutar app
2. Probar crear transacciones
3. Explorar todas las pantallas

### Para entender el proyecto:
1. `README.md` → overview
2. `ARCHITECTURE.md` → cómo funciona
3. Explorar código en `src/`

### Para desarrollar:
1. `SETUP.md` → instalación completa
2. `ARCHITECTURE.md` → patrones
3. `CHECKLIST.md` → qué hay construido
4. Código en `app/` y `src/`

## 🛠️ Comandos Principales

```bash
# Desarrollo
npm start              # Iniciar Expo DevTools
npm run ios            # iOS simulator
npm run android        # Android emulator
npm run web            # Browser

# Code Quality
npm run type-check     # TypeScript check
npm run lint           # ESLint (cuando esté configurado)
```

## 🇨🇴 Características Colombianas

✅ Formato COP: `$1.250.000` (punto como separador)
✅ Timezone: America/Bogota
✅ Fechas en español: "27 Nov 2025"
✅ Categorías locales: Comida, Transporte, etc.
✅ Cuentas: Bancolombia, Nequi, Efectivo

## 📊 Estadísticas del Proyecto

- 📁 **30 archivos** TypeScript (.ts/.tsx)
- 📝 **~3,000 líneas** de código
- 🎨 **7 componentes** UI
- 📱 **6 pantallas** (5 tabs + 1 modal)
- 💾 **3 modelos** de datos
- 🎣 **3 custom hooks**

## 🔄 Próximas Fases

### Fase 2: Sincronización (próximo)
- Sync con Supabase
- Background sync
- Conflict resolution

### Fase 3: Autenticación
- Login/Register
- User profile

### Fase 4: Features Avanzadas
- Gráficos Victory Native
- Filtros avanzados
- Exportar datos
- Modo oscuro

## 🆘 ¿Problemas?

1. Revisa `SETUP.md` sección "Problemas Comunes"
2. Limpia y reinstala:
   ```bash
   rm -rf node_modules
   npm install
   npm start -- --clear
   ```

## 💡 Tips

- La app funciona **100% offline** sin backend
- Las categorías y cuentas se precargan automáticamente
- La base de datos SQLite se crea al inicio
- Puedes crear transacciones sin configurar nada

## 🎯 Primer Paso

```bash
npm install && npm start
```

Luego presiona `i` (iOS) o `a` (Android) en la terminal.

---

**¿Listo?** Comienza con [`QUICKSTART.md`](./QUICKSTART.md) →
