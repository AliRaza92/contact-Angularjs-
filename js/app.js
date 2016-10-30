var myApp = angular.module('myApp', ['ngRoute'])

//ng-route config
.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'views/default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: 'views/contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/add', {
      templateUrl: 'views/contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: 'views/contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

// controllers
.controller('navCtrl', function ($scope) {
  $scope.nav = {
    navItems: ['home', 'add'],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function ($scope, ContactService){
  $scope.contacts = ContactService.getContacts();

  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $scope.contacts.splice(index, 1);
    $scope.removed = 'Contact successfully removed.';
  };

})

.controller('contactInfoCtrl', function ($scope, $routeParams){
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index];
})

.controller('addContactCtrl', function ($scope, $location) {
  //needed to show the correct button on the contact form
  $scope.path = $location.path();

  $scope.addContact = function () {
    var contact = $scope.currentContact;
    contact.id = $scope.contacts.length;
    $scope.contacts.push(contact);
  };

})

.controller('editContactCtrl', function ($scope, $routeParams){
  $scope.index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[$scope.index];
})

// directives
.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'contact.html'
  }
})

// services
.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function () {
    return contactList;
  }

  // contact list, usually would be a separate database
  var contactList = [
    {id: 0, name: 'Jon Doe', email: 'jondoe@gmail.com', phone: '123-456-7890', url: 'www.google.com', notes: 'This is description'},
    {id: 1, name: 'Jane Doe', email: 'janedoe@gmail.com', phone: '123-456-7890', url: 'www.google.com', notes: 'This is description'},
  ];
  
  return factory;
}]);

