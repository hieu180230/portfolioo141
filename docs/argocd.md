# ArgoCD: The Robotic Reconciler

ArgoCD is the engine of GitOps. It removes human emotion, manual SSH access, and CLI errors from the deployment process.

### Key Learnings:
* **The Golden Rule of GitOps:** I learned the hard way *why* Kubernetes manifests must live in a completely separate GitHub repository from the application source code. Mixing them causes an infinite CI/CD loop and grants dangerous infrastructure access to application developers.
* **Custom Resource Definitions (CRDs):** When you install ArgoCD, it alters the Kubernetes API by injecting its own vocabulary. I learned that objects like `kind: Application` are not native to Kubernetes. To understand them, you have to read the vendor's CRD documentation, not the vanilla K8s docs.
* **Self-Healing Infrastructure:** ArgoCD treats the Git repository as the absolute source of truth. If someone manually logs into the server and alters a deployment, ArgoCD detects the drift and brutally overwrites the manual changes to match the Git state. It forces discipline.