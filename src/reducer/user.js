// init state for user reducer
const user = {
    isLogIn: false,
    username: null,
    id: null,
}

const userReducer = (state = user, action) => {

    const { user } = action

    switch(action.type) {
        case 'GOOGLE_LOGIN':
            console.log()
            return {
                isLogIn: true,
                username: user.name,
                id: user.googleId,
                avatar: user.imageUrl
            }
        case 'FACEBOOK_LOGIN':
            return {
                isLogIn: true,
                username: user.name,
                id: user.id
            }
        case 'LOGOUT':
            return user
        default:
            return state
    }
}

export default userReducer