from django.test import TestCase
from django.urls import resolve
from message import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/message/send': views.message_send, 
            '/message/send_admin': views.message_send_admin, 
            '/message/get': views.message_all, 
            '/message/users': views.message_users, 
            '/message/notification/all': views.notification_all, 
            '/message/notification/seen': views.notification_seen, 
            '/message/notification/send': views.notification_send,
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

