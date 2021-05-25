import React from 'react';

export class ContactUs extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            msg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log("Сообщение отправлено");
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('msg',this.state.msg);
        fetch('http://400.vozhzhaev.ru/emailSubmit',{
            method: "POST",
            cors: "no-cors",
            body: formData
        }).then(response=>response.json())
            .then(result=>console.log(result))
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center my-2">Форма обратной связи</h1>
                <div className="col-md-5 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <input name="email" value={this.state.email} onChange={this.handleChange} type="text" className="form-control" placeholder="E-mail"/>
                        </div>
                        <div className="mb-3">
                            <input name="name" value={this.state.name} onChange={this.handleChange} type="text" className="form-control" placeholder="Имя"/>
                        </div>
                        <div className="mb-3">
                            <textarea name="msg" value={this.state.msg} onChange={this.handleChange} className="form-control" placeholder="Сообщение"/>
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="form-control btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
