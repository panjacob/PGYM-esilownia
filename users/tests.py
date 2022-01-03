from django.test import TestCase
from django.urls import resolve, reverse
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate
from users import views, models
import json


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/users/test/': views.test_connection,
            '/users/info/': views.user_info, #
            '/users/register/': views.user_register, #
            '/users/edit/': views.user_edit, #
            '/users/get/': views.user_get,
            '/users/get_moderator/': views.user_get_moderator,
            '/users/change_password/': views.user_change_password, #
            '/users/set_moderator/': views.user_set_moderator, #
            '/users/set_coach/': views.user_set_coach, #
            '/users/set_dietician/': views.user_set_dietician, #
            '/users/photo/add': views.user_photo_add,
            '/users/photo/remove': views.user_photo_remove,
            '/users/password_reset_request/': views.password_reset_request, #
            '/users/password_reset/': views.password_reset, #
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])


class TestUsers(TestCase):
    def setUp(self):
        self.c = APIClient()
        self.f = APIRequestFactory()

    def test_register(self):
        register_url = reverse('register')
        # valid
        response = self.c.post(register_url, {
            'email': 'trener1@mail.com',
            'username': 'trener1',
            'password': 'debildebi',
            'first_name': 'Trener',
            'last_name': 'Man',
        })
        self.assertEqual(response.status_code, 200)
        try:
            user = models.UserExtended.objects.get(email='trener1@mail.com')
        except models.UserExtended.DoesNotExist:
            self.fail('/users/register returned 200 but did not create user')

        # email is taken
        response = self.c.post(register_url, {
            'email': 'trener1@mail.com',
            'username': 'trener2',
            'password': 'debildebi',
            'first_name': 'Trener',
            'last_name': 'Man',
        })
        self.assertEqual(response.status_code, 400)

        # username is taken
        response = self.c.post(register_url, {
            'email': 'trener2@mail.com',
            'username': 'trener1',
            'password': 'debildebi',
            'first_name': 'Trener',
            'last_name': 'Man',
        })
        self.assertEqual(response.status_code, 400)

        # empty username
        response = self.c.post(register_url, {
            'email': 'trener2@mail.com',
            'username': '',
            'password': 'debildebi',
            'first_name': 'Trener',
            'last_name': 'Man',
        })
        self.assertEqual(response.status_code, 400)

        # # weak password # TODO ?
        # response = self.c.post(register_url, {
        #     'email': 'trener2@mail.com',
        #     'username': 'trener2',
        #     'password': 'a',
        #     'first_name': 'Trener',
        #     'last_name': 'Man',
        # })
        # self.assertEqual(response.status_code, 400)

    def test_user_info(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            password='debildebi',
            first_name='Trener',
            last_name='Man',
        )
        request = self.f.post('/users/test/')
        force_authenticate(request, user)
        response = views.user_info(request)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['email'], 'trener1@mail.com')

    def test_user_edit(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            first_name='Trener',
            last_name='Man',
        )
        self.assertEqual(user.first_name, 'Trener')

        # valid
        request = self.f.post('/users/edit/', {
            'email': 'trener1@mail.com',
            'username': 'trener1',
            'first_name': 'Sneed',
        })
        force_authenticate(request, user)
        response = views.user_edit(request)
        self.assertEqual(response.status_code, 200)
        user.refresh_from_db()
        self.assertEqual(user.first_name, 'Sneed')
        self.assertEqual(user.last_name, 'Man')
        
        # missing email
        request = self.f.post('/users/edit/', {
            'username': 'trener1',
            'first_name': 'Chuck',
        })
        force_authenticate(request, user)
        response = views.user_edit(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Missing email and/or username in data')
        user.refresh_from_db()
        self.assertEqual(user.first_name, 'Sneed')

        # missing username
        request = self.f.post('/users/edit/', {
            'email': 'trener1@mail.com',
            'first_name': 'Chuck',
        })
        force_authenticate(request, user)
        response = views.user_edit(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Missing email and/or username in data')
        user.refresh_from_db()
        self.assertEqual(user.first_name, 'Sneed')

        # missing email and username
        request = self.f.post('/users/edit/', {
            'first_name': 'Chuck',
        })
        force_authenticate(request, user)
        response = views.user_edit(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Missing email and/or username in data')
        user.refresh_from_db()
        self.assertEqual(user.first_name, 'Sneed')

    def test_change_password(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            first_name='Trener',
            last_name='Man',
        )
        user.set_password('debildebi')
        user.save()
        self.assertTrue(user.check_password('debildebi'))

        # valid
        request = self.f.post('/users/change_password/', {
            'old_password': 'debildebi',
            'new_password': 'debildebi2',
        })
        force_authenticate(request, user)
        response = views.user_change_password(request)
        self.assertEqual(response.status_code, 200)
        user.refresh_from_db()
        self.assertTrue(user.check_password('debildebi2'))

        # incorrect old password
        request = self.f.post('/users/change_password/', {
            'old_password': 'aaauuuuuuuu',
            'new_password': 'debildebi3',
        })
        force_authenticate(request, user)
        response = views.user_change_password(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Old password is incorrect')
        user.refresh_from_db()
        self.assertTrue(user.check_password('debildebi2'))

    def test_set_moderator(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            first_name='Trener',
            last_name='Man',
        )
        superuser = models.UserExtended.objects.create(
            email='admin1@mail.com',
            username='admin1',
            first_name='Admin',
            last_name='Mann',
            is_superuser=True
        )
        self.assertEqual(user.is_moderator, False)

        # not a superuser
        request = self.f.post('/users/set_moderator/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, user)
        response = views.user_set_moderator(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Moderator is required')
        self.assertEqual(user.is_moderator, False)

        # valid
        request = self.f.post('/users/set_moderator/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, superuser)
        response = views.user_set_moderator(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'OK')
        user.refresh_from_db()
        self.assertEqual(user.is_moderator, True)

    def test_set_coach_and_dietician(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            first_name='Trener',
            last_name='Man',
        )
        janny = models.UserExtended.objects.create(
            email='janny1@mail.com',
            username='janny1',
            first_name='Janitor',
            last_name='Man',
            is_moderator=True
        )
        self.assertEqual(user.is_coach, False)
        self.assertEqual(user.is_dietician, False)

        # not a moderator
        request = self.f.post('/users/set_coach/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, user)
        response = views.user_set_coach(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Moderator is required')
        self.assertEqual(user.is_coach, False)
        request = self.f.post('/users/set_dietician/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, user)
        response = views.user_set_dietician(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Moderator is required')
        self.assertEqual(user.is_dietician, False)

        # valid
        request = self.f.post('/users/set_coach/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, janny)
        response = views.user_set_coach(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'OK')
        user.refresh_from_db()
        self.assertEqual(user.is_coach, True)
        request = self.f.post('/users/set_dietician/', {
            'id': user.id,
            'value': True,
        })
        force_authenticate(request, janny)
        response = views.user_set_dietician(request)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'OK')
        user.refresh_from_db()
        self.assertEqual(user.is_dietician, True)

    def test_password_reset(self):
        user = models.UserExtended.objects.create(
            email='trener1@mail.com',
            username='trener1',
            first_name='Trener',
            last_name='Man',
        )
        user.set_password('debildebi')
        user.save()
        self.assertTrue(user.check_password('debildebi'))
        self.assertEqual(user.password_reset_token, None)

        # user doesn't exist
        request = self.f.post('/users/password_reset_request/', {
            'email': 'who1@mail.com'
        })
        response = views.password_reset_request(request)
        self.assertEqual(response.status_code, 200)

        # valid
        request = self.f.post('/users/password_reset_request/', {
            'email': 'trener1@mail.com'
        })
        response = views.password_reset_request(request)
        self.assertEqual(response.status_code, 200)
        user.refresh_from_db()
        self.assertNotEqual(user.password_reset_token, None)

        # invalid token
        request = self.f.post('/users/password_reset/', {
            'token': user.password_reset_token + 'asdf',
            'password': 'debildebi2',
        })
        response = views.password_reset(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'Invalid token')
        user.refresh_from_db()
        self.assertTrue(user.check_password('debildebi'))

        # valid
        request = self.f.post('/users/password_reset/', {
            'token': user.password_reset_token,
            'password': 'debildebi2',
        })
        response = views.password_reset(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.rendered_content)['message'], 'OK')
        user.refresh_from_db()
        self.assertTrue(user.check_password('debildebi2'))

