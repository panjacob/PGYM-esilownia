from django.test import TestCase
from django.urls import resolve
from moderator import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/moderator/application/send': views.application_send, 
            '/moderator/application/get': views.application_get, 
            '/moderator/application/all': views.application_all, 
            '/moderator/application/accept': views.application_accept, 
            '/moderator/application/reject': views.application_reject, 
            '/moderator/report/create': views.report_create, 
            '/moderator/report/get': views.report_get, 
            '/moderator/report/all': views.report_all, 
            '/moderator/report/edit': views.report_edit, 
            '/moderator/user_ban': views.user_ban, 
            '/moderator/user_unban': views.user_unban, 
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

