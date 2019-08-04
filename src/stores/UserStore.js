import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _users = null;
let _isLukeSkyWalker = false;
let _loggedIn = false;

function setUsers(users){
  _users = users;
}

function isLuke(status){
  _isLukeSkyWalker = status;
}

function setLoggedIn(status){
  _loggedIn = status;
}

class UserStoreClass extends EventEmitter {
  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  }

  getUsers(){
    return _users;
  }

  isLukeSkyWalker(){
    return _isLukeSkyWalker;
  }

  isLoggedIn(){
    return _loggedIn
  }
}

const UserStore = new UserStoreClass();


UserStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType){
    case 'AUTH':
      setUsers(action.payload);
      UserStore.emitChange();
    break;

    case 'IS_LUKE':
      isLuke(action.payload);
      setLoggedIn(true);
      UserStore.emitChange();
    break;


    default:
  }

})

export default UserStore;
