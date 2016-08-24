import merge from "lodash/merge";
import angular from "angular";

const HTTP = new WeakMap();

class RequestService {
    constructor($http) {
        HTTP.set(this, $http);
        this.headers = null;
        this.apiVersion = 'v35.0';
        this.queryPath = (apiVersion = this.apiVersion) => `/services/data/${apiVersion}/query`;
        this.retrievePath = (objectName, id, apiVersion = this.apiVersion) =>
            `/services/data/${apiVersion}/sobjects/${objectName}/${id}`;
        this.postPath = (objectName, apiVersion = this.apiVersion) =>
            `/services/data/${apiVersion}/sobjects/${objectName}`;
        this.chatterPath = (objectName, apiVersion = this.apiVersion) =>
            `/services/data/${apiVersion}/chatter/users/me/${objectName}`;
    }

    post(objectName, data, config = {}) {
        if(typeof(objectName) === 'object') {
            HTTP.get(this)({
                headers: this.headers,
                ...objectName
            });
        }

        if(typeof(objectName) === 'function') {
            const config = objectName.call(this);
            return HTTP.get(this)(merge({}, { headers: this.headers }, {...config}));
        }

        return HTTP.get(this).post(this.postPath(objectName), data, {
            headers: this.headers,
            ...config
        });
    }

    get(query, config = {}) {
        if(typeof(query) === 'object') {
            return HTTP.get(this)({
                headers: this.headers,
                ...query
            });
        }

        return HTTP.get(this).get(this.queryPath(), {
            headers: this.headers,
            params: {
                q: query
            },
            ...config
        });

    }

    put(...args) {
        return HTTP.get(this).put(args);
    }

    init({ accessToken, tokenType, instanceURL }) {
        if(accessToken && tokenType && instanceURL) {
            this.headers = Object.freeze({
                'Authorization': `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Target-URL': instanceURL,
            });
        }
    }

    static factory($http) {
        return new RequestService($http);
    }
}
RequestService.factory.$inject = ['$http'];

export default angular.module('app.services.request', [])
    .service('requestService', RequestService.factory)
    .name;
