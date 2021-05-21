export default {
    keys: 'some_shared_secret',
    verify: {
        aud: 'urn:audience:test',
        iss: 'urn:issuer:test',
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 14400, // 4 hours
        timeSkewSec: 15
    },
    validate: (artifacts, request, h) => ({
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user }
    })
};
