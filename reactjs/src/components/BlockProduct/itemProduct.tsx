import React, { useEffect, useRef, useState } from 'react';
// import icHeart from '../../images/icons/ic-heart.svg';
import Picture from '../Picture';
// import { isMobile } from '../../DetectScreen';
import { useHistory } from 'react-router-dom';
import { getDiscountedPrice, moneyFormater } from '../../redux/Helpers';
import { isDesktop } from 'react-device-detect';
import { find } from 'lodash';
import { PERFUME_TYPE_MAP, PERFUME_TYPE_TAGS } from '../../config';
import { Link } from 'react-router-dom';

const itemProduct = ({
  isInHomePage = false,
  productItem,
  handleModalProduct,
}: {
  isInHomePage?: boolean;
  productItem: any;
  handleModalProduct: any;
}) => {
  const itemProductRef = useRef<any>(null);
  const [image, setImage] = useState<any>({});
  const [video, setVideo] = useState<any>({});
  const keyEndpoint = productItem?.value ? productItem?.value : productItem;
  // const handleCheckoutProduct = (e: any) => {
  //   e.stopPropagation();
  //   const variant = keyEndpoint?.product_variants[0] || {};
  //   const data = {
  //     // variant_id: 39482168017060,
  //     variant_id: variant?.variant_id ?? '',
  //     quantity: 1,
  //   };
  //   const index = state?.lineItems.findIndex(function (e: any) {
  //     return e.variant_id == data.variant_id;
  //   });
  //   const copyArr = [...state?.lineItems];

  //   if (index != -1) {
  //     const newData = {
  //       variant_id: data.variant_id,
  //       quantity: state?.lineItems[index].quantity + data.quantity,
  //     };
  //     copyArr[index] = newData;
  //   } else {
  //     copyArr.push(data);
  //   }

  //   addProductToCart({
  //     ...keyEndpoint,
  //     variant_id: variant.variant_id,
  //     price: variant?.price,
  //     title: variant?.title,
  //     quantity: 1,
  //   });

  //   dispatch(action.checkoutProduct(copyArr));

  //   dispatch(actionHome.toggleShoppingbag(true));
  // };
  const history = useHistory();

  const directDetailProduct = (handle: any, brandName: any) => {
    history.push('/brand/' + brandName + '/' + handle);
  };

  const generateLink = (handle: any, brandName: any) => {
    return '/brand/' + brandName + '/' + handle;
  };

  const getLowestProductPrice = (variants: { price: string }[]): string => {
    const sort = variants.sort(function (a, b) {
      return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
    });
    return sort[0].price.toString();
  };

  const getPerfumeType = (tags: string[]): string => {
    for (let i = 0; i < tags.length; i++) {
      if (PERFUME_TYPE_TAGS.includes(tags[i].toLowerCase()))
        return PERFUME_TYPE_MAP[tags[i].toLowerCase()];
    }
    return '';
  };

  useEffect(() => {
    if (itemProductRef && itemProductRef.current) {
      const width = itemProductRef.current.clientHeight;
      const height = itemProductRef.current.clientHeight;
      setImage({
        ...keyEndpoint.images[0]?.url,
        width: width,
        height: height,
      });
    }
  }, [keyEndpoint, itemProductRef]);

  useEffect(() => {
    if (keyEndpoint?.product_videos) {
      const videoFirst = find(keyEndpoint.product_videos, (i: any) => i.position == 1);
      setVideo(videoFirst);
    }
  }, [keyEndpoint]);

  const willShowDiscount = (): boolean => {
    let show =
      keyEndpoint?.discount &&
      keyEndpoint?.discount?.value &&
      keyEndpoint?.discount?.show_on_detail_page;

    if (isInHomePage) show = show * keyEndpoint?.discount?.show_on_homepage;

    return show;
  };

  return (
    <>
      {keyEndpoint ? (
        <div
          className="product-item-box"
          onClick={() => {
            directDetailProduct(keyEndpoint.handle, keyEndpoint?.brand_page?.page_ptr?.handle);
          }}
        >
          <div className="favorite-box">
            <div></div>
            {willShowDiscount() ? (
              <span
                className="sale-inf"
                style={{
                  visibility: keyEndpoint?.discount?.show_on_detail_page
                    ? 'visible'
                    : 'hidden',
                }}
              >
                {keyEndpoint?.discount?.value > 0 ? `-${keyEndpoint?.discount?.value}%` : ''}
              </span>
            ) : (
              ''
            )}
            {/* {keyEndpoint.fixed_rebate ? (
          <span
            className="sale-inf"
            style={{ visibility: keyEndpoint.fixed_rebate > 0 ? 'visible' : 'hidden' }}
          >
            {keyEndpoint.fixed_rebate > 0 ? `-${keyEndpoint.fixed_rebate}%` : ''}
          </span>
        ) : (
          ''
        )} */}
          </div>
          <div className="img-box">
            <Link
              to={generateLink(keyEndpoint.handle, keyEndpoint?.brand_page?.page_ptr?.handle)}
            >
              <div className="img-video-product" ref={itemProductRef}>
                {video ? (
                  <video
                    poster={video?.preview_image}
                    width={'100%'}
                    height={'100%'}
                    autoPlay
                    muted
                    loop
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ) : (
                  <Picture data={image} />
                )}
              </div>
            </Link>
            <button
              className="btn-quick-view"
              onClick={(e: any) => {
                e.stopPropagation();
                handleModalProduct(keyEndpoint);
              }}
            >
              QUICK VIEW
            </button>
          </div>
          <div className="info">
            <p className="title-item">{keyEndpoint.brand?.name}</p>
            <div className="title-info">
              <p>{keyEndpoint?.name}</p>
              <p className="type">
                {keyEndpoint?.tags?.length ? getPerfumeType(keyEndpoint?.tags) : ''}
              </p>
            </div>
          </div>
          <div className="bot">
            {keyEndpoint?.product_variants?.length > 1 ? (
              <span>
                <span className={productItem.sale ? 'sale-price' : ''}>
                  From &nbsp;
                  {keyEndpoint?.product_variants && keyEndpoint?.product_variants[0]?.price ? (
                    <span className={`price ${willShowDiscount() ? 'strike-through' : ''}`}>
                      {`${moneyFormater(
                        getLowestProductPrice(keyEndpoint?.product_variants),
                      )}`}
                    </span>
                  ) : null}
                  {/* {moneyFormater(keyEndpoint?.product_variants[0].price)} -{' '}
              {moneyFormater(
                keyEndpoint?.product_variants[keyEndpoint?.product_variants.length - 1].price,
              )} */}
                </span>
                &nbsp;
                {willShowDiscount() ? (
                  <span style={{ marginLeft: '1rem' }} className="discount-price">
                    {getDiscountedPrice(
                      getLowestProductPrice(keyEndpoint?.product_variants),
                      keyEndpoint?.discount?.value,
                      true,
                    )}
                  </span>
                ) : null}
              </span>
            ) : (
              <span>
                <span className={productItem.sale ? 'sale-price' : ''}>
                  {keyEndpoint?.product_variants && keyEndpoint?.product_variants[0]?.price ? (
                    <span className={`price ${willShowDiscount() ? 'strike-through' : ''}`}>
                      {moneyFormater(keyEndpoint?.product_variants[0].price)}
                    </span>
                  ) : null}
                </span>
                &nbsp;
                {willShowDiscount() ? (
                  <span style={{ marginLeft: '1rem' }} className="discount-price">
                    {getDiscountedPrice(
                      getLowestProductPrice(keyEndpoint?.product_variants),
                      keyEndpoint?.discount?.value,
                      true,
                    )}
                  </span>
                ) : null}
                {/* {keyEndpoint?.product_variants[0].title &&
            !isMobile &&
            keyEndpoint.product_variants[0].title != 'Default Title' ? (
              <span style={{ fontSize: '14px' }}>
                / {keyEndpoint.product_variants[0].title}
              </span>
            ) : (
              ''
            )} */}
              </span>
            )}

            {!isDesktop ? (
              <button
                className="btn-add"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleModalProduct(keyEndpoint);
                }}
              >
                QUICK VIEW
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

// itemProduct.propTypes = {
//   productItem: PropTypes.object.isRequired,
// };

export default itemProduct;
