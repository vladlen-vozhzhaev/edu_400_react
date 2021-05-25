import React from "react";

export class Post extends React.Component{
    constructor() {
        super();
        this.state = {
            content: ""
        }
    }
    componentDidMount() {
        const id = window.location.pathname.split("/")[2];
        const formData = new FormData();
        formData.append('id',id);
        fetch('http://400.vozhzhaev.ru/getPostById',{
            method: "POST",
            cors: "no-cors",
            body: formData
        }).then(response=>response.json())
            .then(result=>{
                this.setState({
                    content: result.content
                })
            });
    }

    render() {
        return (
            <article>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto"
                             dangerouslySetInnerHTML={{__html:this.state.content}}>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
