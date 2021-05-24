import { tokens } from 'models';

const attributes = ['id', 'token', 'user_id', 'type'];

export const findOneToken = async tokenId =>
    tokens.findOne({
        attributes,
        where: {
            id: tokenId
        },
        underscoredAll: false
    });

export const insertToken = async tokenData =>
    tokens.create(tokenData).then(d => d.toJSON());

export const findOneByCriteria = async criteria =>
    tokens.findOne({
        attributes,
        where: criteria,
        underscoredAll: false
    });
