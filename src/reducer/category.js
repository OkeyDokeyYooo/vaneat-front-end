const category = {
    name: 'all'
}

const categoryReducer = (state = category, action) => {

    switch(action.type) {
        case 'CHANGE_CATEGORY':
            return {
                name: action.category
            }
        default:
            return state
    }
}

export default categoryReducer