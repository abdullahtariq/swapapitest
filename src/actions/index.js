import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  searchPlanet : (planetName) => {
    let url = 'https://swapi.co/api/planets?search=';
    fetch(`${url}${planetName}`,{
      'Method' : 'Get',
      'headers':{
        'content-type':'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('Response of api : ',response);
      AppDispatcher.dispatch({
        actionType : 'SEARCH_PLANET',
        payload : response
      });
    })
    .catch(err => {
      console.log(err)
    })
  },

  getUsers : () => {
    let url = "https://swapi.co/api/people/";
    fetch(url,{
      'Method':'Get',
      'headers' : {
        'content-type' : 'application/json'
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.results);
      AppDispatcher.dispatch({
        actionType : 'AUTH',
        payload : response.results
      })
    })
    .catch(err => {
      console.log(err);
    })
  },

  setIsLukeSkyWalker : (status) => {
    AppDispatcher.dispatch({
      actionType : 'IS_LUKE',
      payload : status
    })
  }

}
