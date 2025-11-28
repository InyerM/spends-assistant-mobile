# Guía de Instalación - Expense Tracker Mobile

## Requisitos Previos

1. **Node.js 18 o superior**
   ```bash
   node --version  # Debe ser >= 18
   ```

2. **npm o yarn**
   ```bash
   npm --version
   ```

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Simulador/Emulador**
   - **iOS**: Xcode (solo macOS)
   - **Android**: Android Studio con emulador configurado
   - **Alternativa**: Expo Go app en tu teléfono

## Instalación

### 1. Instalar Dependencias

```bash
cd spends-assistant-mobile
npm install
```

Si encuentras errores con WatermelonDB:
```bash
# Limpiar cache y reinstalar
rm -rf node_modules
npm cache clean --force
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
EXPO_PUBLIC_API_URL=https://expense-assistant.inyer-spends-assistant.workers.dev
EXPO_PUBLIC_API_KEY=tu-api-key
```

### 3. Verificar TypeScript

```bash
npm run type-check
```

Debe completarse sin errores.

### 4. Iniciar el Proyecto

```bash
npm start
```

Esto abrirá Expo DevTools en tu navegador.

### 5. Ejecutar en Plataforma

#### iOS (solo macOS)
```bash
npm run ios
```

O presiona `i` en la terminal de Expo.

#### Android
```bash
npm run android
```

O presiona `a` en la terminal de Expo.

#### Web
```bash
npm run web
```

O presiona `w` en la terminal de Expo.

#### Expo Go (Teléfono)
1. Descarga Expo Go desde App Store o Play Store
2. Escanea el QR code que aparece en la terminal

## Problemas Comunes

### Error: "Cannot find module '@nozbe/watermelondb'"

**Solución:**
```bash
npm install @nozbe/watermelondb@0.27.1 --legacy-peer-deps
```

### Error: "Decorators are not enabled"

**Solución:**
Ya está configurado en `babel.config.js`. Si persiste:
```bash
rm -rf .expo
npm start --clear
```

### Error: "Unable to resolve module date-fns/locale"

**Solución:**
```bash
npm install date-fns@3.0.0 date-fns-tz@3.0.0
```

### Error en iOS: "CocoaPods could not find compatible versions"

**Solución:**
```bash
cd ios
pod install --repo-update
cd ..
```

### Error en Android: "SDK location not found"

**Solución:**
Crea `android/local.properties`:
```
sdk.dir=/Users/TU_USUARIO/Library/Android/sdk
```

## Verificación de Instalación

Una vez que la app esté corriendo:

1. ✅ Deberías ver la pantalla de "Inicio" con balance en $0
2. ✅ Ir a la pestaña "Agregar" y crear una transacción
3. ✅ La transacción debe aparecer en "Inicio" y "Transacciones"
4. ✅ Ver estadísticas en la pestaña "Estadísticas"
5. ✅ Tocar una transacción para ver detalles

## Datos de Prueba

La app viene con:
- ✅ 15 categorías precargadas (11 gastos, 3 ingresos, 1 transfer)
- ✅ 4 cuentas predeterminadas (Bancolombia, Nequi, Efectivo, Crédito)

## Desarrollo

### Hot Reload
Los cambios en el código se reflejan automáticamente. Si no funciona:
```bash
# Presiona 'r' en la terminal para reload manual
# O sacude el dispositivo y selecciona "Reload"
```

### Logs
```bash
# Ver logs de la app
npm start -- --clear

# O en otra terminal
npx expo-cli logs
```

### Debugging
1. Sacude el dispositivo/emulador
2. Selecciona "Debug Remote JS"
3. Abre Chrome DevTools en `http://localhost:19000/debugger-ui`

## Base de Datos Local

La base de datos SQLite se crea automáticamente en:
- iOS: `NSDocumentDirectory/watermelondb/default.db`
- Android: `/data/data/com.inyermarin.expensetracker/databases/watermelondb/default.db`

Para resetear la base de datos:
1. Desinstala la app del simulador/emulador
2. Reinstala con `npm run ios` o `npm run android`

## Próximos Pasos

Una vez que la instalación esté funcionando:

1. Lee `README.md` para entender la arquitectura
2. Explora el código en `src/` y `app/`
3. Revisa los tipos en `src/types/index.ts`
4. Familiarízate con WatermelonDB en `src/database/`

## Soporte

Si encuentras problemas:
1. Revisa esta guía completa
2. Verifica que tengas las versiones correctas de Node y npm
3. Limpia cache y reinstala dependencias
4. Consulta la documentación de Expo: https://docs.expo.dev

## Recursos Útiles

- [Expo Docs](https://docs.expo.dev)
- [Expo Router](https://expo.github.io/router/docs/)
- [WatermelonDB](https://watermelondb.dev/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Native](https://reactnative.dev)
