export const FOLLOW_RECORD = 'FOLLOW_RECORD';

export function followRecord(id) {
    return {
        type: FOLLOW_RECORD,
        payload: id
    };
}