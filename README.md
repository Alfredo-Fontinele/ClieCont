# 📋 ClieCont

- A aplicação está disponível em https://clie-cont.vercel.app/
- A API está disponível apenas em localhost

## 🚀 Instruções para rodar o projeto

Este projeto consiste em uma aplicação web em Node.js com um cliente front-end em React. Siga os passos abaixo para executá-lo em sua máquina.

### 🔑 Pré-requisitos

* Caso você possua o Docker instalado na sua máquina:
* Obs: Os Arquivos de configuração do Docker foram definidos na branch "docker" apenas por enquanto

1. Clone este projeto
2. Rode `git checkout docker`
3. Entre no diretório da api
4. Configure o arquivo .env 
5. Rode `docker compose up`

* Caso não, existem os seguintes requisitos:

- PostgreSQL instalado na máquina
- Arquivo `.env` configurado baseado no arquivo `.env.example`
- Yarn instalado

### 💻 Instalação

Passo a passo para instalação do projeto.

### ▶️ Como rodar

1. Entre na pasta `api-client-nodejs` e rode `yarn`
2. Crie um banco de dados no PostgreSQL
3. Rode `yarn runner` para rodar as migrations
4. Rode `yarn dev` para inicializar o servidor
5. Entre na pasta `client-front-end` e rode `yarn`
6. Rode `yarn dev` e acesse a rota disponibilizada no seu navegador de preferência
