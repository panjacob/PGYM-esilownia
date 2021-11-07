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


def remove_path(path):
    print(f"removing: {path}")
    if os.path.exists(path):
        shutil.rmtree(path, ignore_errors=True)
    else:
        print(f"path: {path} doesnt exist. It's OK")


def remove_file(path):
    if os.path.exists(path):
        os.remove(path)
    else:
        print(f"{path} doesnt exist")


if __name__ == '__main__':
    apps = ['dashboard', 'moderator', 'users', 'training']
    remove_file('db.sqlite3')
    remove_path('__pycache__')
    remove_path("core/__pycache__")
    for app in apps:
        remove_path(f"{app}/migrations")
        remove_path(f"{app}/__pycache__")

    manage_py('makemigrations')
    for app in apps:
        manage_py(f"makemigrations {app}")

    manage_py('migrate')
    # manage_py('runserver')
