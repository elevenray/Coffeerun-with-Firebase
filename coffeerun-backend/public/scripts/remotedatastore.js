(function(window) {
  'use strict';
  var App = window.App || {};

  var CHECKLIST_SELECTOR = "[data-coffee-order='checklist']";
  var CheckList = App.CheckList;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var myid;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
      return;
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.getAll = function() {
    RemoteDataStore.prototype.getAll = function(cb) {
      $.get(this.serverUrl, function(serverResponse) {
        console.log(serverResponse);
        serverResponse.forEach(function(object) {
          checkList.addRow(object);
        });
      });
    };
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    var getUrl = this.serverUrl;
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      serverResponse.forEach(function(object) {
        console.log("ID is " + object.id);
        $.ajax(getUrl + '/' + object.id, {
          type: 'DELETE'
        });
      });
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
