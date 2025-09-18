MERN CRUD Project with DevOps Pipeline
📌 Overview

This project is a MERN (MongoDB, Express.js, React, Node.js) CRUD application integrated with a complete DevOps pipeline.

The pipeline covers:

CI/CD using GitHub Actions

Dockerization & Image Push to DockerHub

Infrastructure provisioning with Terraform (AWS EKS, VPC, networking, IAM)

Kubernetes manifests (inside k8s/ folder)

GitOps deployment using ArgoCD

🏗️ Project Architecture
 ┌──────────────────┐       ┌─────────────────────────┐
 │   GitHub Repo    │       │     GitHub Actions      │
 │ (MERN + IaC)     │──────▶│ CI/CD + Terraform +     │
 └──────────────────┘       │ Docker Build & Push     │
                            └──────────┬─────────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │   DockerHub Images  │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │ AWS EKS Cluster     │
                            │ (Provisioned by     │
                            │ Terraform)          │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │ Kubernetes Manifests │
                            │ (k8s/ folder)       │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │   ArgoCD            │
                            │ GitOps Auto Deploy  │
                            └─────────────────────┘

🚀 Features

Full MERN CRUD functionality

Dockerized application

Automated CI/CD via GitHub Actions

Terraform IaC for AWS EKS + VPC setup

Kubernetes manifests for deployment, service, configmaps

GitOps with ArgoCD for continuous delivery

⚙️ Technologies Used

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Containerization: Docker

CI/CD: GitHub Actions

Infrastructure as Code: Terraform

Orchestration: Kubernetes (EKS)

GitOps: ArgoCD

Cloud: AWS

📂 Project Structure
├── API/           
├── Client/          
├── k8s/               
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yaml
│   ├── mongo-deployment.yaml
│   └── ingress-controller.yml
├── terraform/        
├── .github/workflows/ 
│   ├── main.yml
├── docker-compose.yml # Local testing
└── README.md

🔄 CI/CD Workflow
1. GitHub Actions - CI/CD

On push/merge to main:

Run tests

Build Docker images for frontend, backend

Push images to DockerHub

2. ArgoCD (GitOps)

ArgoCD watches this repository (k8s/ folder)

Any change in Kubernetes manifests → Auto deployment to EKS

🔧 Setup Instructions
1️⃣ Clone the repo
git clone https://github.com/your-username/mern-crud-devops.git
cd mern-crud-devops

2️⃣ Local development (optional)
docker-compose up --build

3️⃣ Deploy Infra with Terraform
cd terraform
terraform init
terraform plan
terraform apply -auto-approve

4️⃣ Deploy to Kubernetes manually (if needed)
kubectl apply -f k8s/

5️⃣ Configure ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


Login to ArgoCD UI and connect this GitHub repo for GitOps.

🔑 Secrets Required

In GitHub Actions → Settings → Secrets and Variables → Actions:

DOCKERHUB_USERNAME

DOCKERHUB_TOKEN

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY
