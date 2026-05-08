# Docker

Docker is the bridge between the developer's environment and the cloud infrastructure. It guarantees that if the code runs on my machine, it runs in the Cloud Datacenter. 

> **Create user in Dockerfile for security:** I learnt that it is recommended to not use root user and create a new one for running binaries/commands.

> **Multiple build stage:**
>> It is ok to put everything in one stage when writting `Dockerfile`.
>
>> However, separating into stages can decrease the image size by only copy necessary files into the image, and improve image security by not bring dependencies into the image.
>
>> It is important **not** to bring local environment variables into the docker image. These secret should be store on local environment only.
>
>> **Optimizing the image size:**
>> - Multiple stages build (compile source code $\rightarrow$ copy the compiled binary/static/public files into the actual image)
>> - Use small image for builder (node-alpine or rust-slim-bookworm or debian-bookworm-slim)

> **The `latest` Tag:**
>> Relying on the `latest` tag is a mistake. It creates mystery deployments where you have no idea what code is actually running.
>
>> I use dynamically generate tags using `$(date +'%Y-%m-%d')-$(git rev-parse --short HEAD)`. This makes every deployment traceable and instantly rollback-able.

> **The Execution Boundary:** Docker marks the exact boundary where Continuous Integration (CI) ends and Continuous Delivery (CD) begins. We only package the code *after* it the CI pipeline with checks completes successfully.

> **Architecture Matters:**
>>We should be aware of the environment the code package will run on in production. Building an image on an x86 laptop and pushing it to an ARM64 cloud server will result in a fatal `exec format error`.
>
>> I use `docker buildx` for extending build capabilities and `qemu` for emulation to cross-compile for `linux/arm64`.