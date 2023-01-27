<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Inicializar el proyecto pokedex

1. Clonar repo
2. Ejecutar
```
  yarn install
```
3. Instalar nest cli
```
  npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
  docker compose up -d
```
5. Clonar el archivo el __.env.template__ y renombrarlo a .env

6. Llenar las variables de entorno definidas en .env

7. Ejecutar la app. 
```
  yarn start:dev
```
8. Reconstruir los datos con el seed.
```
  localhost:3000/api/v2/seed
```


## Stak Usado
* Mongo db
* Nest
* Table Plus
