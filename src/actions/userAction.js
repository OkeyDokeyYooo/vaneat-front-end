export const googleLogin = (userInfo) => {
    return {
        type: 'GOOGLE_LOGIN',
        user: userInfo
    }
}

export const facebookLogin = (userInfo) => {
    return {
        type: 'FACEBOOK_LOGIN',
        user: userInfo
    }
}

