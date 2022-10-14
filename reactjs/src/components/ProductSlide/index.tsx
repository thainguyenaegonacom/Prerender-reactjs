import React, { memo } from 'react';
import Picture from '../Picture';
import { map } from 'lodash';
import { useHistory } from 'react-router-dom';
import { getDiscountedPrice, moneyFormater } from '../../redux/Helpers';
// import { useDispatch } from 'react-redux';
// import * as action from '../../redux/product/actions';
// import { addProductToCart } from '../../utils/helpers/productTracker';
import { PERFUME_TYPE_TAGS, PERFUME_TYPE_MAP } from '../../config';

function ProductSlide(props: any) {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const state = useSelector((state: RootStateOrAny) => state.productReducer);

  const directDetailProduct = (handle: any, brandName: any) => {
    history.push('/brand/' + brandName + '/' + handle);
    props.closeSubNav ? props.closeSubNav() : props.handleCloseShoppingBag();
  };

  // const handleCheckoutProduct = (e: any, item: any) => {
  //   e.stopPropagation();
  //   const variant = item || {};
  //   const data = {
  //     // variant_id: 39482168017060,
  //     variant_id: variant?.variant_id ?? '',
  //     quantity: 1,
  //     applied_discount: variant.applied_discount ?? {},
  //     properties: variant.properties ?? [],
  //   };
  //   const index = state?.lineItems.findIndex(function (e: any) {
  //     return e.variant_id == data.variant_id;
  //   });
  //   const copyArr = [...state?.lineItems];

  //   if (index != -1) {
  //     const newData = {
  //       variant_id: data.variant_id,
  //       quantity: state?.lineItems[index].quantity + data.quantity,
  //       applied_discount: data.applied_discount ?? {},
  //       properties: data.properties ?? [],
  //     };
  //     copyArr[index] = newData;
  //   } else {
  //     copyArr.push(data);
  //   }

  //   addProductToCart({
  //     ...item,
  //     variant_id: variant.variant_id,
  //     price: variant?.price,
  //     title: variant?.title,
  //     quantity: 1,
  //   });

  //   dispatch(action.checkoutProduct(copyArr));

  //   // dispatch(actionHome.toggleShoppingbag(true));
  // };
  const getPerfumeType = (tags: string[]): string => {
    for (let i = 0; i < tags?.length; i++) {
      if (PERFUME_TYPE_TAGS.includes(tags[i].toLowerCase()))
        return PERFUME_TYPE_MAP[tags[i].toLowerCase()];
    }
    return '';
  };

  const getLowestProductPrice = (variants: { price: string }[]): string => {
    const sort = variants.sort(function (a, b) {
      return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
    });
    return sort[0].price.toString();
  };

  const willShowDiscount = (item: any): boolean => {
    const show =
      item?.discount &&
      item?.discount?.value &&
      item?.discount?.show_on_detail_page &&
      item?.discount?.show_on_homepage;
    return show;
  };

  return (
    <section className="blk-product-slide">
      <div className="x-mandatory">
        {map(props.data, (item, index) => {
          const itemKey = item.value || item;
          const imageKey = itemKey.images ? itemKey.images[0]?.url : itemKey?.image?.url;
          return (
            <div className={`col-${props.col}`} key={index}>
              <div className="wrapper">
                {willShowDiscount(item) ? (
                  <span
                    className="sale-inf"
                    style={{
                      visibility: item?.discount?.show_on_detail_page ? 'visible' : 'hidden',
                    }}
                  >
                    {item?.discount?.value > 0 ? `-${item?.discount?.value}%` : ''}
                  </span>
                ) : (
                  ''
                )}
                <div
                  onClick={() =>
                    !props.isGifItem
                      ? directDetailProduct(
                          !props.closeSubNav ? itemKey.handle : itemKey.handle,
                          itemKey?.brand_page?.page_ptr?.handle,
                        )
                      : ''
                  }
                >
                  <div className="section-square">
                    <Picture data={imageKey ? imageKey : ''} />
                    {item.sale ? <span className="sale-inf">-50%</span> : ''}
                  </div>
                  <div className="item-info">
                    <div>
                      <h4>{itemKey?.brand?.name}</h4>
                      <p>{itemKey?.name}</p>
                      {getPerfumeType(itemKey?.tags) ? (
                        <p className="perfume-type">{getPerfumeType(itemKey?.tags)}</p>
                      ) : null}
                    </div>
                    {itemKey?.product_variants?.length > 1 ? (
                      <div>
                        <div className={itemKey.sale ? 'sale-price' : ''}>
                          From &nbsp;
                          {itemKey?.product_variants && itemKey?.product_variants[0]?.price ? (
                            <span
                              className={`price ${
                                willShowDiscount(item) ? 'strike-through' : ''
                              }`}
                            >
                              {`${moneyFormater(
                                getLowestProductPrice(itemKey?.product_variants),
                              )}`}
                            </span>
                          ) : null}
                        </div>
                        &nbsp;
                        {willShowDiscount(item) ? (
                          <span style={{ marginLeft: '1rem' }} className="discount-price">
                            {getDiscountedPrice(
                              getLowestProductPrice(itemKey?.product_variants),
                              itemKey?.discount?.value,
                              true,
                            )}
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <div>
                        <div className={itemKey.sale ? 'sale-price' : ''}>
                          {itemKey?.product_variants && itemKey?.product_variants[0]?.price ? (
                            <span
                              className={`price ${
                                willShowDiscount(item) ? 'strike-through' : ''
                              }`}
                            >
                              {moneyFormater(itemKey?.product_variants[0].price)}
                            </span>
                          ) : null}
                        </div>
                        &nbsp;
                        {willShowDiscount(item) ? (
                          <span style={{ marginLeft: '1rem' }} className="discount-price">
                            {getDiscountedPrice(
                              getLowestProductPrice(itemKey?.product_variants),
                              itemKey?.discount?.value,
                              true,
                            )}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {/* {props.isGifItem ? (
                    <button
                      className="btn-add"
                      onClick={(e) => handleCheckoutProduct(e, itemKey)}
                    >
                      ADD TO BAG +
                    </button>
                  ) : (
                    ''
                  )} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(ProductSlide);
