# Stop any running Node.js processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Install core dependencies
npm install next@14.1.0 react@18.2.0 react-dom@18.2.0

# Install TypeScript and type definitions
npm install -D typescript @types/react @types/react-dom @types/node

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install -D @tailwindcss/typography @tailwindcss/forms

# Install additional UI libraries
npm install react-icons

# Create default Tailwind config if it doesn't exist
if (-not (Test-Path "tailwind.config.js")) {
    npx tailwindcss init -p
}

# Build the project to verify everything works
npm run build
