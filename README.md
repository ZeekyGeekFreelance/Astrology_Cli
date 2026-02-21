## 🌟 Features

- **Multilingual Support**: Full localization for **English, Hindi, and Kannada** across the entire platform.
- **Personalized Recommendations**: Interactive tools for discovering lucky names, numbers, colors, and gemstones based on birth details.
- **Vedic Services**: Specialized consultations for health, wealth, career, legal matters, and children's welfare.
- **Vedic Sages Blog**: A content-rich section for articles on astrology, festivals, and spiritual remedies.
- **Direct Support**: Integrated WhatsApp and phone support for direct consultations.

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Radix UI
- **Content Management**: Sanity.io (GROQ, Portable Text)
- **Internationalization**: Custom Context API with persistent storage
- **Animations**: CSS Transitions & Lucide-React micro-animations

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, pnpm, or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd v0-vedic-astrology-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your Sanity credentials:
    ```env
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    NEXT_PUBLIC_SANITY_DATASET=production
    SANITY_API_WRITE_TOKEN=your_write_token
    ```

### Development

Run the development server:

```bash
npm run dev
# or
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
npx next build
```

### Seed Sanity Blog Data

Use this to create/update sample blog posts in Sanity for testing.

1. Ensure `SANITY_API_WRITE_TOKEN` is present in `.env.local` with write access.
2. Run:

```bash
npx ts-node -T scripts/seed-sanity.ts
```

What this script does:
- Upserts multiple sample blog posts across categories.
- Reuses fixed IDs so reruns update existing seeded posts instead of duplicating them.

## 🚢 Deployment

The project is optimized for deployment on **Netlify** or **Vercel**.

### Deploying to Netlify

1. Connect your GitHub repository to Netlify.
2. Set the build command to `next build`.
3. Set the publish directory to `.next`.
4. Add your environment variables in the Netlify dashboard.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (shadcn/ui and custom).
- `lib/`: Utility functions, Sanity client, and language context.
- `sanity/`: Sanity schema definitions and studio configuration.
- `public/`: Static assets and images.

## 🖊️ Content Management (CMS)

To edit blog posts and other content, visit the **Sanity Studio** at:

```
https://<your-production-domain>/admin
```

> **Locally**: [http://localhost:3000/admin](http://localhost:3000/admin)

Log in with your Sanity account to manage all content.

---

