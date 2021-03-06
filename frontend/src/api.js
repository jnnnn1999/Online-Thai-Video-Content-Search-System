const baseURL = "http://127.0.0.1:8000"
const apiURL = `${baseURL}/api`


export const API = {
    auth: {
        login: `${baseURL}/dj-rest-auth/login/`,
        logout: `${baseURL}/dj-rest-auth/logout/`,
        passwordReset: `${baseURL}/dj-rest-auth/password/reset/`,
        passwordResetConfirm: `${baseURL}/dj-rest-auth/password/reset/confirm/`,
        signup: `${baseURL}/dj-rest-auth/registration/`,
        verifyEmail: `${baseURL}/dj-rest-auth/registration/verify-email/`
    },
    files: {
        list: `${apiURL}/files/`,
        create: `${apiURL}/create-files/`,
        retrieve: id => `${apiURL}/files/${id}/`,
        update: id => `${apiURL}/files/${id}/update/`,
        delete: id => `${apiURL}/files/${id}/delete/`,
    }
}

export const searchURL = `${apiURL}/search/custom/`;

