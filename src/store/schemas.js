import { Schema, arrayOf } from 'normalizr';

const taskSchema = new Schema('tasks', {
    idAttribute: task => task.id
});

const userSchema = new Schema('users', {
    idAttribute: user => user.id
});

taskSchema.define({
    user: userSchema
});

export default {
    TASK: taskSchema,
    TASK_ARRAY: arrayOf(taskSchema),
    USER: userSchema,
    USER_ARRAY: arrayOf(userSchema),
};