# React TanStack Fullstack Boilerplate

A modern fullstack boilerplate using React, Vite, TanStack libraries, and TypeScript. Designed for rapid development of scalable web applications with best practices and a modular structure.

## Features

- **React** with TypeScript for robust UI development
- **Vite** for fast build and development
- **TanStack Router** for advanced routing
- **Plop** generators for scaffolding components, pages, services, and more
- **Prettier** and **ESLint** for code formatting and linting
- Modular folder structure for scalability

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
├── plop/           # Plop generators and helpers
├── public/         # Static assets
├── src/            # Application source code
│   ├── api/        # API service modules
│   ├── components/ # Reusable UI components
│   ├── context/    # React context providers
│   ├── data/       # Static data and configs
│   ├── pages/      # Page components
│   ├── routes/     # Route definitions
│   ├── styles/     # Global styles
│   ├── types/      # TypeScript types
│   └── utils/      # Utility functions
├── index.html      # Main HTML file
├── package.json    # Project metadata and scripts
├── vite.config.ts  # Vite configuration
└── ...
```

## Plop Generators

Automate code scaffolding for components, pages, services, and more.

```bash
pnpm plop
```

Follow the prompts to generate boilerplate code.

## Environment Variables

Copy `template.env` to `.env` and update values as needed.

```bash
cp template.env .env
```

## Linting & Formatting

- Lint: `pnpm lint`
- Format: `pnpm format`

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.

## License

MIT

## Author

[Julien Sebag](https://julien-sebag.com)