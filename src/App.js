import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import logo from './laneLogo.png';
import './styles/App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      file:null,
      imagePreview:null,
      opacity: false,
      rotate:false,
      scale: false,
      translate: false
    }
    this.uploadFile = this.uploadFile.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.onTranslate = this.onTranslate.bind(this);
    this.onRotate = this.onRotate.bind(this);
    this.onOpacity = this.onOpacity.bind(this);
    this.onScale = this.onScale.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onReset(){
    this.setState({
      opacity: false,
      rotate:false,
      scale: false,
      translate: false
    })
  }
  onScale(){
    this.setState({
      scale:!this.state.scale
    })
  }
  onOpacity(){
    this.setState({
      opacity:!this.state.opacity
    })
  }
  onRotate(){
    this.setState({
      rotate:!this.state.rotate
    })
  }
  onTranslate(){
    this.setState({
      translate: !this.state.translate
    })
  }
  uploadFile(e){
    e.preventDefault();
    console.log('uploading' + this.state.file)
  }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  render() {

  const divStyle = {
    color: 'grey',
    opacity:1,
    "transition":"all 1s ease",
    transform:'',
  };

  if(this.state.rotate){
    divStyle.transform = divStyle.transform +" rotate(45deg) "
  }if(this.state.opacity){
    divStyle.opacity = 0.5;
  }if(this.state.translate){
    divStyle.transform = divStyle.transform +" translateX(-40px) "
  }if(this.state.scale){
    divStyle.transform = divStyle.transform +" scale(0.5,0.5) "
  }

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ikram's Project 1</h2>
        </div>
        <div className="row">
          <div className="previewComponent col-lg-6" >
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
            </form>
              <div style={divStyle} className="imgPreview ">
                {$imagePreview}
              </div>
          </div>
          <div className="button-container col-lg-4">
            <div className="available-action action">
              <h4>Available Actions</h4>
              <ul>
                <li>
                  <button type="button" onClick={this.onOpacity} className={"btn btn-primary btn-lg " + (this.state.opacity ? 'hidden': '')}>Opacity</button>
                </li>
                <li>           
                  <button type="button" onClick={this.onScale} className={"btn btn-primary btn-lg " + (this.state.scale ? 'hidden': '')}>Scale</button>
                </li>
                <li>
                  <button type="button" onClick={this.onRotate} className={"btn btn-primary btn-lg " + (this.state.rotate ? 'hidden': '')}>Rotate</button>
                </li>
                <li>
                  <button type="button" onClick={this.onTranslate} className={"btn btn-primary btn-lg " + (this.state.translate ? 'hidden': '')}>Translate</button>
                </li>
              </ul>
            </div>
            <div className="applied-action action">
              <h4>Applied Actions</h4>
              <ul>
                <li>
                  <button type="button" onClick={this.onOpacity} className={"btn btn-danger btn-lg " + (this.state.opacity ? '': 'hidden')}>Opacity</button>
                </li>
                <li>           
                  <button type="button" onClick={this.onScale} className={"btn btn-danger btn-lg " + (this.state.scale ? '': 'hidden')}>Scale</button>
                </li>
                <li>
                  <button type="button" onClick={this.onRotate} className={"btn btn-danger btn-lg " + (this.state.rotate ? '': 'hidden')}>Rotate</button>
                </li>
                <li>
                  <button type="button" onClick={this.onTranslate} className={"btn btn-danger btn-lg " + (this.state.translate ? '': 'hidden')}>Translate</button>
                </li>
              </ul>
            </div>
            <div className="reset-container">
              <button type="button" onClick={this.onReset} className="btn btn-success btn-lg btn-block">Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
