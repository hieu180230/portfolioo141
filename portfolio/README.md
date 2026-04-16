# Portfolio: A DevSecOps and GitOps Laboratory (Improving)
> This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

> This repository is a living, breathing laboratory for **DevSecOps**, **Continuous Integration**, and **GitOps**. It is built for developers who are tired of applications that "only work on my machine" and want to understand how software is securely and predictably delivered to a production Kubernetes cluster.

> If you are still manually *SSHing* into servers or blindly pushing ``latest`` tags to Docker Hub, grab a coffee. We have some infrastructure to build.

## Getting Started

First, run the development server depend on which package manager you are using:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Infrastructure & CI/CD Pipeline
The deployment lifecycle is fully automated, enforcing security and stability through rigorous CI checks before any code reaches the Kubernetes cluster.
### CI - Testing locally, Integrating and Automation
- The CI pipeline is orchestrated via GitHub Actions and is strictly enforced on pull requests. Code cannot be merged into `main` unless it passes the following automated gates:
    - **Frontend Validation:** Enforces strict linting rules using ESLint, targeting:
        - [`next/core-web-vitals`](https://nextjs.org/learn/seo/web-performance):  Prevents performance regressions.
        - [`react-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y): Enforces strict accessibility standards on all JSX elements.
        - [`react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks): Prevents memory leaks and lifecycle bugs.
    - **Backend Validation:** Enforces memory safety and logic integrity using `cargo test` and `cargo clippy` (Strict Mode) for the Rust API. *(Note: Backend pipeline integration is currently under active development).*
    - **GitOps Workflow:** `dev` branches run continuous checks on every push. The `main` branch acts as a protected environment, requiring approved PRs and passing status checks before merging.

### CD - Continuous Delivery
- Once the code proves it is worthy of production, we package it using **Docker**
- This is the step where I build the Docker image with a proper tag and push this to Docker Hub. **The tag should not be `latest`**. This bold notice will come in handy later.
- Upon a successful merge to `main`, the deployment artifact is generated:
    ```
    docker build
    docker tag
    docker push
    ```
    - Check the [docker document](https://docs.docker.com/) for more uses.
    - The image is tagged using a dynamically generated, immutable UUID/Commit Hash. **The `latest` tag is strictly prohibited** to ensure deterministic rollbacks.
    - The image is then pushed to Docker Hub, and the new tag is extracted for the GitOps workflow.

### CD - Continuous Deployment (GitOps & Kubernetes)
- The production environment operates on a K3s (Kubernetes) cluster, completely decoupled from the application source code.

<blockquote>
    All Kubernetes manifests are stored in a separate, isolated Git repository. <br> This separation of concerns prevents CI/CD infinite loops (where updating a deployment tag triggers another Docker build) and strictly controls who has access to the cloud infrastructure.
</blockquote>

- Then, I check the tag for any inappropriate changes, and using git remote and sed to replace the image tag in the deployment manifest in the `manifest repo`:
    - With ArgoCD: 
        - ArgoCD continuously monitors the manifest repository. When the CI pipeline automatically updates the image tag in the manifest repo via `sed`, ArgoCD detects the configuration drift and immediately synchronizes the Kubernetes cluster to match the desired state.
    - Without ArgoCD:
        - Without ArgoCD to do the hard work, we will have to `ssh` into the virtual machine, pull the image from docker hub, manually run the script of 
        ```bash
        kubectl set image ...
        #or
        kubectl apply -f ...
        ```
        to apply the changes. 

## Toolchains
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

hjghjgghjg