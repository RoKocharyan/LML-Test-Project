

import React, { Component } from 'react';
export class Admin extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            unis : [],
            students :[],
            uniName: '',
            uniAddress: '',
            studentName: '',
            studentEmail: '',
            universityId : ''
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.submitUni = this.submitUni.bind(this)
        this.submitStudent = this.submitStudent.bind(this)
        
        
    }

    componentDidMount() {
        this.fetchData();
        
    }

    componentDidUpdate(prevProps, prevState) {
  
    }

    async onSubmit(e) {
        e.preventDefault();
        let res = false;
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.uniName,
                address: this.state.uniAddress
            })
        };
        const response = await fetch('api/Admin/unis', requestOptions)
            .then(response => response.json()).then((data) => res = data);


        if (!res) {
            
        }
        else {
            this.setState({ uniName: '' });
            this.setState({ uniAddress: '' });
        }
    }

    async submitStudent(e) {
        e.preventDefault();
        let res = false;
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.studentName,
                email: this.state.studentEmail,
                universityId: this.state.universityId
            })
        }
        debugger
        const response = await fetch('api/Student/AddStudent', requestOptions)
            .then(response => response.json()).then((data) => res = data);
        this.fetchData();
    }

    async submitUni(e) {
        e.preventDefault();
        let res = false;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.uniName,
                address: this.state.uniAddress
            })
        }
        const response = fetch('api/Admin/unis', requestOptions)
            .then(response => response.json()).then((data) => res = data);


        if (!res) {

        }
        else {
            this.setState({ uniName: '' });
            this.setState({ uniAddress: '' });
        }
        this.fetchData();
        
    }

    async fetchData() {
        fetch('api/Admin/unis')
            .then(response => { return response.json(); })
            .then((data) => {
                this.setState({
                    unis: data
                });
            })
        fetch('api/Admin/sudents')
            .then(response => { return response.json(); })
            .then((data) => { this.setState({students : data}); })
        
    }

    handleInputChange = (e) => {
        
        const { value, name} = e.target;
        this.setState({
            [name]: value
        });
        
    }

    async delete(id, tableName) {
        let res = false;

        const response = await fetch(`api/Admin/${tableName}/${id}`, { method: 'DELETE' })
            

        this.setState({ update: !this.state.update });
        if (response.ok) {
            this.setState({
                [tableName]: this.state[tableName].filter((o) => o.id !== id)
            })
        }
    }

    renderTable(data, tableName) {
        if (data.length < 1) {
            return <h1>empty table</h1>
        }
        const keys = Object.keys(data[0]);

        return (
            <table >
                <thead>
                    <tr>
                        {keys.map((key) => (
                            <th key={key}>{key}</th> 
                            
                        ))}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {keys.map((key) => (
                                <td key={key}>{item[key]}</td>
                            ))}
                            <td><button>edit</button></td>
                            <td><button onClick={() => this.delete(item.id, tableName)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return (

            <div>
                <h1 className="welcome">Admin Panel</h1>
                <h1>Universities</h1>
                <form onSubmit={this.submitUni}>
                    <div className="col-sm-12 txt-ctr">
                        <h3> Add University</h3>
                        <label className="mb-1">
                            <h6 className="mb-0 text-sm">University Name:</h6>
                        </label>
                        <input type="text" autoComplete="true" name="uniName" placeholder="Name" value={this.state.uniName} onChange={this.handleInputChange}></input>
                        <label className="mb-2">
                            <h6 className="mb-0 text-sm">University Address:</h6>
                        </label>
                        <input type="text" autoComplete="true" name="uniAddress" placeholder="Address" value={this.state.uniAddress} onChange={this.handleInputChange}></input>
                        <input type="submit" value="Submit" />
                    </div>

                </form>
                <h3>University List</h3>
                {this.state.unis && this.renderTable(this.state.unis, 'unis')}
                <br />
                <form onSubmit={this.submitStudent}>
                    <h3> Add Student</h3>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 txt-ctr">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Student Name:</h6>
                                </label>
                                <input type="text" autoComplete="true" name="studentName" placeholder="Name" value={this.state.studentName} onChange={this.handleInputChange}></input>
                                
                                <label className="mb-2">
                                    <h6 className="mb-0 text-sm">Student Email:</h6>
                                </label>
                                <input type="text" autoComplete="true" name="studentEmail" placeholder="example@email.com" value={this.state.studentEmail} onChange={this.handleInputChange}></input>
                                
                                <label className="mb-2">
                                    <h6 className="mb-0 text-sm">University</h6>
                                </label>
                                <select name="universityId" onChange={this.handleInputChange} defaultValue={this.state.unis[0]}>
                                    <option value={"placeholder"}>Select University</option>
                                    {this.state.unis && this.state.unis.map((uni) => (<option value={uni.id}>{uni.name}</option>))}
                                </select>
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
                </form>
                <h3>Students</h3>
                {this.state.students && this.renderTable(this.state.students, 'students')}
            </div>

        );
    }
}
