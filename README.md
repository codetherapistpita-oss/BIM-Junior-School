# BIM Junior School — Galaxy Campus

Official website for **BIM Junior School Galaxy Campus**.

**Motto:** Nurturing Hearts and Minds  
**Levels:** Day Care through Junior 3

## Location

10b Salaama 9014, Kampala, Uganda  
[Open in Google Maps](https://maps.app.goo.gl/JNjadvNRr5RPQ5Fc6)

## GitHub Pages setup (required)

The site is published to the **`gh-pages` branch** by our workflow. You must point Pages at that branch — **not** “GitHub Actions”.

1. Open **Settings → Pages**
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. Branch: **gh-pages** · Folder: **/ (root)**
4. Save

Site URL: **https://codetherapistpita-oss.github.io/BIM-Junior-School/**

Also confirm **Settings → Actions → General → Workflow permissions** is set to **Read and write**.

### Red X on “pages build and deployment” / `deploy-pages` failed?

That is GitHub’s **built-in** workflow. It runs when Pages source is set to **GitHub Actions** and often fails with `Deployment failed, try again later.`

| Workflow | Status | What it does |
|----------|--------|--------------|
| **Deploy website to GitHub Pages** | Should be green | Pushes site files to `gh-pages` (this is the one we use) |
| **pages build and deployment** | Red X (ignore after fix) | Built-in `deploy-pages` — only needed if source is “GitHub Actions” |

**Fix:** switch Pages source to **gh-pages / (root)** as above. The red job can be ignored; your site will serve from `gh-pages`.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`
