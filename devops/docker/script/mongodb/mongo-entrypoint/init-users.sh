#!/bin/bash

set -e

remove_quotes() {
    local input="$1"
    echo "${input//\"}"
}


# Check if the admin user already exists
if ! mongosh admin --eval "db.getUser('admin')"; then
    # Admin user does not exist, create it
    if [ -n "$MONGO_INITDB_ROOT_USERNAME" ] && [ -n "$MONGO_INITDB_ROOT_PASSWORD" ]; then
        mongosh admin <<-EOJS
            db.createUser({
                user: '$(remove_quotes $MONGO_INITDB_ROOT_USERNAME)',
                pwd: '$(remove_quotes $MONGO_INITDB_ROOT_PASSWORD)',
                roles: [{ role: 'root', db: 'admin' }]
            })
EOJS
    fi
else
    echo "User Admin already exist"
fi

# Check if the MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD are set
if [ -n "$MONGO_INITDB_USERNAME" ] && [ -n "$MONGO_INITDB_PASSWORD" ]; then
    mongosh admin <<-EOJS
      use $(remove_quotes $MONGO_INITDB_DATABASE)
      db.createRole({
        role: "userAdminAnyDatabase",
        privileges: [
         { resource: { db: '$(remove_quotes $MONGO_INITDB_DATABASE)', collection: '' }, actions: ['anyAction'] }
        ],
        roles: []
      })
      db.createRole({
        role: "readWriteAnyDatabase",
        privileges: [
         { resource: { db: '$(remove_quotes $MONGO_INITDB_DATABASE)', collection: '' }, actions: ["find", "insert", "update", "remove"] }
        ],
        roles: []
      })
      db.createUser({
            user: '$(remove_quotes $MONGO_INITDB_USERNAME)',
            pwd: '$(remove_quotes $MONGO_INITDB_PASSWORD)',
            roles: [{role: 'userAdminAnyDatabase',db: '$(remove_quotes $MONGO_INITDB_DATABASE)'},
                    {role: 'readWriteAnyDatabase',db: '$(remove_quotes $MONGO_INITDB_DATABASE)'}]})
      db.grantRolesToUser('$(remove_quotes $MONGO_INITDB_USERNAME)', [{ role: 'userAdminAnyDatabase', db: '$(remove_quotes $MONGO_INITDB_DATABASE)' }])
      db.grantRolesToUser('$(remove_quotes $MONGO_INITDB_USERNAME)', [{ role: 'readWriteAnyDatabase', db: '$(remove_quotes $MONGO_INITDB_DATABASE)' }])
      use $(remove_quotes $MONGO_INITDB_ROOT_DATABASE)
      db.grantRolesToUser('$(remove_quotes $MONGO_INITDB_ROOT_USERNAME)', [{ role: 'userAdminAnyDatabase', db: '$(remove_quotes $MONGO_INITDB_ROOT_DATABASE)' }])
      db.grantRolesToUser('$(remove_quotes $MONGO_INITDB_ROOT_USERNAME)', [{ role: 'readWriteAnyDatabase', db: '$(remove_quotes $MONGO_INITDB_ROOT_DATABASE)' }])
      db.grantRolesToUser('$(remove_quotes $MONGO_INITDB_ROOT_USERNAME)', [{ role: 'root', db: '$(remove_quotes $MONGO_INITDB_ROOT_DATABASE)' }])
EOJS
fi

