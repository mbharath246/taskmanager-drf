# Task Manager Project Using Django Rest Framework and Deployed in Render.

## Introduction

This repository contains a Django project configured for deployment on Render. It includes functionality for managing tasks and users with a RESTful API. This guide covers how to deploy the project on Render and how to ensure static files and superusers are correctly set up.

**deployed url** ```https://taskmanager-drf.onrender.com/swagger/```

## Features

- **Django REST Framework Integration**: RESTful API endpoints for managing tasks and users.
- **Static Files Handling**: Proper configuration for serving static files using Whitenoise.
- **Custom Superuser Creation**: Automated superuser creation during deployment.
- **Swagger Documentation**: API documentation available via Swagger.

## Prerequisites

- Python 3.8+
- Django 5.0.7+
- Django-Rest_framework 3.15.2
- whitenoise 6.7.0
- gunicorn 22.0.0
- Git

## Usage

### Setting Up Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mbharath246/taskmanager-drf.git
   cd taskmanager-drf
   ```
2. **Create and activate a virtual environment:**
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```
3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    Optional: ( install docker : https://docs.docker.com/engine/install/ubuntu/)
    ```
4. **Set up for the project:**
    ```bash
    Windows: python manage.py runserver
    
    Docker : docker compose up
    ```
5. **Run the development server:**

    ```bash
    http://127.0.0.1:8000/swagger
    ```
6. **Additional Steps**
    - Create User
    - User Login to get Token
    - Authorize Token
    - Now you can use all apis.

# Sample Image

![image](https://github.com/user-attachments/assets/3a8aeb1b-46d1-4373-aefc-55dbce2dea5c)

