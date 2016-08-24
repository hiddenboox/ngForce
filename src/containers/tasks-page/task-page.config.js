export default ['$stateProvider', $stateProvider => {
   $stateProvider.state({
       name: 'taskPage',
       url: '/tasks',
       template: '<task-page layout="column" flex/>'
   })
}];