# E-siłownia

(description of our project...)

## Getting started:

Create virtual environment:
```python -m venv venv```

-Windows:

Activate venv in /esilownia/venv/Scripts:
```./activate```

-Linux:

Activate virtual environment in /esilownia:
```source venv/bin/activate```

Install requirements.txt:
```python -m pip install -r requirements.txt```

Make migrations:<br />
```python manage.py makemigrations```<br />
```python manage.py makemigrations users```<br />
```python manage.py makemigrations training```<br />
```python manage.py makemigrations dashboard```<br />
```python manage.py makemigrations moderator```<br />

Migrate:
```python manage.py migrate```

## Create superuser:

Create Superuser:
```python manage.py createsuperuser```

## Start backend:

-Windows:

Activate venv in /esilownia/venv/Scripts:
```./activate```

-Linux:

Activate virtual environment in /esilownia:
```source venv/bin/activate```

and in venv:
```python3 manage.py runserver```

## Start frontend:

Install node packages in /esilownia/frontend/esilownia:
```npm install```

Start react-app in /esilownia/frontend/esilownia:
```npm start```

## Updating

Update requirements.txt:
```python -m pip freeze > requirements.txt```

### Notes

Generate tokens for all users
```for user in User.objects.all(): Token.objects.get_or_create(user=user)```
