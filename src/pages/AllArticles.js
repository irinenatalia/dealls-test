import React, { useState } from 'react';
import ApiService from "../services/Service";
import { Link } from 'react-router-dom';

const AllArticles = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [copyCategories, setCopyCategories] = useState([]);

    React.useEffect(() => {
        ApiService.getAllCategories()
        .then(function (response) {
          const categories = response.data.data;
          setAllCategories(categories);
        });
      }, [])
  
      React.useEffect(() => {
        allCategories.map((el, i) => {
          ApiService.getAllArticles({page:1, limit:9, category_id:el.id})
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
            <h1>All Articles</h1>
            {
                allCategories.map((cat, catIndex) => (
                <div className='category mt-[40px]'>
                    <h2 className='category-title font-bold'>
                        {cat.name}
                    </h2>
                    <div className='grid gap-5 card-grid mt-3'>
                    {
                    cat.articles?.map(el => (
                        <div className='cat-article-card'>
                            <Link reloadDocument to={`/article/${el.id}/${el.slug}/`}>
                                <div className='font-bold'>{el.title}</div>
                                <div className='article-read'>Read &#10132;</div>
                            </Link>
                        </div>
                    ))
                    }
                    </div>
                </div>
                ))
                }
        </div>
      );
};
  
export default AllArticles;