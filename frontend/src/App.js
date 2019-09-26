import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function App() {
  const [articleData, setArticleData] = useState('<p>default</p>');

  function saveArticleData(){
    axios.post('http://localhost:4000/saveArticleData', {content: articleData})
    .then(response => response.data)
    .then(data => console.log(data));
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
            </div>
    </div>
  );
}

export default App;
