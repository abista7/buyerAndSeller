# buyerAndSeller

# TO RUN

mongoDB, docker, and redis must be running

The MongoDB database for this applications is named FinalProject95

* To test the various features of the application you will need to create both a buyer and a seller account 
  from the registration page.

* Only buyers can select 'purchase' which will only be shown if a buyer is logged in on each individual item page.
* Only sellers can post items from their dashboard.
* Sellers must re-enter the page to see a recently posted item under 'Listed Items'

in root folder, frontend, and backend:
```
npm i
```

run the following in backend/api
```
docker-compose pull
docker swarm init
docker stack deploy -c docker-compose.yml project-demo
```

in one terminal, run in root:
```
npm run dev-server
```

in second terminal, run in frontend:
```
npm start
```

when finished, remove docker stack
```
docker stack remove project-demo
docker swarm leave --force
```
