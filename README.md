# E-siłownia
(description of our project...)

## Getting started:

Create virtual environment: 
```python -m venv venv```

Install requirements.txt: 
```python -m pip install -r requirements.txt```

## Updating
Update requirements.txt:
```python -m pip freeze > requirements.txt```


### Notes
Generate tokens for all users
```for user in User.objects.all(): Token.objects.get_or_create(user=user)```