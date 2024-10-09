import React, { useState } from 'react';
import ApiService from "../services/Service";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [copyCategories, setCopyCategories] = useState([]);

    var sliderStyles = {
      dots: true,
      infinite: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const queryParams = {
        page: 1,
        limit: 5
      };

    React.useEffect(() => {
      ApiService.getAllArticles(queryParams)
      .then(function (response) {
        const articles = response.data.data;
        setAllArticles(articles.data);
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
            <div className='flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]'>
                <div className='featured-articles lg:w-3/4'>
                    <Slider {...sliderStyles}>
                      {
                      allArticles.map(article => (
                        <div className='article-container' style={Object.assign({}, sliderStyles.slide)}>
                          {article.title}
                          <Link to={`/article/${article.id}/${article.slug}/`}>
                            <div className='article-read'>Read &#10132;</div>
                          </Link>
                        </div>
                      ))
                      }
                    </Slider>
                    <div className='mt-[40px]'>
                      <Link to="/articles" className='underline font-bold'>Read All Articles Here</Link>
                    </div>
                </div>
                <div className='sidebar lg:w-1/4'>
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
  
export default Home;