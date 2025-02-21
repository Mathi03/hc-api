# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer zona horaria
ENV TZ=America/Chicago

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Chicago /etc/localtime && \
    echo "America/Chicago" > /etc/timezone
 
# Definir el directorio de trabajo
WORKDIR /backend

# Copiar archivos de configuración antes del código
COPY package*.json tsconfig.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript
RUN npx tsc

# Exponer el puerto
EXPOSE 8080

# Iniciar la aplicación
CMD ["node", "dist/server.js"]
