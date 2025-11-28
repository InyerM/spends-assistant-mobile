# Arquitectura Offline-First

## Visión General

Esta app implementa una arquitectura **offline-first**, lo que significa que:
- ✅ Funciona completamente sin conexión a internet
- ✅ Los datos se guardan primero localmente
- ✅ La sincronización con el servidor es transparente
- ✅ Los conflictos se resuelven automáticamente

## Stack de Tecnologías

### Frontend (React Native + Expo)
```
┌─────────────────────────────────────────┐
│          React Native + Expo            │
│         (Managed Workflow)              │
├─────────────────────────────────────────┤
│  Expo Router (File-based Navigation)    │
├─────────────────────────────────────────┤
│  TanStack Query (Server State)          │
│  Zustand (App State)                    │
├─────────────────────────────────────────┤
│  WatermelonDB (Offline Database)        │
│  SQLite (Persistence Layer)             │
└─────────────────────────────────────────┘
```

### Backend
```
┌─────────────────────────────────────────┐
│     Cloudflare Workers (Edge)           │
│     TypeScript + Hono                   │
├─────────────────────────────────────────┤
│     Supabase PostgreSQL                 │
│     (Source of Truth)                   │
├─────────────────────────────────────────┤
│     Gemini 2.5 Flash                    │
│     (Expense Parsing)                   │
└─────────────────────────────────────────┘
```

## Data Flow

### 1. Crear Transacción (Offline-First)

```
Usuario → UI Form
         ↓
    Validación
         ↓
    WatermelonDB.write()
         ↓
    Optimistic Update (UI se actualiza inmediatamente)
         ↓
    Background Queue (is_synced = false)
         ↓
    [Cuando hay conexión]
         ↓
    POST /api/transactions
         ↓
    Recibir server_id
         ↓
    Update local record (is_synced = true)
```

### 2. Leer Transacciones

```
UI Request → useTransactions Hook
           ↓
      WatermelonDB.query()
           ↓
      Observable (auto-update)
           ↓
      UI actualizada en tiempo real
```

### 3. Sincronización

```
App Start / Pull to Refresh / Background Timer
         ↓
    GET /api/sync?last_sync=timestamp
         ↓
    Recibir cambios del servidor
         ↓
    WatermelonDB Sync Protocol
         ↓
    Merge local + remote changes
         ↓
    Resolver conflictos
         ↓
    UI actualizada
```

## WatermelonDB: La Clave del Offline-First

### ¿Por qué WatermelonDB?

1. **Performance**: Maneja 10,000+ registros sin problemas
2. **Observable**: UI se actualiza automáticamente
3. **Sync Protocol**: Sincronización incremental eficiente
4. **Relations**: Queries con JOINs nativas
5. **Typed**: TypeScript de primera clase

### Schema Design

```typescript
transactions {
  id: string              // Local UUID
  server_id: string?      // ID de Supabase
  date: string
  amount: number
  category_id: string     // Foreign key
  account_id: string      // Foreign key
  is_synced: boolean      // Flag de sync
  created_at: number
  updated_at: number
}

categories {
  id: string
  server_id: string?
  name: string
  type: expense|income|transfer
  icon: string
  color: string
}

accounts {
  id: string
  server_id: string?
  name: string
  balance: number
  institution: string
}
```

### Relaciones

```typescript
// Transaction pertenece a Category
transaction.category.fetch() → Category

// Transaction pertenece a Account
transaction.account.fetch() → Account

// Category tiene muchas Transactions
category.transactions.fetch() → Transaction[]
```

## Patrones de Código

### 1. Custom Hooks (Data Layer)

```typescript
// src/hooks/useTransactions.ts
export function useTransactions(month?: string) {
  const { database } = useDatabase();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Subscribe to changes
    const subscription = database
      .get('transactions')
      .query(/* filters */)
      .observe()
      .subscribe(setTransactions);

    return () => subscription.unsubscribe();
  }, [month]);

  return { transactions, loading };
}
```

### 2. Database Writes

```typescript
// Siempre usar database.write()
await database.write(async () => {
  await collection.create((record) => {
    record._raw.id = generateId();
    record.amount = 1000;
    record.description = 'Almuerzo';
    record.isSynced = false; // Marcar para sync
  });
});
```

### 3. Queries con Filtros

```typescript
// Q helper para queries type-safe
import { Q } from '@nozbe/watermelondb';

const expenses = await database
  .get('transactions')
  .query(
    Q.where('type', 'expense'),
    Q.where('date', Q.gte('2025-11-01')),
    Q.sortBy('date', Q.desc)
  )
  .fetch();
```

### 4. Optimistic Updates

```typescript
// UI se actualiza antes de confirmar con servidor
const handleSave = async () => {
  // 1. Guardar local (rápido)
  const transaction = await createTransactionLocal(data);

  // 2. UI se actualiza automáticamente (observable)

  // 3. Background sync (cuando hay red)
  syncQueue.add({ type: 'create', record: transaction });
};
```

## Estado de la App

### Zustand (App State)

```typescript
// src/stores/useAppStore.ts
interface AppState {
  selectedMonth: string;
  syncStatus: SyncStatus;
  networkStatus: NetworkStatus;
}

// Uso
const { syncStatus } = useAppStore();
```

### TanStack Query (Server State)

```typescript
// Para operaciones que requieren servidor
const { data, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: fetchCategories,
  staleTime: 1000 * 60 * 5, // 5 min
});
```

## Sincronización (Fase 2)

### Sync Protocol

```typescript
// src/database/sync.ts
export async function synchronize() {
  const lastSync = await getLastSyncTimestamp();

  // 1. Push local changes
  const unsyncedRecords = await getUnsyncedRecords();
  await pushToServer(unsyncedRecords);

  // 2. Pull server changes
  const serverChanges = await pullFromServer(lastSync);
  await applyServerChanges(serverChanges);

  // 3. Update timestamp
  await setLastSyncTimestamp(Date.now());
}
```

### Manejo de Conflictos

```
Local:  amount: 1000, updated_at: 100
Server: amount: 1500, updated_at: 200

Estrategia: "Server wins"
Resultado: amount = 1500
```

## Formato de Datos Colombia

### Moneda (COP)

```typescript
// utils/format.ts
export function formatCurrency(amount: number): string {
  // 1250000 → "$1.250.000"
  return amount
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
```

### Fechas (America/Bogota)

```typescript
import { formatInTimeZone } from 'date-fns-tz';

export function getCurrentDate(): string {
  // Siempre en timezone Colombia
  return formatInTimeZone(
    new Date(),
    'America/Bogota',
    'yyyy-MM-dd'
  );
}
```

## Performance Optimization

### 1. Lazy Loading

```typescript
// Solo cargar transacciones del mes actual
const { transactions } = useTransactions(getCurrentMonth());
```

### 2. Pagination

```typescript
// Limit inicial, cargar más con scroll
.query(Q.take(50), Q.skip(offset))
```

### 3. Observables Selectivos

```typescript
// Solo observar cambios relevantes
.query(Q.where('date', Q.gte(startDate)))
.observe()
```

## Testing Strategy (Futuro)

```typescript
// Unit Tests
- formatCurrency()
- parseCurrency()
- getCurrentDate()

// Integration Tests
- Database operations
- Sync protocol
- Conflict resolution

// E2E Tests (Detox)
- Create transaction flow
- Edit transaction
- Delete transaction
- Offline mode
```

## Security Considerations

1. **Datos Locales**: SQLite encriptado (futuro)
2. **API Keys**: Solo en variables de entorno
3. **Auth Tokens**: Supabase JWT en secure storage
4. **Validación**: Cliente + Servidor

## Próximas Mejoras

- [ ] Encryption at rest (SQLite Cipher)
- [ ] Background sync con WorkManager
- [ ] Conflict resolution UI
- [ ] Delta sync (solo cambios)
- [ ] Compress data for sync
- [ ] Offline queue management

## Recursos

- [WatermelonDB Docs](https://watermelondb.dev/docs)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Offline-First Architecture](https://offlinefirst.org/)
