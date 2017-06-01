require('normalize.css/normalize.css');
require('styles/App.css');
var api_key = require('../../api_key.js');

import React from 'react';
import fetch from 'isomorphic-fetch';


class AppComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      summonerName: '',
      id:'',
      name:'',
      profileIconId:'',
      revisionDate:'',
      summonerLevel:'',
      profileIconURL:'http://avatar.leagueoflegends.com/na/.png'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleChange(event) {
    this.setState({summonerName: event.target.value});
  }

  handleSubmit(event) {

    const _this = this
    var cors_api_url = 'https://cors-anywhere.herokuapp.com/'
    var summoner_api_url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + this.state.summonerName.replace(/ /g,'') + '?api_key=' + api_key.key
    var myInit = { method: 'GET'};

    this.setState({profileIconURL: 'http://avatar.leagueoflegends.com/na/'+ this.state.summonerName.replace(/ /g,'') +'.png'})

    //fetch 'summoner' api data
    fetch(cors_api_url+summoner_api_url, myInit)
      .then(res => res.json())
      .then(function(json){
        console.log(json)
        _this.setState({id: json[_this.state.summonerName.replace(/ /g,'').toLowerCase()].id})
        _this.setState({name: json[_this.state.summonerName.replace(/ /g,'').toLowerCase()].name})
        _this.setState({profileIconId: json[_this.state.summonerName.replace(/ /g,'').toLowerCase()].profileIconId})
        _this.setState({revisionDate: json[_this.state.summonerName.replace(/ /g,'').toLowerCase()].revisionDate})
        _this.setState({summonerLevel: json[_this.state.summonerName.replace(/ /g,'').toLowerCase()].summonerLevel})
      })


    event.preventDefault();
  }

  render() {
    return (
      <div className="index">
        <img src={this.state.profileIconURL} alt={this.state.name} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Summoner:
            <input type="text" value ={this.state.summonerName} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="summonerInfo">
          <div>Summoner ID = {this.state.id}</div>
          <div>Summoner Name = {this.state.name}</div>
          <div>Summoner Profile Icon ID = {this.state.profileIconId}</div>
          <div>Summoner Revision Date = {this.state.revisionDate}</div>
          <div>Summoner Level = {this.state.summonerLevel}</div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
