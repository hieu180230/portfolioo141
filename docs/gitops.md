# GitOps

For *Infrastration as code*, *Configuration as code*, *Policy as code* and so on, we need a single source of truth for these files. This is where GitOps comes in.

> **Why single source of truth**: To prevent the actions of each team member accesses to the k8s cluster and manually applies config files, which will cause cluster ambiguity, I use Git as the single source of truth (hence the name **GitOps** I guess).

> **Version control**: Since **GitOps** runs on cloud repository (Github, Gitlab), we are supported with version control. As a result:
>> I can know who made the last commit
>
>> Configuration files can be easily reverted

> **Flow:**
>> - On main branch, we will create a new branch for dev only (never commit changes on the main or origin)
>> - On the new branch, developers make changes on the file, test it on local and then commit these changes.
>> - When changes commited, CI pipelines run to check for systax error, build error, run test, ... on the cloud server of Git to validate the code.
>> - After the CI pipelines run sucessfully, team lead (or someone equivalent) approves changes and starts merging the dev branch into the main branch.
>> - In main branch, CI pipelines run again before deploying.
>
>> **Push Deployment and Pull Deployment**
>> - Push Deployment is the traditional way to deploy changes to test/production environment using CI/CD pipeline and tools like Jenkins, Github Actions, ...
>> - Pull Deployment uses agents on the test/production environment (like ArgoCD in K8s Cluster). These agents watch the target repository once in a fixed period of time and try to sync the desired state (new changes) and current state of the cluster.
