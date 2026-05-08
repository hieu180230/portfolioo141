# DevSecOps & GitOps

This repo is my portfolio hosted on the cloud through automated **DevSecOps and GitOps** pipeline.

[My Portfolio](https://nnhieu.duckdns.org) <br>
[My grafana watch for the Portfolio](https://nnhieu-grafana.duckdns.org)

## The Architecture & Workflows
![Alt text](/docs/Kubernetes%20Application-diagram.svg)


### The DevOps Workflow
Before code ever reaches a user, it must survive the pipeline. The CI/CD process is a ruthless gauntlet designed to catch human error:
1. **Continuous Integration:** 
> **Condtion:** Every commits into `dev/others` branch will trigger the CI actions.

> Pull requests to `main` trigger GitHub Actions. We run jobs for Next.js linting/building, Rust memory safety (`cargo clippy`, `cargo test`), and secret scanning. If a test fails, the PR is physically blocked from merging.

2. **Continuous Delivery:**
> Approved code is built into a highly optimized Docker container. We dynamically tag the image using the Git commit hash. **The `latest` tag is strictly prohibited here** to guarantee deterministic rollbacks. 

3. **The result of two actions above:**
> The immutable image is pushed to *Docker Hub*, and our pipeline automatically updates the Kubernetes manifest files in our infrastructure repository *(This is different from the source code repository)*.

### The GitOps Workflow
1. **Separation of Concerns:**
> Application source code (this repository) is entirely separated from Kubernetes/Helm infrastructure manifests (should be on another repository). This prevents CI/CD infinite loops and isolates cloud security.
2. **The Reconciler:**
> ArgoCD lives inside our K3s cluster, endlessly watching the manifest repository. When our CI pipeline updates the image tag, ArgoCD detects the configuration drift and immediately synchronizes the live cluster to match the Git state.

## Tool Arsenal
I have documented while learning and the engineering philosophy behind every tool in this stack. Click below to read my humble notes (and maybe if you want to contribute something):

* [ArgoCD](/docs/argocd.md)
* [Docker](/docs/docker.md)
* [GitHub Actions](/docs/github-actions.md)
* [Kubernetes & Traefik](/docs/kubernetes.md)
* [GitOps](/docs/gitops.md)

<!-- ## Difficulties Encountered
You don't learn DevSecOps by following a perfect tutorial. You learn it by accidentally burning your server down. Here are the scars I earned building this:

* **The Kubernetes Grammar Crime:** I once spent hours debugging why my Let's Encrypt SSL certificate wouldn't generate. The culprit? I wrote `annotation:` instead of `annotations:` in my Ingress YAML. The Kubernetes API silently incinerated my command without warning. Lesson learned: Always use a YAML linter.
* **The "Fake IP" Rate Limit Trap:** I tried to set up Traefik rate-limiting, but Kubernetes was masking all external IP addresses via SNAT (Source Network Address Translation). I almost permanently IP-banned my own cluster from communicating with itself. I had to hot-patch the Traefik LoadBalancer with `externalTrafficPolicy: Local` to expose the real client IPs.
* **The DNS Dictatorship:** I attempted to put a Cloudflare WAF in front of a free `duckdns.org` domain. Cloudflare laughed and demanded Root Nameserver authority, which DuckDNS obviously doesn't grant. I learned that enterprise edge security requires owning an actual Apex domain. -->