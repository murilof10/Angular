# Desafio Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Tecnologias utilizadas

1. Front-end
  1. [Angular 11](https://angular.io/)
  1. [Angular Material](https://material.angular.io/)
  1. [Bootstrap](https://getbootstrap.com/)
1. Cloud
  1. [Localstack](https://localstack.cloud/)
1. API
  1. [JSON server](https://www.npmjs.com/package/json-server)

## Configurando o Localstack

Como o localstack simula localmente as funções da AWS, devemos configurar o container docker com as definições usadas para subir uma página web na AWS S3. Os comandos abaixo executados na pasta da aplicação configuram o ambiente AWS para uso local usando como base a build da pasta `localstack/s3` e as configurações do arquivo da pasta `localstack/config`.

* Inicie o container `docker-compose.yml` da aplicação com o comando `docker-compose up`.
* No console do container execute a linha `/root/localstack/config/config.sh` para iniciar o arquivo de configuração do container com as definições AWS S3.

## JSON Server

Serviço que simula localmente uma API para consumo. Usa como base o arquivo `db.json` da aplicação.

* Execute o comando `npm install -g json-server` para instalar o pacote npm da API.
* Execute o comando `json-server db.json` na pasta do projeto para iniciar a API com os dados do arquivo db.json.

## Acessando a aplicação

* Após as configurações do ambiente local, a aplicação fica disponível pelo navegador através da URL `http://localhost:4566/mybucket/index.html`.
* Os recursos de API consumidos do JSON server rodam no `http://localhost:3000/`

## Teste unitário Angular

Caso deseje executar os testes unitários da aplicação.

* Instale as dependências do projeto com o comando `npm install`.
* Execute o comando `npm run test` para executar os testes via [Karma](https://karma-runner.github.io).
