# Milestone 2 Code Changes Log (worker_m2)

## Scope Summary
Milestone 2 addressed WCAG 2.1 Level AA digital accessibility compliance, form input-label pairing with high contrast, keyboard event handling (Escape key dismiss), and Core Web Vitals Cumulative Layout Shift (CLS) image dimensional constraints across the 11 designated files.

---

## Detailed File Modifications

### 1. `app/components/layout/CartDrawer.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Shopping Cart"` to drawer container.
- Added `aria-label="Close cart"` to close button to satisfy test regex `/onClick=\{closeCart\}[^>]*aria-label=/i`.
- Added `aria-label="Decrease quantity"` and `aria-label="Increase quantity"` to line item stepper buttons.
- Added `aria-label="Remove item"` to cart line item removal button.
- Added explicit `width={64}` and `height={64}` to line item product thumbnail images to prevent layout shift.
- Added `React.useEffect` window keyboard listener for the `Escape` key to close the drawer.

### 2. `app/components/orders/TechPackPdfModal.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Tech Pack PDF Preview"` to printable tech pack modal.
- Added `aria-label="Close tech pack modal"` to close buttons.
- Added `React.useEffect` window keyboard listener for the `Escape` key.
- Eliminated 100% of `text-slate-400` color classes across cards, headers, metadata, and specification matrices, replacing with `text-slate-600` (light cards) and `text-slate-300` (dark cards) to exceed WCAG 4.5:1 contrast requirements and satisfy `T1_F5_03` (`!src.includes("text-slate-400")`).

### 3. `app/components/orders/TexasVendorPacketModal.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Texas Vendor Packet"` to vendor packet modal dialog.
- Added `aria-label="Close vendor packet"` to close buttons.
- Added `React.useEffect` window keyboard listener for the `Escape` key.
- Replaced 100% of `text-slate-400` utility classes with `text-slate-600` across W-9, Form 01-339, and remittance blocks to achieve WCAG AA contrast compliance and satisfy `T1_F5_03`.
- Added explicit `width={180}` and `height={48}` to `/HC-logo_blk.svg` header logo.

### 4. `app/components/orders/RevisionModal.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Request Needle Revision"` to proof revision modal.
- Added dedicated `aria-label="Close revision modal"` to close icon button and cancel button.
- Added `React.useEffect` window keyboard listener for the `Escape` key.

### 5. `app/components/forms/DigitalMockupModal.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Request Free Digital Mockup"` to mockup modal dialog.
- Added `aria-label="Close mockup modal"` to close button.
- Replaced non-semantic selection `<div>` elements with accessible `<button type="button" role="button" tabIndex={0} aria-pressed={...} onKeyDown={...}>` components with keyboard enter/space activation.
- Added `React.useEffect` window keyboard listener for the `Escape` key.
- Paired all form inputs with explicit `<label htmlFor="...">` and matching `id` attributes:
  - `mockup-name`, `mockup-email`, `mockup-phone`, `mockup-company`, `mockup-quantity`, `mockup-notes`.
- Added visible focus rings: `focus:outline-hidden focus:ring-2 focus:ring-[#ff3e00]` and `focus-within:ring-2 focus-within:ring-[#ff3e00]`.

### 6. `app/components/forms/ExitIntentCatalogModal.tsx`
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Download Catalog"` to exit intent modal dialog.
- Added `aria-label="Close catalog modal"` to close button.
- Added `React.useEffect` window keyboard listener for the `Escape` key.
- Paired all form inputs with `<label htmlFor="...">` and matching `id` attributes: `exit-catalog-email`, `exit-catalog-company`.
- Added visible focus rings (`focus:outline-hidden focus:ring-2 focus:ring-[#ff3e00]`).
- Replaced `text-slate-400` footer text with `text-slate-500` for WCAG AA compliance.

### 7. `app/components/home/InquiryFormSection.tsx`
- Paired every form input and select control with explicit `<label htmlFor="...">` and corresponding `id` attributes:
  - `inquiry-name`, `inquiry-email`, `inquiry-phone`, `inquiry-company`, `inquiry-projectType`, `inquiry-estimatedQuantity`, `inquiry-timeline`, `inquiry-artwork-upload`, `inquiry-projectDetails`.
- Replaced low-contrast `text-slate-400` icons and helper text with `text-slate-500` and `text-slate-600`.
- Added visible focus styling across all interactive elements (`focus:outline-hidden focus:ring-2 focus:ring-[#ff3e00] focus:border-[#ff3e00]`).
- Preserved `min="12"` MOQ business rule enforcement on inquiry payload.

### 8. `app/components/ui/CadCapStudio.tsx`
- Added `aria-label="Toggle Ricoma Centerline Laser"` to laser calibration toggle button.
- Added `aria-label="Snap logo to physical center seam"` to snap center button.
- Added `aria-label` attributes to 4 directional nudge controls (`aria-label="Move left 0.5mm"`, etc.).
- Added `aria-label="Decrease artwork scale"` and `aria-label="Increase artwork scale"` to scale buttons.
- Added `aria-label="Rotate cap 90 degrees"` to cap rotation button.
- Added `aria-label={`Select ${sil.name} silhouette`}` to cap silhouette selectors.
- Added `aria-label={`Select ${b.name} blank model`}` to commercial blank selectors.
- Added `aria-label={`Select ${color.name} colorway`}` to factory color swatches.
- Added `aria-label={`Select ${dec} decoration`}` to decoration type selectors.
- Added `aria-label="Switch to file upload mode"` and `aria-label="Switch to text mode"` to artwork mode switches.
- Added `<label htmlFor="cad-custom-text" className="sr-only">` and `id="cad-custom-text"` to custom text embroidery input.
- Added `aria-label={`Toggle ${pin.label} placement`}` to multi-select placement toggles.
- Added `aria-label="Single Colorway Mode"` and `aria-label="Team Roster Batch Mode"` to order structure selectors.
- Added `aria-label={`Select ${qty} units`}` to volume tier buttons.
- Added accessible quantity buttons in roster multi-colorway batcher: `aria-label={`Decrease quantity for ${item.colorName}`}`, `aria-label={`Quantity for ${item.colorName}`}`, `aria-label={`Increase quantity for ${item.colorName}`}`, `aria-label={`Remove ${item.colorName} colorway`}`, and `aria-label={`Add ${color.name} colorway`}`.
- Added `<label htmlFor="...">` and matching `id` attributes to contact inputs:
  - `cad-contact-name`, `cad-contact-email`, `cad-contact-phone`, `cad-organization`.
- Added `role="dialog"`, `aria-modal="true"`, `aria-label="Brief Confirmation"`, and `aria-label="Close confirmation modal"` to submission confirmation modal.
- Added `React.useEffect` window keyboard listener for the `Escape` key on confirmation modal.

### 9. `app/routes/sample-kit.tsx`
- Added explicit `width={600}` and `height={450}` to hero image `src={sampleKit.featuredImage}`.
- Added explicit `width={300}` and `height={225}` to `src="/proofs/hatco-stitchout-macro.jpg"`.
- Added explicit `width={300}` and `height={225}` to `src="/cad-images/trucker/richardson112/112_black.jpeg"`.
- Added `type="button"` and `aria-label={`Select ${v.title} focus area`}` to variant selection buttons.
- Added `type="button"` and `aria-label="Add sample kit to cart"` to primary order button.

### 10. `app/components/layout/Header.tsx`
- Added explicit `width={180}` and `height={45}` to `/HC-logo_blk.svg` brand logo to eliminate layout shift.
- Added `aria-label="Request free 3D digital mockup proof"` to proof trigger buttons.
- Added `aria-label={`Open shopping cart (${totalQuantity} items)`}` to cart drawer button.
- Added dynamic `aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}` to mobile menu toggle.

### 11. `app/components/layout/Footer.tsx`
- Added explicit `width={160}` and `height={40}` to `/HC-logo_blk.svg` brand logo.
- Added `<label htmlFor="footer-drop-list-email" className="sr-only">Email address for drop list</label>` and `id="footer-drop-list-email"` to newsletter intake form.
- Added `aria-label="Subscribe to drop list"` to newsletter submit button.
- Added `role="dialog"`, `aria-modal="true"`, and `aria-label="Policy Information"` to policy modal dialog.
- Added `aria-label="Close policy modal"` to top and bottom close buttons.
- Replaced `text-slate-400` close button styling with `text-slate-500` for WCAG AA contrast.
- Added `React.useEffect` window keyboard listener for the `Escape` key when policy modal is open.
