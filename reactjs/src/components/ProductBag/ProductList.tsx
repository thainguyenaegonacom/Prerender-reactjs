import React, { memo, useState } from 'react';
import Quantity from './Quantity';
// import ProductSlide from '../ProductSlide';
import _, { map } from 'lodash';
import { getAppliedDiscountedPrice, moneyFormater } from '../../redux/Helpers';
import Picture from '../Picture';
import DropdownVariant from './DropdownVariant';
import ProductSlide from '../ProductSlide';
import { isMobile } from '../../DetectScreen';
// {
//   data,
//   DeleteCheckoutProduct,
//   offerData,
//   handleCloseShoppingBag,
// }
function ProductList(props: any) {
  const [isShowOffer, setIsShowOffer] = useState<any>(true);
  const handleDeleteProductBag = (variantID: any) => {
    props.DeleteCheckoutProduct(variantID);
  };
  return (
    <>
      <ul>
        <li className="header-card">
          <div></div>
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
        </li>
      </ul>
      <ul className="wrapper-items">
        {map(props.data, (item, index) => {
          return (
            <li className="product-item" key={index}>
              <div className="item">
                <div>
                  <div className="section-square">
                    {item?.image ? <Picture data={item?.image?.url} /> : ''}
                  </div>
                </div>
                <div className="product-inf">
                  <h4>{item?.vendor}</h4>
                  <p>{item?.title}</p>
                  {item?.variant_title && item?.product_variants?.length <= 1 ? (
                    <p className="capacity">{item?.variant_title}</p>
                  ) : (
                    ''
                  )}
                  {item?.variant_title && item?.product_variants?.length > 1 ? (
                    <DropdownVariant
                      data={item?.product_variants}
                      variantID={item?.variant_id}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className="quantity">
                  <Quantity
                    quantity={item?.quantity}
                    variantId={item?.variant_id}
                    variant={item}
                    isDisabled={
                      _.find(item.properties, (i) => i.name == 'variant_gift') ? true : false
                    }
                  />
                </div>
                <div className="price">
                  <button
                    className="remove-item"
                    onClick={() => handleDeleteProductBag(item?.variant_id)}
                  >
                    <i className="gg-close"></i>
                  </button>
                  {isMobile ? (
                    <div className="quantity quantity-mobile">
                      <Quantity
                        quantity={item?.quantity}
                        variantId={item?.variant_id}
                        variant={item}
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  <h4 className="discount">
                    <p
                      style={{ whiteSpace: 'nowrap' }}
                      className={
                        item?.applied_discount?.value?.length > 0
                          ? `price strike-through`
                          : 'price'
                      }
                    >
                      {moneyFormater(item?.price * item?.quantity || '')}
                    </p>
                    {item?.applied_discount?.amount?.length > 0 && (
                      <p className="price">
                        {getAppliedDiscountedPrice(
                          (item?.price * item?.quantity).toString(),
                          item?.applied_discount?.amount,
                        )}
                      </p>
                    )}
                  </h4>

                  {/* {(item?.applied_discount && props.discountType == 'discount_detail') ||
                  item?.fixed_rebate >= 0 ? (
                    <h4 className="discount">
                      <p
                        style={{ whiteSpace: 'nowrap' }}
                        className={item?.fixed_rebate > 0 ? `price strike-through` : 'price'}
                      >
                        {moneyFormater(item?.price * item?.quantity || '')}
                      </p>
                      {item?.fixed_rebate > 0 && (
                        <p className="price">
                          {getDiscountedPrice(
                            (item?.price * item?.quantity).toString(),
                            item?.fixed_rebate,
                          )}
                        </p>
                      )}
                    </h4>
                  ) : item?.applied_discount &&
                    props.discountType == 'discount_buy_x_get_y' ? (
                    <h4 className="discount">
                      <p style={{ whiteSpace: 'nowrap' }}>
                        {moneyFormater(item?.price * item?.quantity || '')}
                      </p>
                      <p>
                        {item?.applied_discount?.amount
                          ? `-${moneyFormater(item?.applied_discount?.amount || '')}`
                          : ''}
                      </p>
                    </h4>
                  ) : (
                    <h4>{moneyFormater(item?.price * item?.quantity || '')}</h4>
                  )} */}
                </div>
              </div>
            </li>
          );
        })}

        {/* <li className="product-item">
          <div className="item">
            <div>
              <div className="section-square">
                <img src={imgExample1} alt="" />
              </div>
            </div>
            <div className="product-inf">
              <h4>BVLGARI</h4>
              <p>Splendida Bvlgari</p>
              <p>Rose Edp </p>
              <p className="capacity">15ml</p>
            </div>
            <div className="quantity">
              <Quantity />
            </div>
            <div className="price">
              <button className="remove-item">
                <i className="gg-close"></i>
              </button>
              <h4>5,950৳</h4>
            </div>
          </div>
          <p className="caution">
            <i className="gg-info"></i>Add one more this product to get a FREE sample
          </p>
          <div className="gif-slide" style={{ display: 'none' }}>
            <h4>Choose your FREE gift:</h4>
            <ProductSlide data={dataExample2} col={3} />
          </div>
        </li> */}
        {props.gifVariantData && props.gifVariantData.length > 0 ? (
          <li
            className={`product-item offer-box animation faster ${
              isShowOffer ? '' : 'fadeOut'
            }`}
          >
            <button
              className="remove-offer"
              onClick={() => {
                setIsShowOffer(false);
              }}
            >
              <i className="gg-close"></i>
            </button>
            <h4>Your gift:</h4>
            <ProductSlide
              data={props.gifVariantData}
              col={3}
              handleCloseShoppingBag={props.handleCloseShoppingBag}
              isGifItem={true}
            />
          </li>
        ) : (
          ''
        )}
        {props.offerData && props.offerData.length > 0 && !props.gifVariantData ? (
          <li
            className={`product-item offer-box animation faster ${
              isShowOffer ? '' : 'fadeOut'
            }`}
          >
            <button
              className="remove-offer"
              onClick={() => {
                setIsShowOffer(false);
              }}
            >
              <i className="gg-close"></i>
            </button>
            <h4> Special offers for you:</h4>
            <ProductSlide
              data={props.offerData}
              col={3}
              handleCloseShoppingBag={props.handleCloseShoppingBag}
            />
          </li>
        ) : (
          ''
        )}
      </ul>
    </>
  );
}
export default memo(ProductList);
