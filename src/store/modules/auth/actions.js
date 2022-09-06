export default {
  async login(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBojpjsXN-qQZoO6pbGwwZI9PtZF3G9p7g', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to Authenticate');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  async signup(context, payload) {
   const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBojpjsXN-qQZoO6pbGwwZI9PtZF3G9p7g', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

   const responseData = await response.json();

   if (!response.ok) {
     throw new Error(responseData.message || 'Failed to Authenticate');
   }

   context.commit('setUser', {
     token: responseData.idToken,
     userId: responseData.localId,
     tokenExpiration: responseData.expiresIn
   });
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  }
};