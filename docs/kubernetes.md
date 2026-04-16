# Kubernetes & Traefik: The Cloud Fortress


Kubernetes (specifically K3s) is the orchestrator that keeps this architecture alive. It is a paranoid, closed-box system by default, which is great for security but requires explicit networking rules.

- This tool is used to orchestrate images in form of clusters and namespaces. A namespace in a cluster contains pods (deployments), services, applications, issuer, ingress, etc.
    - [**Deployment**](https://kubernetes.io/docs/concepts/workloads/pods/): contains metadata for the pods which is hosting the docker image such as name, port, resources, readiness probes, ...
    - [**Service**](https://kubernetes.io/docs/concepts/services-networking/service/): Expose the one or more deployments to one endpoint. Hence making these deployment available on the network for clients to interact.
    - [**Ingress**](https://kubernetes.io/docs/concepts/services-networking/ingress/): Manage external access to a service in a cluster. Typically HTTP. An Ingress may be configured to give Services externally-reachable URLs, load balance traffic, terminate SSL / TLS, and offer name-based virtual hosting. Must have an **Ingress Controller** (In this case: Traefik. In other cases, it could be Nginx, Ngrok, ...).
        - [**Ingress Controller**](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/): Imagine **Ingress** as a map and **Ingress Controller** is the tour guide navigating and following the map and the rules written on it. Everything must go through it before reaching any of the stuffs inside Kubernetes. This is where we can apply rate limiting, authentication, WAF.

### Key Learnings:
* **Ingress vs. Ingress Controller:** The most misunderstood concept in K8s. The `Ingress` (the YAML file) is just a printed map. The `Ingress Controller` (Traefik) is the actual software driver that reads the map, terminates the HTTPS TLS encryption, and routes traffic to the internal Services. 
* **The Gateway API Evolution:** While this project uses the standard Ingress API, I learned that the Ingress API is now officially frozen by the Kubernetes project. The future is the Gateway API (`GatewayClass`, `Gateway`, `HTTPRoute`), which decouples TLS management (DevOps) from application routing (Developers).
* **Automated Cryptography:** We don't manually paste SSL certificates. I learned to deploy `cert-manager` as a robotic lawyer that negotiates with Let's Encrypt via HTTP-01 challenges, provisions the certificates, and automatically renews them before they expire.
* **Layer 7 Rate Limiting:** Protecting the server from DDoS requires Traefik Middlewares. I learned how to create a `Middleware` CRD to clamp down on IP addresses that exceed request thresholds, protecting the backend database from race conditions and connection exhaustion.