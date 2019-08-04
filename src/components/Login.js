import React, { Component } from 'react';
import UserAction from '../actions/index';
import UserStore from '../stores/UserStore';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class Login extends Component {

  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleDob = this.handleDob.bind(this);
  }
  state = {
    username : null,
    dob : null,
    people : [],
    show : false,
    sw_message : "",
    sw_type : "warning"
  };

  componentWillMount(){
    UserStore.addChangeListener(this.callBackHanlder.bind(this))
    UserAction.getUsers();
  }


  callBackHanlder = () => {
    let users = UserStore.getUsers();

    this.setState({
      people : users
    })
  }

handleLogin = () => {
  if (this.state.username && this.state.dob) {
    let index = this.state.people.findIndex(item => item.name == this.state.username)
    if (index > -1) {
      let temp = [...this.state.people];
      if (temp[index].birth_year == this.state.dob) {
        if(this.state.username == "Luke Skywalker"){
          UserAction.setIsLukeSkyWalker(true);

        }else{
          UserAction.setIsLukeSkyWalker(false);
        }
        this.setState({sw_type:"success",sw_message:"Welcome "+this.state.username,show:true })
        this.hideSweetAlert();
      } else {
        this.setState({sw_type:"error",sw_message:"Invalid date of birth",show:true })
        this.hideAlert();
      }
    } else {
      this.setState({sw_type:"error",sw_message:"Character name not found",show:true })
      this.hideAlert();
    }

  } else {
    this.setState({sw_type:"warning",sw_message:"Character name and date of birth are required",show:true })
    this.hideAlert();
  }
}

handleUsername = (event) => {
    this.setState({
      username : event.target.value
    });
}

handleDob = (event) => {
    this.setState({
      dob : event.target.value
    });
}

hideSweetAlert = () => {
  setTimeout(()=>{
     this.setState({
       show:false
     });
     this.props.history.push("/search")
  },1500)
}
hideAlert = () => {
  setTimeout(()=>{
     this.setState({
       show:false
     });
   },1000)
}
componentDidMount(){
   this.username.focus();
}
  render() {
    return (
      <>
        <div className="container-login100">
			<div className="wrap-login100">


				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Choose Your Character
					</span>

					<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input
              ref={(input) => { this.username = input; }}
              type="text" autofocus className="input100" onChange={this.handleUsername} placeholder="Choose your character" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
            <input type="text" className="input100" onChange={this.handleDob}  placeholder="Date of Birth" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div className="container-login100-form-btn">
             <input className="login100-form-btn" type="button" value="Enter" onClick={this.handleLogin} />

					</div>


          <SweetAlert
              show={this.state.show}
              title={this.state.sw_message}
              type={this.state.sw_type}
              onConfirm={() => this.setState({ show: false }) }
              showConfirmButton={false}
            />

				</form>

        <div className="login100-pic js-tilt" data-tilt="">
					<img src="/img/pngkey.com-star-wars-vector-png-4185752.png" alt="IMG" className="stvec" />
				</div>
			</div>
		</div>
      </>
    );
  }
}

export default Login;
