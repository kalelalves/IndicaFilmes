# Usa node oficial como base
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json (se houver)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Compila TS para JS (gera na pasta dist)
RUN npm run build

# Expõe a porta que a app usa
EXPOSE 3000

# Comando para rodar a app em produção
CMD ["node", "dist/server.js"]
