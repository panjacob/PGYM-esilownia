import os
import shutil
import sys

from manage import main


def manage_py(command):
    command_arr = command.split(' ')
    # print(command_arr)
    sys.argv = ['.\\manage.py'] + command_arr
    main()
    sys.argv = []


def remove(path):
    print(f"removing: {path}")
    if os.path.exists(path):
        shutil.rmtree(path, ignore_errors=True)
    else:
        print(f"path: {path} doesnt exist. It's OK")


if __name__ == '__main__':
    apps = ['dashboard', 'moderator', 'users', 'training']
    remove('db.sqlite3')
    remove('__pycache__')
    remove("core/__pycache__")
    for app in apps:
        remove(f"{app}/migrations")
        remove(f"{app}/__pycache__")

    manage_py('makemigrations')
    for app in apps:
        manage_py(f"makemigrations {app}")

    manage_py('migrate')
    manage_py('runserver')
