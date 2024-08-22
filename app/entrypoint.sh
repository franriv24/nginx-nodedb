#!/bin/sh

# Instalar dependências se não existirem no volume montado
if [ ! -d "node_modules" ]; then
  npm install
fi

# Verifica se a tabela 'people' existe antes de iniciar a aplicação
node /usr/src/app/check-table.js

# Iniciar a aplicação
npm start