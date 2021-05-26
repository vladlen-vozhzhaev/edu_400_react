import React, {createRef, useRef} from "react";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';

export class AddPost extends React.Component{
    constructor() {
        super();
        this.sunEditorRef = createRef();
        this.state = {
            title: "",
            content:"",
            author: ""
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    getSunEditorInstance = (sunEditor) => {
        this.sunEditorRef.current = sunEditor;
    };

    handlerChange(event){
        const name = event.target.name;
        const value= event.target.value;
        this.setState({
            [name]: value
        })
    }

    handlerSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.sunEditorRef.current.getContents());
        formData.append('author',this.state.author);
        fetch('http://400.vozhzhaev.ru/addPost',{
            method: "POST",
            cors: "no-cors",
            body: formData
        }).then(response=>response.json())
            .then(result=>{
                if(result.result === 'success'){
                    window.location.href = '/';
                }else {
                    alert("Неизвестная ошибка");
                }
            });
    }

    render() {
        return (
            <div className="container my-3">
                <div className="col-md-8 mx-auto">
                    <form onSubmit={this.handlerSubmit}>
                        <div className="mb-3">
                            <input onChange={this.handlerChange} name="title" value={this.state.title} type="text" className="form-control" placeholder="Заголовок"/>
                        </div>
                        <div className="mb-3">
                            <SunEditor
                                getSunEditorInstance={this.getSunEditorInstance}
                                ref={this.sunEditorRef}
                                height="400px"
                                setOptions = {{
                                    buttonList: [
                                        ['undo', 'redo',
                                            'font', 'fontSize', 'formatBlock',
                                            'paragraphStyle', 'blockquote',
                                            'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
                                            'fontColor', 'hiliteColor', 'textStyle',
                                            'removeFormat',
                                            'outdent', 'indent',
                                            'align', 'horizontalRule', 'list', 'lineHeight',
                                            'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                                            /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                                            'fullScreen', 'showBlocks', 'codeView']
                                    ],
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input onChange={this.handlerChange} name="author" value={this.state.author} type="text" className="form-control" placeholder="Автор"/>
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
