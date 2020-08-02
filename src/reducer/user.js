// init state for user reducer
const user = {
    isLogIn: false,
    username: null,
    id: null,
}

const userReducer = (state = user, action) => {

    const { userInfo } = action

    switch(action.type) {
        case 'GOOGLE_LOGIN':
            console.log()
            return {
                isLogIn: true,
                username: userInfo.name,
                id: userInfo.googleId,
                avatar: userInfo.imageUrl
            }
        case 'FACEBOOK_LOGIN':
            return {
                isLogIn: true,
                username: userInfo.name,
                id: userInfo.id
            }
        case 'LOGOUT':
            return user
        default:
            return state
    }
}

export default userReducer