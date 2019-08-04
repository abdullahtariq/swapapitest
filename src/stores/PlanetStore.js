import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

let _planet = {};


function setPlanet(planet){
  _planet = planet;
}


class PlanetStoreClass extends EventEmitter {
  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback);
  }

  getPlanet(){
    return _planet;
  }


}

const PlanetStore = new PlanetStoreClass();

PlanetStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType){
    case 'SEARCH_PLANET':
      var items = []
      _.map(action.payload.results, (item) => { items.push(item) })
      items.sort((a,b) => {
      if (parseInt(a.population) < parseInt(b.population)) { return 1;}
      if (parseInt(a.population) > parseInt(b.population)) { return -1; }
      return 0;
      })
      setPlanet(items);
      PlanetStore.emitChange();
    break;

    default:
  }

})

export default PlanetStore;
