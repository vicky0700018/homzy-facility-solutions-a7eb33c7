<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- HOMZY app code lives in `src/homzy/` as plain JSX/JS (tsconfig has allowJs); route files in `src/routes/` stay thin `.tsx` wrappers. Why: the brief asks for JavaScript components.
- All demo data (bookings, enquiries, services, industries, testimonials, gallery, content) goes through `src/homzy/store.js` (localStorage + useSyncExternalStore). No backend/database. Why: the brief is a frontend-only demo.
- Admin pages sit under the pathless `admin._panel` layout, which renders the sidebar and redirects to `/admin/login` when the demo session is missing. Why: one guard for every admin page.
- Icons are inline SVGs in `src/homzy/ui.jsx`; no icon or UI component libraries in HOMZY code. Why: brief forbids external UI/icon libraries.
