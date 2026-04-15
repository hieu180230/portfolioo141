# Docker: The Immutable Box

Docker is the bridge between the developer's laptop and the cloud infrastructure. It guarantees that if the code runs on my machine, it runs in the Oracle Datacenter. 

### Key Learnings:
* **The Sin of the `latest` Tag:** Relying on the `latest` tag is a junior mistake. It creates mystery deployments where you have no idea what code is actually running. I learned to dynamically generate tags using `$(date +'%Y-%m-%d')-$(git rev-parse --short HEAD)`. This makes every deployment traceable and instantly rollback-able.
* **The Execution Boundary:** Docker marks the exact boundary where Continuous Integration (CI) ends and Continuous Delivery (CD) begins. You only box up the code *after* it survives the CI interrogation room.
* **Architecture Matters:** Building an image on an x86 laptop and pushing it to an ARM64 Oracle cloud server will result in a fatal `exec format error`. I learned to use `docker buildx` and `qemu` to cross-compile for `linux/arm64`.