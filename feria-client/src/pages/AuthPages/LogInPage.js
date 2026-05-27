// LogInPage.js
// Logic + algorithm only (no React UI).
// Purpose: describes the login flow that the UI would execute.

import { loginUser } from '../../services/UserService';

/**
 * Algorithm (flow):
 * 1) Read email and password from caller inputs
 * 2) Call backend login service
 * 3) On success:
 *    - store token, firstName, type in localStorage
 *    - return navigation target and state for the UI/router
 * 4) On failure:
 *    - return an error message
 */

export async function loginFlow({ email, password }) {
  try {
    const { data } = await loginUser({ email, password });

    localStorage.setItem('token', data.token);
    localStorage.setItem('firstName', data.firstName);  
    localStorage.setItem('type', data.type);

    return {
      ok: true,
      navigateTo: '/dashboard',
      navigateState: { firstName: data.firstName, type: data.type },
    };
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Login failed.';
    return {
      ok: false,
      error: message,
    };
  }
}

/**
 * Flowchart-friendly pseudo steps:
 *
 * START
 *  -> Input email, password
 *  -> Call loginUser(email, password)
 *  -> IF call succeeds THEN
 *        token  = response.token
 *        first  = response.firstName
 *        type   = response.type
 *        localStorage.set(token, first, type)
 *        navigate to '/dashboard' with {firstName: first, type}
 *     ELSE
 *        errorMsg = response.message
 *        show errorMsg
 *     ENDIF
 * END
 */

