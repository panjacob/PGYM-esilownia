import jwt


def jitsi_token_encode(private_key, payload):
    return jwt.encode(payload, private_key, algorithm="RS256")


def jitsi_token_decode(public_key, token):
    return jwt.decode(token, public_key, algorithms=["RS256"])
