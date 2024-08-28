# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript.

## dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```
5. Levantar las bases de datos con el comando
    ```
    npx prisma migrate dev
    ```
6. Ejecutar el comando ```npm run dev```