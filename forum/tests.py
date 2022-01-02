from django.test import TestCase
from django.urls import resolve
from forum import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/forum/topic/create': views.topic_create, 
            '/forum/topic/get': views.topic_get, 
            '/forum/topic/all': views.topic_all, 
            '/forum/topic/remove': views.topic_remove, 
            '/forum/post/create': views.post_create, 
            '/forum/post/edit': views.post_edit, 
            '/forum/post/get': views.post_get, 
            '/forum/post/remove': views.post_remove, 
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

