PS C:\Users\KHAN GADGET\Desktop\Blood Donner> npm run build

> blood-donner@1.0.0 build
> next build

⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of C:\Users\KHAN GADGET\package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it's not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles: 
   * C:\Users\KHAN GADGET\Desktop\Blood Donner\package-lock.json

▲ Next.js 16.2.4 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 4.8s
  Running TypeScript  ..Failed to type check.

./src/app/become-donor/page.tsx:930:46
Type error: Property 'anchor' does not exist on type '{ '0': string; '1-5': string; '6-10': string; '11-20': string; '20+': string; }'.

  928 | ...              <span className="dp-row-label">Donations</span>
  929 | ...              <span className="dp-row-val" id="dpDonations">
> 930 | ...                {formData.totalDonations ? { '0': 'First timer', '1-5': '1–5 times', '...
      |                                               ^
  931 | ...              </span>
  932 | ...            </div>
  933 | ...            <div className="dp-row">
Next.js build worker exited with code: 1 and signal: null
PS C:\Users\KHAN GADGET\Desktop\Blood Donner> 