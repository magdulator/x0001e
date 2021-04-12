export default function getAuthHeader () {
    const user = localStorage.getItem('currentUser');

    if(user && user.token) {
        return {'x-access-token': user.token}
    } else {
        return {'error' : 'no token'}
    }
}