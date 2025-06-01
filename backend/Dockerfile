FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Instala apenas as dependências
COPY package*.json ./
RUN npm install

# Copia apenas os arquivos de tipagem e fontes (resto vem via volume)
COPY tsconfig.json ./

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando padrão para rodar o app em modo dev
CMD ["npm", "run", "dev"]
