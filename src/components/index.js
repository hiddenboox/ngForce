import angular from "angular";

import followButton from "./follow-button";
import selectUser from "./select-user";
import emptyList from "./empty-list";
import tasks from "./tasks";
import task from "./task";

export default angular.module('app.components', [
    followButton,
    selectUser,
    emptyList,
    tasks,
    task,
]).name;