This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## For DevOps with Docker and Kubernetes

- Firstly, build the docker image.
    - Optionally, run `docker build .` and `docker tag old-image-name new-image-name` if you want to run the images comfortably in local with a short name before tag the image with the dockerhub username.
```
docker build -t docker-username/image-name .
```
- Next, we push the image to the docker hub. Leave the tag part empty for for the `latest` tag.
```
docker push docker-username/image-name:tag
```
- For kubernetes, create the kubectl service. This service only need to create once. For later changes, only deployment need to be reapplied.
- Then, create the kubernetes deployment for the docker image above. Remember to change the version of the deployment in the yaml file.
- Finally, create the ingress service for nginx to tunnel the port to a dns domain.
```
minikube start
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
kubectl apply -f ingress.yaml
```
- After we built a new docker image, we need to set the deployment to the new image by using `kubectl set image -f deployment-yaml-file container-name:new-image-name:tag`
    - The `container-name` can be retrieved from the deployment file.
    - The new image's tag must be different from the old image's tag, otherwise, this will not work dynamically.
    - We can replace the `-f deployment-yaml-file` part with the `deployment/deployment-name` which is displayed when running `kubectl get deployments`
- Check deployment and service using `kubectl get pods` and `kubectl get svc p-service`
```
kubectl get pods
kubectl get svc p-service
kubectl get ingress
```

