import { userLogin, updateUserData } from "./actions";

export default ['$http', 'force', 'requestService', ($http, force, requestService) => {
    function login(params) {
        return (dispatch, getState) => {
            dispatch(userLogin());

            if(params && params.access_token) {
                requestService.init({
                    instanceURL: params.instance_url,
                    accessToken: params.access_token,
                    tokenType: params.token_type,
                });
                force.init({
                    accessToken: params.access_token,
                    instanceURL: params.instance_url,
                });

                return Promise.resolve(params);
            } else {
                return force.loginWithBrowser()
                    .then(() => force.getOAuthResult())
                    .then(authInfo => {
                        dispatch(updateUserData(authInfo));

                        return getState().user;
                    });
            }
        };
    }

    function getUserById(id, fields = ['name']) {
        return (dispatch, getState) => {
            return force.retrieve('User', id, fields)
                .then(user => dispatch(updateUserData(user)))
                .then(() => getState().user);
        }
    }

    return {
        getUserById,
        login,
    };
}];
