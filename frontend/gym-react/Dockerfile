# ============================================================
# Dockerfile de DESARROLLO — Solo para hot-reload
# No hace build, corre Vite en modo dev
# ============================================================
FROM node:22-alpine

WORKDIR /app

# Instalamos las dependencias primero (aprovecha cache de Docker)
COPY package.json package-lock.json ./
RUN npm ci

# El código fuente NO se copia aquí — viene montado como volumen
# desde docker-compose.dev.yml para habilitar el hot-reload

EXPOSE 5173

# Corre el servidor de desarrollo de Vite
CMD ["npm", "run", "dev"]
