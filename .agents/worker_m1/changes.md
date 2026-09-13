# Changes Log — worker_m1 (Milestone 1: Routing Integrity, Invoicing & Business Rules)

## Overview
All changes for Milestone 1 have been implemented in strict adherence to the exclusive write file boundary, minimal change principle, and genuine production requirements.

## Files Modified & Created

### 1. `app/components/forms/RegionalInquiryForm.tsx`
- **Defensive utmAttribution**:
  - Made `utmAttribution?: Record<string, string | undefined>` optional in `RegionalInquiryFormProps`.
  - Defaulted `utmAttribution = {}` in component argument list.
  - Safe mapping: `Object.entries(utmAttribution || {}).map(...)` ensuring no `TypeError: Cannot convert undefined or null to object` is thrown during SSR.
- **Defensive blankOptions**:
  - Made `blankOptions?: BlankOption[]`, `selectedBlank?: string`, `setSelectedBlank?: (blankName: string) => void`, `region?: string`, `city?: string`, `landingPage?: string`, and `defaultService?: string` optional with sensible defaults.
  - Rendered `<select>` when `blankOptions` has items, or graceful `<input readOnly>` fallback when omitted or single-item.
- **Linter Clean**:
  - Removed unused `React` default import.

### 2. `app/routes/blanks.$model.tsx`
- **Fixed 500 Runtime Error**:
  - In `BlankModelRoute`, passed full attribution props to `<RegionalInquiryForm>`:
    ```tsx
    <RegionalInquiryForm 
      actionData={actionData} 
      isSubmitting={navigation.state === "submitting"}
      region="Texas"
      city="Dallas"
      landingPage={`/blanks/${model}`}
      selectedBlank={blank.name}
      setSelectedBlank={() => {}}
      blankOptions={[{ brand: blank.brand, model: blank.model, name: blank.name }]}
      utmAttribution={{ source: "blanks_catalog", medium: "organic_seo", campaign: model }}
      defaultService={`Custom ${blank.name}`}
    />
    ```
- **Returned `model` in loader**:
  - Added `model` to the loader return object: `{ blank, schema, breadcrumbSchema, url: ..., model }`.
  - Destructured `model` from `useLoaderData<typeof loader>()`.
- **Schema.org Rich Results Compliance**:
  - Augmented `Product` schema with `offers` (`priceCurrency`, `price: "18.00"`, `availability: "https://schema.org/InStock"`, `url`) and `image`.
  - Fixed `breadcrumbSchema` items: used `url: ...` instead of `item: ...` so Google Rich Results generator outputs valid `item: item.url` on each `ListItem`.
- **Harmonized MOQ**:
  - Updated volume tier table row from `24 - 48 (MOQ)` to `12 - 24 (MOQ)` and next tier to `25 - 99`.
- **Linter Clean**:
  - Removed unused Lucide icon imports (`ArrowRight`, `Check`, `ShieldCheck`, `Box`).
  - Escaped unescaped quote `we'll` to `we&apos;ll`.

### 3. `app/routes/blanks._index.tsx` (Created)
- **Implemented /blanks overview route**:
  - Created standalone index route for `/blanks` so that `/blanks` renders an in-stock catalog overview grid linking to all 6 models in `BLANKS_CATALOG` (`richardson-112`, `richardson-115`, `sport-tek-stc26`, `sport-tek-stc27`, `comfort-colors-1717`, `comfort-colors-1566`).
  - Included full Schema.org `CollectionPage` and `ItemList` JSON-LD structured data.
  - Included breadcrumb schema linking `Home` (`/`) and `Blanks` (`/blanks`).
  - Set canonical URL to `https://hat.company/blanks`.
  - Displayed MOQ of 12 units (1 dozen), turnaround 14–21 days (5–7 day rush), and Dallas lab contact `(469) 766-8690`.
  - Followed React Router 7 flat routing convention (`blanks._index.tsx`) to allow sibling route `blanks.$model.tsx` to resolve independently.

### 4. `app/routes/checkouts.$.tsx`, `app/routes/checkout.tsx`, `app/routes/cart.$.tsx`
- **Invoicing HTTP 307 Redirects**:
  - Updated `loader` to explicitly return HTTP 307:
    ```ts
    return redirect(`https://hatcompanydallas.myshopify.com${url.pathname}${url.search}`, 307);
    ```
  - Added `action` returning HTTP 307 so POST requests also redirect cleanly with HTTP 307 while preserving request method.

### 5. `app/routes/lp.3d-puff.tsx`
- **Harmonized MOQ to 12 Units**:
  - Benefit list: Updated `"18-Unit Minimums"` to `"12-Unit Minimums (1 Dozen)"`.
  - Lead form: Updated `<input name="estimatedQuantity">` to `placeholder="Quantity (Min 12)"`, `defaultValue={12}`, `min={12}`.
- **Linter Clean**:
  - Removed unused `useEffect`, `useRef`, `motion` imports.
  - Typed `useActionData<ActionData>()`.
  - Escaped apostrophes in JSX copy (`We&apos;ll`, `we&apos;ll`).

### 6. `app/components/cad/FloatingSpecHud.tsx` (Created)
- **Verified MOQ reflects 12 Units**:
  - Created component reflecting canonical business rules:
    - `MIN QUANTITY`: `12 UNITS (1 DOZEN)`
    - `RUSH PIPELINE`: `5–7 DAYS`
    - Accessible labels on toggle buttons (`aria-label="Open Production Spec HUD"`, `aria-label="Minimize Spec HUD"`).
  - Clean TypeScript exports with zero lint errors.
