import isEmpty from 'lodash/isEmpty';
import { badData } from 'utils/responseInterceptors';
import { findOneByCriteria } from 'utils/dbUtils';
import db from 'models';

export default {
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithms: ['HS256'] },
    validate: async (decodedToken, request, h) => {
        try {
            const token = request.headers.authorization;
            request.user = decodedToken;

            if (isEmpty(request.user)) throw badData(`Unauthorized user!`);
            if (!request.payload) request.payload = {};
            request.payload.scope = request.user.userType;

            // Check the token is exist in DB or not!
            const dbData = await findOneByCriteria(db.tokens, { token });
            if (isEmpty(dbData) || dbData.userId !== decodedToken.id)
                throw badData(`The Authorization token is not valid!`);

            return {
                isValid: true
            };
        } catch (e) {
            throw badData(e.message);
        }
    }
};
