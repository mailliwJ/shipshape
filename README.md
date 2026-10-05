# Shipshape

A small, installable web app for practicing an end-to-end app workflow: Chat Work → GitHub → Android. It is a Progressive Web App (PWA), so the same static files can be hosted on GitHub Pages and installed from Chrome on Android.

## Try it locally

Open `index.html` in a browser to explore the checklist. Progress is stored in that browser on that device. For install/offline behavior, serve the folder over HTTPS (GitHub Pages does this) or use a local static server.

## Publish with GitHub Pages

1. Create a GitHub repository and push these files to its `main` branch.
2. In **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
3. The included workflow deploys on each push to `main`. Find the published URL in the workflow run or Pages settings.
4. Open the URL in Chrome on Android and use **Install app** or **Add to Home screen**.

The app needs no build step or backend. Checklist state stays in local storage and works offline after the first visit. The install prompt is controlled by the browser; if it does not appear, use Chrome's menu and select **Install app** / **Add to Home screen**.
