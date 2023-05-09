export default {
  meEndpoint: 'http://127.0.0.1:8000/api/token/verify/',
 // loginEndpoint: '/jwt/login',
  loginEndpoint: "http://127.0.0.1:8000/api/token/",
  getPhoto: "http://127.0.0.1:8000/api/token/photo",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'access',
  onTokenExpiration: 'refresh', // logout | refreshToken
  tokenPrefix: "Doxer "

}

//loginEndpoint: "http://localhost:8000/api/token/",