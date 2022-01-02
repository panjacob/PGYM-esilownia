from django.test import TestCase
from django.urls import resolve
from diet import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/diet/create': views.diet_group_create, 
            '/diet/edit': views.diet_group_edit, 
            '/diet/get': views.diet_group_get, 
            '/diet/all': views.diet_group_all, 
            '/diet/remove': views.diet_group_remove, 
            '/diet/participant/join': views.diet_group_join, 
            '/diet/participant/remove': views.diet_group_participant_remove, 
            '/diet/type/get': views.diet_group_type_get, 
            '/diet/type/all': views.diet_group_type_all, 
            '/diet/file/add': views.diet_group_file_add, 
            '/diet/file/remove': views.diet_group_file_remove, 
            '/diet/image/add': views.diet_image_add, 
            '/diet/image/remove': views.diet_image_remove, 
            '/diet/meeting/add': views.diet_meeting_add, 
            '/diet/meeting/remove': views.diet_meeting_remove, 
            '/diet/meeting/get': views.diet_meeting_get, 
            '/diet/jitsi/join': views.diet_jitsi_join, 
            '/diet/jitsi/leave': views.diet_jitsi_leave, 
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

