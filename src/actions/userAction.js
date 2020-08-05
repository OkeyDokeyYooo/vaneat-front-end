export const googleLogin = (userInfo) => {
    return {
        type: 'GOOGLE_LOGIN',
        userInfo: userInfo
    }
}

export const facebookLogin = (userInfo) => {
    return {
        type: 'FACEBOOK_LOGIN',
        userInfo: userInfo
    }
}

export const emailLogin = (userInfo) => {
    return {
        type: 'EMAIL_LOGIN',
        userInfo: userInfo
    }
}

export const userLogout = () => {
    return {
        type: 'LOGOUT'
    }
}

