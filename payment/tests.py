from django.test import TestCase
from django.urls import resolve
from payment import views


class TestUrls(TestCase):
    def test_urls(self):
        url_mappings = {
            '/payment/offer/all': views.offer_all, 
            '/payment/stripepk': views.stripepk, 
            '/payment/create_checkout_session': views.create_checkout_session, 
            '/payment/stripe_webhook': views.stripe_webhook, 
            '/payment/withdraw/create': views.withdraw_create, 
            '/payment/withdraw/get': views.withdraw_get, 
        }
        for url in url_mappings.keys():
            try:
                resolved_to = resolve(url).func
            except Exception as e:
                self.fail(f"Resolve failed for {url} ({e.__class__.__name__})")
                resolved_to = None
            self.assertEqual(resolved_to, url_mappings[url])

