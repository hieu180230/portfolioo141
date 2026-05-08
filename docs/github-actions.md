# GitHub Actions

GitHub Actions can be used to automate pipeline including compiling code, running security checks. To avoid delevering broken code to production, we have to implement enforcment on the pipeline (such as the `Docker` tags and k8s manifest alteration).


> **The "Build" Requirement:** Beside `ESLint` for frontend CI which is just a spell-checker, I run `npm run build` in my CI pipeline to prove the Next.js compiler won't actually choke on the code.

> **Parallel Execution is Mandatory:** Running security scans, frontend tests, and backend tests in a single file line is a waste of time. Splitting them into parallel jobs cuts pipeline time in half.

> **Branch Protection Rules:**
>> The CI pipeline is completely decorative if I don't put constraints on the merging condition. I learned to configure GitHub Repository settings to physically disable the "Merge" button unless the `security_scan` and build checks pass.
>
>> Moreover, in a class about software engineering, I have learnt to make the merge only available if others have reviewed and approved the pull request

> **Secret Scanning (Shift-Left):** Integrating TruffleHog into the pipeline ensures that if a developer accidentally commits an AWS key or MongoDB URI, the build fails instantly, preventing a catastrophic security breach.

# Changing strategy

This section include major changes I have made timewise to the pipeline and the reason behind.

> The first version of the pipeline did not have the CI process because I wanted to fire up and move fast.
>
> K8s manifest files lied inside the same repository as the source code so that using Github env variable was enough.
>
> I was not using ArgoCD at that time so the strategy was to `ssh` into the VM and run `kubectl apply`/`kubectl set image` manually.
>
> *$\rightarrow$ The drawbacks of this set up is the lack of CI/test, GitOps practice and difficulty in checking the log if anything goes wrong.*

> The next version is when I apply ArgoCD into the cluster so I have to split the k8s manifest files into a sub-repository for ArgoCD to work, which is a GitOps implementation.
>
> Since I have ArgoCD to deploy for me, I move from using `ssh` to apply manifest file to using `yq` to make changes to the `yaml` files.
> 
> I also move build backend docker image so that I have total control of my project.
>
> *$\rightarrow$ The drawbacks of this set up is still the lack of CI/test.*

> The next change is properly to add CI pipeline.
>
> The CI pipeline includes a TruffleHog secret scanning, an ESLint scanning for NodeJS and a `cargo test/cargo clippy/cargo fmt` for Rust backend.
>
> The CI pipeline is run whenever there is a push to the dev branch and a pull request to main
>
> In addition to the CI pipeline, I also set up a branch protection rule which prevent merging pull request until CI pipeline run successfully.