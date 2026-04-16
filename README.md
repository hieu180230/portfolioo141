# DevSecOps & GitOps

Welcome. If you have stumbled upon this repository, you are likely looking at the frontend layer of a Next.js application. But the React code is only half the story. 

This project is a living laboratory for **DevSecOps and GitOps**. It is built for developers who are tired of applications that "only work on my machine" and want to understand how software is securely and predictably delivered to a production Kubernetes cluster.

## The Architecture & Workflows



### The DevOps Workflow (Continuous Integration & Delivery)
Before code ever reaches a user, it must survive the pipeline. The CI/CD process is a ruthless gauntlet designed to catch human error:
1. **The Gatekeeper (CI):** 
- Every commits into dev/others branch will trigger the CI actions.
- Pull requests to `main` trigger GitHub Actions. We run parallel jobs for Next.js linting/building, Rust memory safety (`cargo clippy`, `cargo test`), and secret scanning. If a test fails, the PR is physically blocked from merging.
2. **The Packaging Plant (CD Bridge):** Approved code is built into a highly optimized Docker container. We dynamically tag the image using the Git commit hash. **The `latest` tag is strictly prohibited here** to guarantee deterministic rollbacks. 
3. **The Hand-off:** The immutable image is pushed to Docker Hub, and our pipeline automatically updates the Kubernetes manifest in our separate infrastructure repository.

### The GitOps Workflow (Continuous Deployment)
We do not manually SSH into servers. We do not run `kubectl apply` from our laptops. We practice strict GitOps.
1. **Separation of Concerns:** Application source code (this repo) is entirely separated from Kubernetes infrastructure manifests (Repo 2). This prevents CI/CD infinite loops and isolates cloud security.
2. **The Reconciler:** ArgoCD lives inside our K3s cluster, endlessly watching the manifest repository. When our CI pipeline updates the image tag, ArgoCD detects the configuration drift and immediately synchronizes the live cluster to match the Git state.

## Tool Arsenal
I have documented the brutal lessons learned and the engineering philosophy behind every tool in this stack. Click below to read the technical deep dives:

* [ArgoCD: The Robotic Reconciler](./docs/argocd.md)
* [Docker: The Immutable Box](./docs/docker.md)
* [GitHub Actions: The Ruthless Bouncer](./docs/github-actions.md)
* [Kubernetes & Traefik: The Cloud Fortress](./docs/kubernetes.md)

## Difficulties Encountered
You don't learn DevSecOps by following a perfect tutorial. You learn it by accidentally burning your server down. Here are the scars I earned building this:

* **The Kubernetes Grammar Crime:** I once spent hours debugging why my Let's Encrypt SSL certificate wouldn't generate. The culprit? I wrote `annotation:` instead of `annotations:` in my Ingress YAML. The Kubernetes API silently incinerated my command without warning. Lesson learned: Always use a YAML linter.
* **The "Fake IP" Rate Limit Trap:** I tried to set up Traefik rate-limiting, but Kubernetes was masking all external IP addresses via SNAT (Source Network Address Translation). I almost permanently IP-banned my own cluster from communicating with itself. I had to hot-patch the Traefik LoadBalancer with `externalTrafficPolicy: Local` to expose the real client IPs.
* **The DNS Dictatorship:** I attempted to put a Cloudflare WAF in front of a free `duckdns.org` domain. Cloudflare laughed and demanded Root Nameserver authority, which DuckDNS obviously doesn't grant. I learned that enterprise edge security requires owning an actual Apex domain.