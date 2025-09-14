# Stop any running Node.js processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Remove existing node_modules and lock files
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules
Remove-Item -Force -ErrorAction SilentlyContinue package-lock.json
Remove-Item -Force -ErrorAction SilentlyContinue .next

# Install dependencies
npm install next@14.1.0 react@^18.2.0 react-dom@^18.2.0
npm install -D @types/node @types/react @types/react-dom typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install -D @tailwindcss/typography @tailwindcss/forms
npm install react-icons
