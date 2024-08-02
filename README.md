# Task Manager Project Using Django Rest Framework, Javascript and Deployed in Render.

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

### Setting Up Locally Backend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mbharath246/taskmanager-drf.git
   cd taskmanager-drf
   cd backend
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

# Backend Image

![image](https://github.com/user-attachments/assets/3a8aeb1b-46d1-4373-aefc-55dbce2dea5c)


# Frontend Images

1. Login
![image](https://github.com/user-attachments/assets/ddac0b28-3a23-41f3-af08-50d891049851)

2. Dashboard
![image](https://github.com/user-attachments/assets/c2855e92-1116-475b-86bd-1de2a9338c80)

3. Responsive side nav bar and Add Task
![image](https://github.com/user-attachments/assets/39dc11e4-a91b-4126-b4d5-2989d56bb528)

4. Contact us 
![image](https://github.com/user-attachments/assets/3b0945dd-2577-45a0-ad7c-44d64c8c7f08)

5. Search filed
![image](https://github.com/user-attachments/assets/33ec71ab-90cf-4dc3-b31a-762020c67192)

6. Filter Options
![image](https://github.com/user-attachments/assets/240ffb43-95e3-4bf1-89aa-a04e664e7dfd)

7. Edit Task
![image](https://github.com/user-attachments/assets/653ae13d-6dbb-446c-8221-5a19abcc84dc)

8. Delete Task 
![image](https://github.com/user-attachments/assets/f9680ba7-8e52-4e63-8743-e1595c2651ce)
