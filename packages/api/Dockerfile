# ---- Stage 1: Build dependencies ----
FROM node:20-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install ALL dependencies
RUN npm ci

# Copy rest of the source code
COPY . .

# Build TypeScript
RUN npm run build

# ---- Stage 2: Production ----
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Don't run as root (security best practice)
USER node

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]