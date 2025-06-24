# Codex_test

This repository provides a sample implementation for an art viewing diary.

## Screen Design

### Pages
- **Home** (`/`)
  - List existing exhibition records
  - Link to create a new record
- **New Exhibition** (`/new-exhibition`)
  - Form to record exhibition details and artworks
- **Exhibition Detail** (`/exhibitions/[id]`)
  - Display the saved exhibition with its artworks
- **My Album** (`/album`)
  - Image-centric view for looking back on all artworks

### Components
- `ExhibitionForm` – form for exhibition information and artworks
- `WorkInput` – inputs for a single artwork
- `ArtworkCard` – display component for album views
- `ExhibitionList` – lists saved exhibitions

The `frontend` directory contains a minimal Next.js project using TypeScript and Chakra UI. The focus of this example is the record creation form.

## Deploying on Render

To quickly host the sample app, you can use [Render](https://render.com). The repository includes a `render.yaml` blueprint that defines a free Node Web Service.

1. Sign in to Render and create a new Web Service from this repository.
2. Render will read `render.yaml` and prefill the build and start commands.
3. Deploy the service. During the build step Render runs `npm install` and `npm run build`, then starts the app with `npm start`.

Once deployed, the app will be available at the URL provided by Render.
