from django.test import TestCase
from django.urls import resolve
from dashboard import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/dashboard/user_day/create': views.user_day_create, 
            '/dashboard/user_day/get_all': views.user_day_get_all, 
            '/dashboard/user_day/get': views.user_day_get, 
            '/dashboard/achievment/create': views.achievment_create, 
            '/dashboard/achievment/get': views.achievment_get, 
            '/dashboard/achievment/all': views.achievment_all, 
            '/dashboard/achievment/remove': views.achievment_remove, 
            '/dashboard/achievment/user/add': views.achievment_user_add, 
            '/dashboard/achievment/user/remove': views.achievment_user_remove, 
            '/dashboard/achievment/user/get': views.achievnemt_user_get, 
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

