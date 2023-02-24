# Getting started

Install dependencies with `yarn` or `npm`:

```bash
yarn
```

Then, you can run locally in development mode with live reload:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser
to see your project.

## Code organization

```
.
├── README.md                    # README file
├── components                   # Shared components
│   └── X
│       └── X.tsx
│       └── index.ts
├── constants                    # Shared constants
├── context                      # Shared context state
├── hooks                        # Shared hooks
│   └── tests
├── pages                        # Next JS pages
├── public                       # Public folder
│   └── img                      # Images used by the app
├── styles                       # PostCSS style folder with Tailwind
│   └── vendor                   # Third-party CSS
├── types                        # Shared TypeScript interfaces
├── utils                        # Utility folder
│   └── tests
├── next.config.js               # Next JS configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Read on:

- [Home](../README.md)
- [Code style](./CODE_STYLE.md)
- [Tech ecosystem](./TECH_ECOSYSTEM.md)
- [Editor](./EDITOR.md)
- [Version control](./VERSION_CONTROL.md)
- [Writting test](./WRITING_TEST.md)
