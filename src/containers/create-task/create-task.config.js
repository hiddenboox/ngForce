export default ['$stateProvider', $stateProvider => {
    $stateProvider.state({
        name: 'taskPage.create',
        url: '/create',
        component: 'createTaskDialog'
    });
}];