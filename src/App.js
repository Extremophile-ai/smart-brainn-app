import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/SignIn/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';



const particlesOption= {
  particles: {
    number: {
      value: 100,
      density :{
        enable:true,
        value_area:800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box:{},
  route: 'Signin', 
  isSignedIn: false,
  user:{
    id: "",
    name: '',
    email: '',
    entries: 0,
    joined:''
  } 
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    }
  

  loadUser=(data) =>{
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined:data.joined
      }
    })
  }

  calculateFaceLocation =(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image  = document.getElementById('inputImage');
    const width  = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row  * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box) =>{
    console.log(box)
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit=() =>{
    this.setState({imageUrl: this.state.input});
    fetch('https://boiling-cove-87058.herokuapp.com/imageUrl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })  
          })
          .then(response => response.json())
          .then(response => {
              if(response) {
                fetch('https://boiling-cove-87058.herokuapp.com/entries', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log);
        }    
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))    
    }

    onRouteChange =(route) => {
      if( route === 'signout'){
        this.setState(initialState)
      } else if(route === 'home'){
        this.setState({isSignedIn:true})
      }
      this.setState({route: route})
    }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOption} />
        <Navigation isSignedIn={isSignedIn} onRouteChange ={this.onRouteChange } />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl} /> 
            </div>
        :(
          route === 'Signin'
            ? <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         )          
        }     
      </div>
    );
  }
}

export default App;
