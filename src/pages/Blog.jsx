import React from "react";
import {Link} from "react-router-dom";

function PostPreview(props){
    const parser = new DOMParser();
    const subtitle = parser.parseFromString(props.content, "text/html");
    return (
        <div className="post-preview">
            <Link to={"post/"+props.id}>
                <h2 className="post-title">{props.title}</h2>
                <h3 className="post-subtitle">
                    {subtitle.body.innerText.substr(0,100)+"..."}
                </h3>
            </Link>
            <p className="post-meta">
                Posted by {props.author} on {props.add_date}
            </p>
        </div>
    )
}

export class Blog extends React.Component{
    constructor() {
        super();
        this.state = {
            postPreview: []
        }
        console.log("ЗАПУЩЕН МЕТОД constructor()")
    }

    componentDidMount() {
        console.log("ЗАПУЩЕН МЕТОД componentDidMount()")
        fetch("http://400.vozhzhaev.ru/getPosts")
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    postPreview: result.map((post,index)=>{
                        return <PostPreview
                            key={index}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                            add_date={post.add_date}/>
                    })
                })
            });
    }

    render() {
        console.log("ЗАПУЩЕН МЕТОД render()")
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        {this.state.postPreview}
                        <div className="clearfix"><a className="btn btn-primary float-right" href="#!">Older Posts →</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
