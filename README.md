## Version Table

|             | Version       |
|-------------|---------------|
| JDK         | 20 (Temurin)  |
| Spring Boot | 3.0.0         |
| Gradle      | 8.10          |
| Jib         | 3.4.3         |
| Minikube    | 1.32.0        |

# Minikube Deployment 

Deploy a Spring Boot application using Minikube on macOS and Windows with Ingress and manifest files.

---

## Prerequisites

- Docker
- Minikube
- kubectl
- HTTPie or curl

---

# Steps (macOS & Windows)

## 1. Pull the Docker Image
```bash
docker pull ghcr.io/cynicdog/cloud-native-spring-jib-k8s-action/catalog-service:latest
```
> 1. Make sure to clear the previous credentials on `ghcr.io` in your local Docker context by running `docker logout ghcr.io`.
> 2. You may specify the build platform of the image by adding `--platform` tag with the value `linux/amd64` or `linux/arm64`.

## 2. Start Minikube
```bash
minikube start --cpus 2 --memory 4g --driver docker
```
> Assign compute resources at your need. 

## 3. Load the Image onto Minikube (Optional) 
> You may skip this step if services are to be deployed declaratively using manifest files.

### 3.1. For Linux/macOS:
3.1.1. Set Docker to use Minikube’s environment:
```bash
eval $(minikube docker-env)
```

3.1.2. Load the image into Minikube:
```bash
minikube image load cynicdog/catalog-service:latest
```

### 3.2. For Windows:
3.2.1. Save the image as `.tar`:
```bash
docker image save -o catalog-service-image.tar cynicdog/catalog-service:latest
```

3.2.2. Load the image into Minikube:
```bash
minikube image load catalog-service-image.tar
```

## 4. Apply the Manifest Files

4.1. Enable Ingress on Minikube (if not done already):
```bash
minikube addons enable ingress
```

4.2. Apply the Kubernetes deployment and service manifest:
```bash
kubectl apply -f ./manifest/
```

## 5. Access the Application via Ingress

Once the Ingress is applied, you can retrieve the Minikube IP:
```bash
minikube ip
```

Then, expose the cluster to the local environment:
```bash
minikube tunnel
```

You'll be seeing the following result: 
```
http http://127.0.0.1/books

HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Thu, 19 Sep 2024 03:30:02 GMT
Transfer-Encoding: chunked
X-RateLimit-Burst-Capacity: 20
X-RateLimit-Remaining: 19
X-RateLimit-Replenish-Rate: 10
X-RateLimit-Requested-Tokens: 1

[
    {
        "author": "Lyra Silverstar",
        "createdDate": "2024-09-19T03:24:10.731070Z",
        "id": 1,
        "isbn": "1234567891",
        "lastModifiedDate": "2024-09-19T03:24:10.731070Z",
        "price": 9.9,
        "publisher": "Polarsophia",
        "title": "Northern Lights",
        "version": 1
    },
    ... 
]
```


# Defining a security realm on Keycloak 

#### 1. Execute a bash session in the running container: 
```
kubectl exec -it <POD-name> -- /bin/bash
```

#### 2. Navigate to the CLI script directory and authenticate the session: 
```
cd /opt/keycloak/bin
./kcadm.sh config credentials \
    --server http://localhost:8080 \
    --realm master \
    --user {USER_NAME} \
    --password {PASSWORD}
```

#### 3. Create a dedicated realm for a service:
```
./kcadm.sh create realms -s realm={REALM_NAME} -s enabled=true
```

#### 4. Create roles: 
```
$ ./kcadm.sh create roles -r {REALM_NAME} -s name={ROLE_NAME}
```

#### 5. Add users and credentials:
```
./kcadm.sh create users -r {REALM_NAME} \
    -s username={USERNAME} \
    -s firstName={FIRST_NAME} \
    -s lastName={LAST_NAME} \
    -s enabled=true
 
./kcadm.sh add-roles -r {REALM_NAME} \
    --uusername {USERNAME} \
    --rolename {ROLE_NAME_1} \
    --rolename {ROLE_NAME_2}
    
./kcadm.sh set-password -r {REALM_NAME} \
   --username {USERNAME} \
   --new-password {PASSWORD}
```

### 6. Register Edge Service as OAuth2 Client in the realm 
Make sure you properly set the redirect URIs based on execution context. 

#### 6.1. Local Execution 
```
./opt/keycloak/bin/kcadm.sh create clients -r PolarBookshop \
    -s clientId=edge-service \
    -s enabled=true \
    -s publicClient=false \
    -s secret=polar-keycloak-secret \
    -s 'redirectUris=["http://localhost:9000", "http://localhost:9000/login/oauth2/code/*"]'
```

#### 6.2. Containerized Execution (Docker Compose)
```
./opt/keycloak/bin/kcadm.sh create clients -r PolarBookshop \
    -s clientId=edge-service \
    -s enabled=true \
    -s publicClient=false \
    -s secret=polar-keycloak-secret \
    -s 'redirectUris=["http://edge-service:9000", "http://edge-service:9000/login/oauth2/code/*"]'
```

#### 6.3. Kubernetes Execution 

First, start the Minikube tunnel to make both Keycloak and the edge-service accessible. 

```
minikube addons enable ingress 

kubectl apply -f edgeservice-ingress.yml 
kubectl apply -f keycloak-ingress.yml 

minikube tunnel 
```

Next, we need to modify the local DNS configuration. In Kubernetes, services are discovered by their names (such as edge-service and polar-keycloak). This works well for internal communications within the Kubernetes cluster.

However, the Keycloak OAuth2 authentication flow requires requests with a URI that is exposed to the browser outside the cluster. Therefore, we need to configure local DNS so that the hostname resolves to the cluster IP address, which is accessible through the ingress interface we just created.

On terminal, run: 
```
echo "<127.0.0.1 | ip-address> polar-keycloak" | sudo tee -a /etc/hosts
```

If window, run as an administrator:
```
Add-Content C:\Windows\System32\drivers\etc\hosts "127.0.0.1 polar-keycloak"
```

Now with the correct redirect URIs, let's bind the `edge-service` client to KeyCloak.  
```
./opt/keycloak/bin/kcadm.sh create clients -r PolarBookshop \
    -s clientId=edge-service \
    -s enabled=true \
    -s publicClient=false \
    -s secret=polar-keycloak-secret \
    -s 'redirectUris=["http://127.0.0.1", "http://127.0.0.1/login/oauth2/code/*"]'
```
> Ensure the IP address (127.0.0.1) matches the Minikube tunnel gateway (in linux, you can retrieve the specific IP by running `minikube ip`)`.
