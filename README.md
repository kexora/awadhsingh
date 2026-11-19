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

## Local Development

```bash
npm install
npm run dev
npm run build
```
