import React, { Component } from 'react';
import PlanetActions from '../actions/index';
import PlanetStore from '../stores/PlanetStore';
import UserStore from '../stores/UserStore';
import '../SearchPlanet.css';
import Spinner from 'react-spinner-material';

class SearchApi extends Component {
  constructor(){
    super();

    this.state = {
      planet : '',
      isLukeSkyWalker : false,
      counter : 0,
      currentTime : 60,
      canSearch : true,
      isSearching: false,
    }

    this.handlePlanetName.bind(this);
  }

  componentWillMount(){
      PlanetStore.addChangeListener(this.handleCallBack.bind(this))
      this.setState({
        isLukeSkyWalker : UserStore.isLukeSkyWalker()
      })
  }

  componentDidMount(){
     this.searchplanetname.focus();
  }

  handleCallBack = () => {
    let planetDetails = PlanetStore.getPlanet();
    console.log(planetDetails);
    console.log('status of user logged in', this.state.isLukeSkyWalker);
    const planetItems = planetDetails.map((planet,index) =>
      <div key={index} className={'planetName size-'+(index+1)}><span className="planet-name">{planet.name}</span><span className="planet-pops">{planet.population}</span></div>
    );
    this.setState({
      planet : planetItems,
      isSearching: false
    })
  }

  handlePlanetName = (event) => {

    if(event.target.value.length > 1){
      let currentSec = new Date().getSeconds();
      if(!this.state.canSearch && !this.state.isLukeSkyWalker){
        alert('You have reached your searching limit with in a minute');
      }else{

        let count = this.state.counter;
        if(count == 0){
            this.handleTimer();
        }
        count++;
        this.setState({
          counter : count,
          isSearching: true
        });
        PlanetActions.searchPlanet(event.target.value);
      }
    }else{
      this.setState({
        planet : '',
        isSearching: false
      })
      return false;
    }

  }

  handleTimer(){

    this.timer = setInterval(() => {
      const newCount = this.state.currentTime - 1;
      this.setState(
        {currentTime: newCount >= 0 ? newCount : 0}
      );
      if(newCount == 0){
        this.setState({
          currentTime : 60,
          canSearch : true,
          counter : 0
        })
      }else if(newCount > 0 && this.state.counter >= 15){
        this.setState({
          canSearch : false
        })
      }
    }, 1000);
  }

  render(){
    return (
      <>
      <div class="container-login100">
        <div class="wrap-login100 searchwrap-login100">
        <h2 class="login100-form-title">Search your planet</h2>
        <div class="wrap-input100 validate-input">
          <div class="input100">
            <input type="text" ref={(input) => { this.searchplanetname = input; }}  onChange={this.handlePlanetName} placeholder="Search Planet Name" />
            <Spinner size={30} spinnerColor={"#ff9800"} spinnerWidth={2} visible={this.state.isSearching} />
          </div>
        </div>
        {/*<br/>
        <span>Total Counter : {this.state.counter}</span>
        <br/>
        <span>Current Time : {this.state.currentTime}</span>*/}

          {
            this.state.planet ?
            <div className="planet-detail-container">
              <p>Planets are sorted according to large number of population</p>
            <div className="planet-list-wrap">
              <div className="planet-headline"><h3>Planet Name</h3><h3>Population</h3></div>
                {this.state.planet}
            </div></div>
            : null
          }


        </div>
        </div>
      </>
    )
  }



}
export default SearchApi;
