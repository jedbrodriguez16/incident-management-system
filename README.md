# incident-management-system

Incident Management System

## Running the App

- Install [Couchdb](http://couchdb.apache.org/ "link title") locally (port 5948)
  - NOTE: you have to update/delete the credentials in these folders depending on whether you installed your CouchDb with/without admin password
    - backend/api/identity/config/default.json
    - backend/api/incident/config/default.json
- Install NodeJS v8 and above (the node version during the development of this App is v14)
- On the terminal window, cd to source root folder and run the below commands

```
bash seed-db.sh # creates CouchDB databases and seeds data
npm install # installs concurrently
npm run app # concurrently runs NodeJS APIs and React App
```

- The App should automatically launch at http://localhost:3000 once finished
- Login Users

```
derek/password (admin)
jed/password (user)
yifeng/password (user)
```

## Services/APIs

### Identity

Authentication API - authentication and authorisation

### Incident

Tickets API - tickets management, this requires JWT token obtained from Identity API

## Prettify

```
npm run format
```

## Linting

```
npm run lint
```

## Unit Test

```
cd backend
npm test
```

## Testing API

You can make use of the postman collection and environment files in below directory

- backend/postman/

## Further improvements (if given more time)

- CouchDB composite keys for flexibility
- Paging
- Password encryption/decryption
- Identity API - to use one CouchDB databases instead of multiple
- Higher unit test coverage (currently it's as per below)

```
71.48% Statements 198/27769.44% Branches 25/3653.7% Functions 29/5471.38% Lines 197/276
```

- Validate API request/input (i.e. throw 400 BadRequest)
- Restrict API to be only accessible by the React App client
- Fix tslint issues
- React App client - use typescript
- Dockerize the full stack App
