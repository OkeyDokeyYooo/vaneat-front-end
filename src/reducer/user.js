// init state for user reducer
const user = {
    isLogIn: false,
    username: null,
    id: null,
    token: null,
    favorites: [],
    reviews: [],
}

const userReducer = (state = user, action) => {

    const { userInfo } = action

    switch(action.type) {
        case 'ADD_FAVORITE':
            let array = state.favorites
            array.push(action.favoriteId)
            return {
                ...state,
                favorites: array
            }
        case 'REMOVE_FAVORITE':
            const index = state.favorites.indexOf(action.favoriteId)
            if (index > -1) {
                state.favorites.splice(index, 1)
            }
            return {
                ...state
            }
        case 'GOOGLE_LOGIN':
            return {
                isLogIn: true,
                username: userInfo.username,
                id: userInfo.userId,
                token: userInfo.token,
                favorites: userInfo.favorites,
                reviews: userInfo.reviews
            }
        case 'FACEBOOK_LOGIN':
            return {
                isLogIn: true,
                username: userInfo.username,
                id: userInfo.userId,
                token: userInfo.token,
                favorites: userInfo.favorites,
                reviews: userInfo.reviews
            }
        case 'EMAIL_LOGIN':
            return {
                isLogIn: true,
                username: userInfo.username,
                id: userInfo.userId,
                token: userInfo.token,
                favorites: userInfo.favorites,
                reviews: userInfo.reviews
            }
        case 'LOGOUT':
            return user
        default:
            return state
    }
}

export default userReducer