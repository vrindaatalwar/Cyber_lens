# S056 - Login/Signup Components

This folder contains shadcn-style UI components for authentication pages.

## Folder Structure

```
S056/
├── components/
│   └── ui/
│       ├── button.tsx       # Button with variants
│       ├── card.tsx         # Card layout components
│       ├── checkbox.tsx     # Checkbox component
│       ├── demo.tsx         # Tabbed login/signup section
│       ├── input.tsx        # Form input
│       ├── label.tsx        # Form label
│       ├── login-signup.tsx # Login card section
│       ├── separator.tsx    # Visual separator
│       └── tabs.tsx         # Tab navigation
├── lib/
│   └── utils.ts             # cn() utility function
├── pages/
│   ├── Login.tsx            # Exports login-signup component
│   ├── Signup.tsx
│   └── VerifyEmail.tsx
└── README.md
```

## Integration Instructions

To integrate these components into the main project:

### 1. Install Dependencies

```bash
cd client/cyber_lens
npm install lucide-react @radix-ui/react-label class-variance-authority @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-separator @radix-ui/react-tabs clsx tailwind-merge
```

### 2. Configure Path Alias

**tsconfig.app.json** - Add to `compilerOptions`:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**vite.config.ts** - Add path resolution:
```ts
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 3. Copy Files

```bash
# Copy components
cp -r contributors/S056/components/ui/* client/cyber_lens/src/components/ui/

# Copy utility
mkdir -p client/cyber_lens/src/lib
cp contributors/S056/lib/utils.ts client/cyber_lens/src/lib/
```

### 4. Verify

```bash
cd client/cyber_lens
npm run build
npm run dev
```

## Components

### LoginCardSection (`login-signup.tsx`)
A full-page login form with:
- Animated particle background
- Email/password fields
- Remember me checkbox
- Social login buttons (GitHub, Google)
- Forgot password link

### TabAuthSection (`demo.tsx`)
A tabbed authentication form with:
- Login and Sign Up tabs
- Smooth blur transition between tabs
- Same features as LoginCardSection
- Additional "Full Name" field for signup

## Author

**Vrindaa Talwar** (@vrindaatalwar)
