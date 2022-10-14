import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ProductSlide from '../ProductSlide';
import { map } from 'lodash';

function SubNavigation({
  isOpen = null,
  title = '',
  dataChild = [],
  dataProduct = null,
  closeSubNav = null,
}: {
  isOpen: any;
  title: any;
  dataChild: any;
  dataProduct: any;
  closeSubNav: any;
}) {
  // const history = useHistory();
  const childRef = useRef<any>(null);
  const [childPage, setChildPage] = useState<any>([]);
  const [positionChild, setPositionChild] = useState<any>(10);
  const [currentParent, setCurrentParent] = useState<any>(null);

  // const handleDirectBrandPage = (related_url: any) => {
  //   history.push('/brand/' + related_url.split('/').slice(-2)[0]);
  //   closeSubNav();
  // };
  // const handleDirectBrandPageFilter = (related_url: any) => {
  //   window.location.replace(`/brand/${related_url.split('/').slice(-2)[0]}`);
  //   closeSubNav();
  // };
  // const handleDirectFilterPage = (id: any) => {
  //   // console.log(id);
  //   window.location.replace(`/fp${id}`);
  //   closeSubNav();
  // };
  // const handleDirectDefaultPage = (id: any) => {
  //   window.location.replace(`/page/${id}`);
  //   closeSubNav();
  // };

  const onHoverParent = (dataChild: any, index: any) => {
    if (dataChild == childPage) {
      setChildPage([]);
      setCurrentParent(null);
    } else {
      setChildPage(dataChild);
      setCurrentParent(dataChild.id);
    }

    // const childPos = childRef.current.offset();
    // const parentPos = childRef.current.parent().offset();
    // const childOffset = {
    //   top: childPos.top - parentPos.top,
    //   left: childPos.left - parentPos.left,
    // };

    // const offsetTop = 0 index * 40; 26
    let offsetTop = 0;
    if (index != 1) {
      if (dataChild?.children.length <= index * 2 - 1) {
        offsetTop = (index - 1) * 32;
      }
    } else {
      offsetTop = 0;
    }
    setPositionChild(() => offsetTop);
  };

  const onMouseLeave = () => {
    setChildPage([]);
    setCurrentParent(null);
  };

  return (
    <ul className={`blk-sub-nav ${isOpen == true ? 'open-menu' : ''}`}>
      <li>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h2>{title}</h2>
              <div
                className="wrapper-sub-menu"
                onMouseLeave={onMouseLeave}
                style={{
                  overflow: 'auto',
                }}
              >
                <ul>
                  {dataChild.map((item: any, index: any) => {
                    return (
                      <li
                        key={index}
                        ref={childRef}
                        onMouseEnter={() => {
                          onHoverParent(item, index + 1);
                        }}
                      >
                        {item.disable_url ? (
                          <p className={`${currentParent == item.id ? 'activeParent' : ''}`}>
                            <span>{item.title} </span>
                            {item?.children.length > 0 || item.type == 'BrandPage' ? (
                              <i className="gg-chevron-right"></i>
                            ) : (
                              ''
                            )}
                          </p>
                        ) : (
                          <a
                            href={`${
                              item?.external_url
                                ? item?.external_url
                                : item?.relative_url
                                ? item?.relative_url
                                : '/'
                            }`}
                            className={`${currentParent == item.id ? 'activeParent' : ''}`}
                          >
                            <span>{item.title} </span>
                            {item?.children.length > 0 || item.type == 'BrandPage' ? (
                              <i className="gg-chevron-right"></i>
                            ) : (
                              ''
                            )}
                          </a>
                        )}
                        {/* <button
                          className={`${currentParent == item.id ? 'activeParent' : ''}`}
                          onClick={() => {
                            item.type == 'BrandPage'
                              ? handleDirectBrandPage(item.relative_url)
                              : item.type == 'FilteredPage'
                              ? handleDirectFilterPage(item?.relative_url)
                              : item.type == 'DefaultPage'
                              ? handleDirectDefaultPage(item?.id)
                              : '';
                          }}
                        >
                          <span>{item.title} </span>
                          {item?.children.length > 0 || item.type == 'BrandPage' ? (
                            <i className="gg-chevron-right"></i>
                          ) : (
                            ''
                          )}
                        </button> */}
                        {/* {item.type == 'BrandPage' ? (
                          <ul className="last-sub">
                            <li>
                              <button
                                onClick={() =>
                                  handleDirectBrandPageFilter(item.relative_url, 3)
                                }
                              >
                                <span>For her</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleDirectBrandPageFilter(item.relative_url, 1)
                                }
                              >
                                <span>For him</span>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handleDirectBrandPageFilter(item.relative_url, 2)
                                }
                              >
                                <span>Unisex</span>
                              </button>
                            </li>
                          </ul>
                        ) : (
                          ''
                        )}
                        {item?.children.length > 0 ? (
                          <ul className="last-sub">
                            {map(item?.children, (itemchild, index) => (
                              <li key={index}>
                                <Link to={itemchild.relative_url}>
                                  <span>{itemchild.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          ''
                        )} */}
                      </li>
                    );
                  })}
                </ul>
                <ul
                  className="last-sub-flex"
                  // style={{
                  //   maxHeight: '340px',
                  //   background: 'red',
                  //   overflow: 'auto',
                  // }}
                >
                  <div
                    style={{
                      marginTop: positionChild,
                      transform:
                        positionChild > 0 && childPage.children
                          ? `translateY(-${(childPage?.children.length * 32) / 2 - 16}px)`
                          : 'unset',
                    }}
                  >
                    {map(
                      childPage?.children,
                      (itemchild, index) =>
                        // <li key={index}>
                        itemchild.type == 'BrandPage' ? (
                          <li key={index}>
                            {/* <button
                              onClick={() =>
                                handleDirectBrandPageFilter(itemchild?.relative_url)
                              }
                            >
                              <span>{itemchild?.title}</span>
                            </button> */}
                            <a
                              href={`${
                                itemchild?.external_url
                                  ? itemchild?.external_url
                                  : itemchild?.relative_url
                                  ? itemchild?.relative_url
                                  : '/'
                              }`}
                            >
                              {itemchild?.title}
                            </a>
                          </li>
                        ) : itemchild.type == 'FilteredPage' ? (
                          <li key={index}>
                            {/* <button
                              onClick={() => handleDirectFilterPage(itemchild?.relative_url)}
                            >
                              <span>{itemchild?.title}</span>
                            </button> */}
                            <a
                              href={`${
                                itemchild?.external_url
                                  ? itemchild?.external_url
                                  : itemchild?.relative_url
                                  ? itemchild?.relative_url
                                  : '/'
                              }`}
                            >
                              {itemchild?.title}
                            </a>
                          </li>
                        ) : (
                          <li key={index}>
                            <a
                              href={`${
                                itemchild?.external_url
                                  ? itemchild?.external_url
                                  : itemchild?.relative_url
                                  ? itemchild?.relative_url
                                  : '/'
                              }`}
                            >
                              <span>{itemchild.title}</span>
                            </a>
                          </li>
                        ),
                      // </li>
                    )}
                  </div>
                </ul>
              </div>
            </div>
            <div className="col-8">
              <h3 className="recommend-text">{dataProduct?.headline}</h3>
              {dataProduct && dataProduct.products && dataProduct.products.length > 0 ? (
                <ProductSlide data={dataProduct.products} col={2} closeSubNav={closeSubNav} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

SubNavigation.propTypes = {
  isOpen: PropTypes.any,
  title: PropTypes.string,
  dataChild: PropTypes.array,
  dataProduct: PropTypes.object,
};

export default memo(SubNavigation);
