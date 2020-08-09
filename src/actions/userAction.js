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
    console.log(userInfo)
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

export const addFavorite = (favoriteId) => {
    return {
        type: 'ADD_FAVORITE',
        favoriteId: favoriteId
    }
}

export const removeFavorite = (favoriteId) => {
    return {
        type: 'REMOVE_FAVORITE',
        favoriteId: favoriteId
    }
}