
./opt/keycloak/bin/kcadm.sh config credentials \
  --server http://localhost:8080 \
  --realm master \
  --user cynicdog \
  --password cynicdog

./opt/keycloak/bin/kcadm.sh create realms -s realm=cynicdog -s enabled=true

./opt/keycloak/bin/kcadm.sh create roles -r cynicdog -s name=developer

./opt/keycloak/bin/kcadm.sh create users \
  -r cynicdog \
  -s username=cynicdog \
  -s firstName=eunsang \
  -s lastName=lee \
  -s enabled=true

./opt/keycloak/bin/kcadm.sh add-roles \
  -r cynicdog \
  --uusername cynicdog \
  --rolename developer

./opt/keycloak/bin/kcadm.sh set-password -r cynicdog --username cynicdog --new-password cynicdog

# register Edge Service as an OAuth2 Client in the realm
./opt/keycloak/bin/kcadm.sh create clients -r cynicdog \
    -s clientId=backend-for-frontend \
    -s enabled=true \
    -s publicClient=false \
    -s secret=bff_client_secret \
    -s 'redirectUris=["http://127.0.0/1", "http://127.0.0.1/login/oauth2/code/*"]'

/opt/keycloak/bin/kcadm.sh create identity-provider/instances \
	-r cynicdog \
	-s alias=github \
	-s providerId=github \
	-s enabled=true  \
	-s 'config.useJwksUrl="true"' \
	-s config.clientId={GITHUB_APP_CLIENT_ID} \
	-s config.clientSecret={GITHUB_APP_CLIENT_SECRET}
