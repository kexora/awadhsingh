# Awadh Kishore Singh — Senior Electrical Supervisor Portfolio

Static React + Vite portfolio optimized for **GitHub Pages** (`https://awadhsingh.kexora.in`).

## GitHub Pages Deployment Setup

1. Push this repository to GitHub (on the `main` branch).
2. Open your repository **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site on every push to `main`.

## Custom Domain DNS (`awadhsingh.kexora.in`)

`public/CNAME` is already configured with `awadhsingh.kexora.in`. Add this DNS record in your domain provider (`kexora.in`):

| Type | Host / Name | Value / Target |
| --- | --- | --- |
| `CNAME` | `awadhsingh` | `<your-github-username>.github.io` |

After DNS propagates, enable **Enforce HTTPS** in **Settings → Pages**.

## Old Netlify Site (`awadhsingh.netlify.app`) 301 Redirect & Search Console Migration

`netlify.toml` is configured with forced **HTTP 301 Permanent Redirects** (`force = true`) from `http(s)://awadhsingh.netlify.app/*` to `https://awadhsingh.kexora.in/:splat`.

- GitHub Pages ignores `netlify.toml`, so both can live safely in the same repository.
- If your old Netlify site is linked to this GitHub repo, pushing updates will automatically activate the 301 redirect.
- Once active, open **Google Search Console → `https://awadhsingh.netlify.app` → Settings → Change of address** and select `https://awadhsingh.kexora.in`.

## Local Development

```bash
npm install
npm run dev
npm run build
```
