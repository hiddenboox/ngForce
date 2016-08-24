import config from './config';

export function configureForceConnection() {
    return ['force', force => {
        force.init({
            appId: config.appId,
            oauthCallbackURL: config.oauthCallbackURL
        });
    }];
}