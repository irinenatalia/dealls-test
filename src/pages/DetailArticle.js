import React, { useState }  from 'react';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import { FacebookShare,LinkedinShare,WhatsappShare } from 'react-share-kit';
import ApiService from "../services/Service";
import { Link } from 'react-router-dom';

const DetailArticle = () => {
    const params = useParams();
    const shareUrl = window.location.href;
    const [article, setArticle] = useState({});
    const [articleContent, setArticleContent] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [copyCategories, setCopyCategories] = useState([]);

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

      React.useEffect(() => {
        allCategories.map((el, i) => {
          ApiService.getAllArticles({page:1, limit:3, category_id:el.id})
          .then(function (response) {
            const articles = response.data.data;
  
            const copyCategories = [...allCategories];
            copyCategories[i].articles = articles.data; 
            setCopyCategories(copyCategories);
          }) 
        });
      }, [allCategories])

      return (
        <div>
            <div className='flex flex-col lg:flex-row gap-[60px]'>
                <div className='article-content lg:w-3/4'>
                    <h1>{article.title}</h1>
                    <div className='flex items-center'>
                        <span className='text-xs text-[#6B22C9]'>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                        &nbsp;|&nbsp;
                        <div className='text-xs text-[#6B22C9] flex items-center'>
                            Share on 
                            <div className='inline-flex gap-1 ml-2'>
                                <FacebookShare url={shareUrl} quote={article.title} round="true" size="30px" />
                                <LinkedinShare url={shareUrl} round="true" size="30px" />
                                <WhatsappShare
                                    url={shareUrl}
                                    title={article.title}
                                    separator=":: "
                                    round="true"
                                    size="30px"
                                    />
                            </div>
                        </div>
                    </div>
                    {parse(articleContent)}
                </div>
                <div className='sidebar lg:w-1/4'>
                    <div className='text-slate-600'>Read other articles</div>
                {
                  allCategories.map((cat, catIndex) => catIndex < 3 && (
                    <div className='category-thumb'>
                      <div className='category-title font-bold'>
                          {cat.name}
                      </div>
                      <ul className='sidebar-ul'>
                        {
                        cat.articles?.map(el => (
                          <li><Link to={`/article/${el.id}/${el.slug}/`}>{el.title}</Link></li>
                        ))
                        }
                      </ul>
                    </div>
                  ))
                  }
                </div>
            </div>
        </div>
      );
};
  
export default DetailArticle;