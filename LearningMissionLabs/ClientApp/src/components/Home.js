import React, { Component} from 'react';
export class Home extends Component {

    constructor(props) {
        let unis = [];
        super(props);
        this.state = {
            name: '',
            email: '',
            universityId: '',
            showMessage: false,
            invalidEmail: false,
            data: false
        };
        this.onSubmit = this.onSubmit.bind(this)
        
        this.findUnis();
        
    }


    


    //componentDidMount() {
    //    this.populateWeatherData();
    //}
    async findUnis() {
        fetch('api/University')
            .then(response => { return response.json(); })
            .then((data) => { this.unis = data; this.setState({ data: true }) })
    }

    handleInputChange = (e) => {
        this.setState({ invalidEmail: false })
        const { value, name} = e.target;
        this.setState({
            [name]: value
        });
        
    }
    validation = (email) => {
        let emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(emailValidRegex)) return true;
        return false;
    }

    async onSubmit(e) {
        e.preventDefault();
        let res = false;
        if (!this.validation(this.state.email)) {
            this.setState({ invalidEmail: true });
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                universityId: this.state.universityId
            })
        };
        const response = await fetch('api/Student/AddStudent', requestOptions)
            .then(response => response.json()).then((data) =>res = data);
        

        if (!res) {
            this.setState({ showMessage: true });
        }
        else {
            this.setState({ name: '' });
            this.setState({ email: '' });
        }
    }


  render () {
    return (
        <div>
            <h1 className="welcome">Welcome, Learning Mission Labs!</h1>
            <form onSubmit={this.onSubmit}>
            <div className="container-fluid">
                    {this.state.showMessage && <h2 className="fRed">Add Student Failed</h2>}
                    {this.state.invalidEmail && <h2 className="fRed">Wrong Email format</h2>}
                    <div className="row">                       
                        <div className="col-sm-12 txt-ctr">
                            <label className="mb-1">
                                <h6 className="mb-0 text-sm">Student Name:</h6>
                            </label>
                            <input type="text" autoComplete="true" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange}></input>
                            <br></br>
                            <label className="mb-2">
                                <h6 className="mb-0 text-sm">Student Email:</h6>
                            </label>
                            <input type="text" autoComplete="true" name="email" placeholder="example@email.com" value={this.state.email} onChange={this.handleInputChange}></input>
                            <br></br>
                            <label className="mb-2">
                                <h6 className="mb-0 text-sm">University</h6>
                            </label>
                            <select name="universityId" onChange={this.handleInputChange}>
                                {this.state.data && this.unis.map((uni) => (<option value={uni.id}>{uni.name}</option>))}
                            </select>
                            <br></br>
                            <input type="submit" value="Submit" />
                        </div>
                </div>
            </div>
            </form>
      </div>
    );
  }
}
