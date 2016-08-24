import angular from "angular";

import followButtonContainer from "./follow-button";
import selectUserContainer from "./select-user";
import emptyListContainer from "./empty-list";
import createTask from "./create-task";
import authorize from "./authorize";
import taskPage from "./tasks-page";
import editTask from "./edit-task";
import contacts from "./contacts";
import notifier from "./notifier";
import storage from "./storage";
import welcome from "./welcome";
import header from "./header";
import home from "./home";
import app from "./app";

export default angular.module('app.containers', [
    followButtonContainer,
    selectUserContainer,
    emptyListContainer,
    createTask,
    authorize,
    contacts,
    notifier,
    taskPage,
    editTask,
    storage,
    welcome,
    header,
    home,
    app,
]).name;