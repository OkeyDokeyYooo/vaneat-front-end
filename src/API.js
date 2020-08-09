const baseURL = "http://localhost:8080/api"

module.exports = {
    signup: baseURL + '/user/register',
    login: baseURL + '/user/login',
    allRestaurant: baseURL + '/restaurants/',
    detailRestaurant: baseURL + '/restaurants/',
    allCategory: baseURL + '/category',
    categoryRestaurant: baseURL + '/category/',
    searchResult: baseURL + '/restaurantsName',
    userReviews: baseURL + '/user/reviews',
    userFavorite: baseURL + '/user/favorites',
    userCheck: baseURL + '/user/check',
    addFavorite: baseURL + '/user/userFavorite',
    removeFavorite: baseURL + '/user/userUnfavorite'
}