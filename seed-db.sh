HOST=http://admin:admin@localhost:5984
GROUP_DB=group
USER_DB=user
APPLICATION_DB=application
INCIDENT_DB=incident

echo 'creating and seeding Identity API database...'

curl -X PUT "$HOST/$GROUP_DB"
curl -X PUT "$HOST/$USER_DB"
curl -X PUT "$HOST/$APPLICATION_DB"

# group DB
curl -X PUT -H "Content-Type: application/json" --data "@backend/seed-db/group/views.json" "$HOST/$GROUP_DB/_design/group"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/group/admin.json" "$HOST/$GROUP_DB"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/group/user.json" "$HOST/$GROUP_DB"

# user DB
curl -X PUT -H "Content-Type: application/json" --data "@backend/seed-db/user/views.json" "$HOST/$USER_DB/_design/user"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/user/derek.json" "$HOST/$USER_DB"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/user/jed.json" "$HOST/$USER_DB"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/user/yifeng.json" "$HOST/$USER_DB"

# application DB
curl -X PUT -H "Content-Type: application/json" --data "@backend/seed-db/application/views.json" "$HOST/$APPLICATION_DB/_design/application"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/application/client-id.json" "$HOST/$APPLICATION_DB"

echo 'done!'

echo 'creating and seeding Incident API database...'

curl -X PUT "$HOST/$INCIDENT_DB"

# incident DB
curl -X PUT -H "Content-Type: application/json" --data "@backend/seed-db/incident/views.json" "$HOST/$INCIDENT_DB/_design/incident"
curl -X POST -H "Content-Type: application/json" --data "@backend/seed-db/incident/ticket.json" "$HOST/$INCIDENT_DB"

echo 'done!'

echo 'DB setup done!'