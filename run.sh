
# common API packages
cd backend
npm install

# identity (authentication) API
cd api/identity
npm install
npm start > /dev/null 2>&1 &

# incident API
cd ../incident
npm install
npm start > /dev/null 2>&1 &

# react app
cd ../../../ui
npm install
npm start > /dev/null 2>&1 &