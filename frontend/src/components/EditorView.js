import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import '../EditorView.css';

function EditorView() {
  const [articleData, setArticleData] = useState('<p>Replace me with your own text.</p>');

  function saveArticleData(){
    axios.post('http://localhost:4000/saveArticleData', {content: articleData, article_id: 'test_article3'})
    .then(response => response.data)
    .then(data => console.log(data));
  }

  function repopulate(){
    axios.post('http://localhost:4000/getArticleData', {article_id: 'test_article3'})
    .then(response => response.data)
    .then(data => setArticleData(data));
  }

  return (

    <div>
      <div>
                <CKEditor 
                    editor={ ClassicEditor }
                    data={articleData}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        setArticleData(data);
                        console.log(articleData);

                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <button onClick={saveArticleData}>Save Data</button>
                <button onClick={repopulate}>repopulate</button>
            </div>
            <br/><br/><br/>
            <hr/>
            <h1>Preview:</h1>
            <div className="ck-content" dangerouslySetInnerHTML={{__html: articleData}}/>
    </div>
  );
}

export default EditorView;
