const baseURL = "http://localhost:8080/api"

module.exports = {
    signup: baseURL + '/user/register',
    login: baseURL + '/user/login',
    allRestaurant: baseURL + '/restaurants/',
    detailRestaurant: baseURL + '/restaurants/',
    userFavorite: baseURL + '/user/favorites/',
    allCategory: baseURL + '/category',
    categoryRestaurant: baseURL + '/category/'
}