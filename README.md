# my-partner-outdoor-back vvv

## Description

La Description de l'app

## Installation

* Depuis votre Terminal : git clone git@github.com:O-clock-Olduvai/my-partner-outdoor-back.git
* Depuis le  repository : npm install
* Renommer le ".env.example" en ".env"
* Créer la BDD et USER :
  * sudo -i -U postgres psql
  * CREATE ROLE mypartner WITH LOGIN PASSWORD 'mypartner';
  * CREATE DATABASE mypartner OWNER mypartner;
  * \q
* Création et Seeding : npm run resetDB
* npm run dev
* http://localhost:4000/api-docs

