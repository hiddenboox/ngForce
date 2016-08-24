import angular from "angular";

import contacts from "./contacts.component";
import contact from "./contact.component";
import service from "./service";

export default angular.module('app.containers.contacts', [])
    .component(contacts.name, contacts.config)
    .component(contact.name, contact.config)
    .factory('ContactService', service)
    .name;