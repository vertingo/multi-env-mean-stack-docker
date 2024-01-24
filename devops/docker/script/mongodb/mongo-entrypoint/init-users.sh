if [ "$MONGO_INITDB_CUSTOM_USERNAME" ] && [ "$MONGO_INITDB_CUSTOM_PASSWORD" ]; then
  "${mongo[@]}" "$MONGO_INITDB_CUSTOM_DATABASE" <<-EOJS
  db.createUser({
     user: $(_js_escape "$MONGO_INITDB_CUSTOM_USERNAME"),
     pwd: $(_js_escape "$MONGO_INITDB_CUSTOM_PASSWORD"),
     roles: [{role: "userAdminAnyDatabase",db: "$MONGO_INITDB_CUSTOM_DATABASE"},
       {role: "readWriteAnyDatabase",db:"$MONGO_INITDB_CUSTOM_DATABASE"},
       {role: "root",db: "$MONGO_INITDB_CUSTOM_DATABASE"}]})
EOJS
fi

echo ======================================================
echo created $MONGO_INITDB_CUSTOM_USERNAME in database $MONGO_INITDB_CUSTOM_DATABASE
echo ======================================================