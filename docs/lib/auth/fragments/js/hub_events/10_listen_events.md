```javascript
import { Hub, Logger } from 'aws-amplify';

const logger = new Logger('My-Logger');

const listener = (data) => {
    switch (data.payload.event) {
        case 'signIn':
            logger.info('user signed in');
            break;
        case 'signIn_failure':
            logger.error('user sign in failed');
            break;
        case 'signUp':
            logger.info('user signed up');
            break;
        case 'signUp_failure':
            logger.info('user failed to signup');
            break;
        case 'confirmSignUp':
            logger.info('user is confirmed');
            break;
        case 'confirmSignUp_failure':
            logger.info('user confirmation failed');
            break;
        case 'signOut':
            logger.info('user signed out');
            break;
        case 'tokenRefresh':
            logger.info('token refresh succeeded');
            break;
        case 'tokenRefresh_failure':
            logger.error('token refresh failed');
            break;
        case 'configured':
            logger.info('the Auth module is configured');
    }
}

Hub.listen('auth', listener);
```
