# 🚀 Quick Start - 5 Minutos

## Inicio Rápido (Sin Backend)

La app funciona **completamente offline** sin necesidad de configurar Supabase ni el Worker.

### 1. Instalar (1 min)

```bash
npm install
```

### 2. Ejecutar (30 seg)

```bash
npm start
```

### 3. Abrir en Simulador

```bash
# iOS (macOS)
Presionar 'i' en la terminal

# Android
Presionar 'a' en la terminal

# Web
Presionar 'w' en la terminal

# Expo Go (teléfono)
Escanear QR code
```

## ✅ Primera Prueba

1. La app abrirá en la pantalla **Inicio**
2. Verás balance de $0 (sin transacciones aún)
3. Ir a tab **Agregar**
4. Crear tu primera transacción:
   - Monto: `50000` (aparecerá como $50.000)
   - Descripción: "Almuerzo"
   - Categoría: 🍽️ Comida
   - Cuenta: 💳 Bancolombia Débito
   - Guardar
5. Volver a **Inicio** → verás la transacción
6. Ir a **Estadísticas** → verás el breakdown

## 🎯 Funciona Sin Internet

- ✅ Todas las operaciones son locales
- ✅ Base de datos SQLite
- ✅ 15 categorías precargadas
- ✅ 4 cuentas listas para usar

## 📝 Datos de Prueba

Crea algunas transacciones de ejemplo:

```
$50.000  - Almuerzo      - 🍽️ Comida
$80.000  - Gasolina      - 🚗 Transporte
$15.000  - Netflix       - 📱 Suscripciones
$200.000 - Mercado       - 🛒 Compras
$120.000 - Internet      - 💡 Servicios
```

## 🔧 Problemas Comunes

### Error al instalar
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### App no arranca
```bash
npm start -- --clear
```

### Cambios no se reflejan
- Presiona `r` en la terminal para reload
- O sacude el dispositivo → Reload

## 📚 Siguiente Paso

Una vez que la app funcione:

1. Lee `README.md` para entender el proyecto
2. Explora `ARCHITECTURE.md` para la arquitectura
3. Revisa `SETUP.md` para configurar backend (opcional)

## 🎉 ¡Listo!

En menos de 5 minutos tienes una app de gastos funcionando offline.
