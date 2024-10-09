import React, { useState }  from 'react';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import ApiService from "../services/Service";

const DetailArticle = () => {
    const params= useParams();
    const [article, setArticle] = useState({});
    const [articleContent, setArticleContent] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    React.useEffect(() => {
        ApiService.getDetailArticle(params.id)
        .then(function (response) {
          const content = response.data.data;
          setArticle(content)
          setArticleContent(content.content)
        });

        ApiService.getAllCategories()
        .then(function (response) {
            const categories = response.data.data;
            setAllCategories(categories);
        });
      }, [])

      return (
        <div>
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='article-content lg:w-3/4'>
                    <h1>{article.title}</h1>
                    <small className='text-xs text-[#6B22C9]'>{new Date(article.created_at).toLocaleDateString('id-ID')}</small>
                    {parse(articleContent)}
                </div>
                <div className='sidebar lg:w-1/4'>
                    
                </div>
            </div>
        </div>
      );
};
  
export default DetailArticle;