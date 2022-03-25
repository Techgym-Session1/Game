# 1. Importa l'immagine node:lts-alpine


# 2. Copia il file package.json all'interno del container


# 3. Installa i pacchetti node_modules necessari con 'npm install && npm install -g serve'


# 4. Copia tutto il contenuto della folder all'interno del container

ENV REACT_APP_BACKEND_URL "https://backend-techgym-backend.itzroks-663002gl0c-cu2ib6-6ccd7f378ae819553d37d5f2ee142bd6-0000.eu-de.containers.appdomain.cloud"
ENV REACT_APP_IMG_SOURCE "https://cos-techgym-one-cos-archive-ybc.s3.eu-de.cloud-object-storage.appdomain.cloud"

# 5. Esegui lo script 'npm run build' per buildare l'applicazione


# 6. Esponi la porta 3000 del container


# 7. Esegui il comando 'serve build' per far partire l'applicazione
