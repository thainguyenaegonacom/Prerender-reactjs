import { isEmpty, get, map, slice } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import * as action from '../../redux/blogs/actions';
import ItemArticle from '../../components/BlockBlogs/ItemArticle';
import Loader from '../../components/Loader';
import { fetchCMSHomepage } from '../../redux/Helpers';
import '../../components/BlockBlogs/block-blogs.scss';
import './styles.scss';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet-async';

function BlogTagsListPage(props: any) {
  const dispatch = useDispatch();
  const [dataNav, setDataNav] = useState<any>([]);
  const [dataFooter, setDataFooter] = useState<any>([]);
  const [loading, setLoading] = useState<any>([]);
  const [visible, setVisible] = useState<any>(6);
  const state = useSelector((state: RootStateOrAny) => state.blogsReducer);

  const loadMore = () => {
    setVisible((prev: any) => {
      return prev + 3;
    });
  };

  const fetchDataInit = async () => {
    const cat = props.match.params.tag ? props.match.params.tag : undefined;
    if (isEmpty(dataNav) || cat || isEmpty(dataFooter)) {
      // this.props.loadingPage(true);
      dispatch(action.getBlogsListFilterTag(props?.match?.params?.tag));
      const pending = [fetchCMSHomepage(176)];
      try {
        const results = await Promise.all(pending);
        const cmsData = results[0];
        const dataDynamicLinks = get(cmsData, 'dynamic_links');

        setDataNav(dataDynamicLinks?.navigation);
        setDataFooter(dataDynamicLinks?.footer);
        setLoading(false);
      } catch (error) {
        // toastrError(error.message);
        // this.props.loadingPage(false);
      }
    }
  };
  // const tag = useParams();

  useEffect(() => {
    fetchDataInit();

    return function cleanup() {
      fetchDataInit();
    };
  }, [props.match.params.tag]);
  const { blogsList } = state;
  return (
    <div className="site-blogspage">
      {loading ? <Loader /> : ''}
      <Helmet>
        <meta property="og:title" content="Blog tags page | Sundora" />
        <meta property="og:description" content="Blog tags page | Sundora" />
        <title>Blog page | Sundora</title>
        <meta name="description" content="Blog tags page | Sundora" />
      </Helmet>
      {/* <Banner /> */}
      <div className="container">
        <section className="blk-blog-list">
          <div className="container">
            <div className="title-blog-page">
              <h2>Articles tagged with </h2>
              <h3>‘{props?.match?.params?.tag}’</h3>
            </div>
            {blogsList ? (
              <>
                <div className="row list-article">
                  {map(slice(blogsList, 0, visible), (item: any, index: any) => {
                    return (
                      <div
                        className="col-12 col-md-4"
                        key={index}
                        style={{ marginBottom: '2em' }}
                      >
                        <div className="animated faster fadeIn">
                          <ItemArticle articleItem={item} key={index} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {visible < blogsList.length && (
                  <button onClick={loadMore} type="button" className="load-more">
                    Load more
                  </button>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </section>
      </div>
      <Footer data={dataFooter} />
    </div>
  );
}

export default memo(BlogTagsListPage);
