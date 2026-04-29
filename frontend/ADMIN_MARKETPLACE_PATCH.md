# Sprint 12A — admin-marketplace.component integration patch

The existing `admin-marketplace.component.ts` / `.html` from Sprint 11 are
unchanged for Sprint 12A **except** for four small additions to wire up the
inventory drawer. Apply these in place to avoid re-shipping 500+ unchanged
lines.

---

## Patch 1 — TypeScript imports (top of file)

Add these three imports below your existing `import` block:

```typescript
import { ProductInventoryDrawerComponent } from './product-inventory-drawer.component';
```

---

## Patch 2 — Component `imports:` array

Find the `@Component({ ... imports: [ ... ] })` block. Add
`ProductInventoryDrawerComponent` to the list:

```typescript
imports: [
  CommonModule,
  FormsModule,
  // … existing imports …
  ProductInventoryDrawerComponent,  // ← ADD THIS
],
```

---

## Patch 3 — Class state + methods

Inside the class, next to your other signals, add:

```typescript
/** Currently-open inventory drawer product ID (null = closed). */
readonly inventoryDrawerProductId = signal<string | null>(null);

openInventoryDrawer(productId: string): void {
  this.inventoryDrawerProductId.set(productId);
}

closeInventoryDrawer(): void {
  this.inventoryDrawerProductId.set(null);
}

onInventoryChanged(): void {
  // Reload the products table so stock / is_active reflect any changes
  this.loadProducts();
}
```

> `loadProducts()` is the method you're already using in the Products tab.
> If it has a different name in your current file, adjust accordingly.

---

## Patch 4 — HTML template additions

### 4a. Products table — add a Mode column

In the products table `<thead>`, add a column header between "Brand" and
"Price" (or wherever it fits):

```html
<th>Mode</th>
```

In the matching `<tbody>` row, insert the cell at the same position:

```html
<td>
  <span class="mode-chip mode-{{ p.fulfillment_mode || 'api' }}">
    {{ p.fulfillment_mode === 'inventory' ? '📦 Stock' : '🌐 API' }}
  </span>
</td>
```

### 4b. Products table — add an Inventory action button

Find the actions column (the `<td>` with Edit / Delete buttons). Add an
inventory button to the start:

```html
<button class="btn-icon" (click)="openInventoryDrawer(p.id)" title="Inventory">
  📦
</button>
```

### 4c. Drawer mount — at the END of the component template

After your existing tabs / modals, add:

```html
@if (inventoryDrawerProductId(); as pid) {
  <app-product-inventory-drawer
    [productId]="pid"
    (close)="closeInventoryDrawer()"
    (changed)="onInventoryChanged()"
  />
}
```

### 4d. (Optional) Styles for the mode chip

Add to the component SCSS:

```scss
.mode-chip {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;

  &.mode-api {
    background: rgba(96, 165, 250, .15);
    color: #60a5fa;
  }
  &.mode-inventory {
    background: rgba(168, 85, 247, .15);
    color: #c084fc;
  }
}

.btn-icon {
  background: transparent;
  border: 1px solid #2a2a3a;
  color: #888;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 4px;

  &:hover { color: #fff; border-color: #a855f7; }
}
```

---

## Patch 5 — Product edit modal fulfillment_mode selector

In your product edit form, add the fulfillment_mode selector next to the
existing `is_active` toggle or wherever fits:

```html
<label>
  Fulfillment mode
  <select [(ngModel)]="productForm.fulfillment_mode" name="fulfillment_mode">
    <option value="api">API (distributor)</option>
    <option value="inventory">Inventory (pre-loaded codes)</option>
  </select>
</label>

<label>
  Low stock threshold
  <input
    type="number"
    min="0"
    [(ngModel)]="productForm.low_stock_threshold"
    name="low_stock_threshold"
    placeholder="5"
  />
</label>
```

And in the TypeScript `productForm` signal / model, add the two fields to
the initial state:

```typescript
productForm = {
  // …existing fields…
  fulfillment_mode: 'api' as 'api' | 'inventory',
  low_stock_threshold: 5,
};
```

Also expand the ProductRow interface to include these two fields:

```typescript
export interface ProductRow {
  // …existing fields…
  fulfillment_mode?: 'api' | 'inventory';
  low_stock_threshold?: number;
  is_active: boolean;
}
```

> **Recurring Angular 17 gotcha**: if the ProductRow interface doesn't
> explicitly declare these fields, the template will fail to type-check
> when reading `p.fulfillment_mode`. Always declare new fields explicitly.

---

## Verification after applying patches

1. `ng build` should succeed with zero errors.
2. Navigate to `/admin/marketplace` — Products tab should show a new "Mode"
   column and a `📦` button on each row.
3. Click `📦` on any product — the inventory drawer opens. For API-mode
   products, the "Upload codes" button is disabled with a helpful tooltip.
4. Switch a product to inventory mode — stock cards update. Upload
   button becomes enabled.
5. Click "Upload codes" — modal opens with Paste + CSV tabs.

If anything renders blank, check the browser console for Angular template
errors — most 12A issues are interface mismatches, same pattern as Sprint 11.
