# Hiro - A Miro Clone

Hiro is a collaborative whiteboard application built with Next.js, inspired by Miro. It allows users to create and collaborate on boards in real-time, with features like live cursors, board sharing, and real-time updates.

## Features

- 🔐 **Authentication & Authorization**
  - Secure user authentication with Clerk
  - Organization-based access control
  - Guest mode support
  - Automatic organization and board creation for new users

- 🎨 **Interactive Whiteboard**
  - Real-time collaboration
  - Live cursors showing other users' positions
  - Multiple layer support
  - Various drawing tools and shapes
  - Text and image insertion

- 👥 **Collaboration**
  - Real-time updates across all connected clients
  - Board sharing with customizable permissions
  - Organization-based workspace management
  - Guest access support

- 🛠️ **Technical Features**
  - Built with Next.js 14 and React
  - Real-time updates using Convex
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0 or later
- npm or yarn
- A Clerk account for authentication
- A Convex account for the backend

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CONVEX_URL=your_convex_url
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hiro.git
cd hiro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hiro/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard and board routes
│   └── api/               # API routes
├── components/            # React components
├── convex/               # Convex backend functions
├── hooks/                # Custom React hooks
└── public/              # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
