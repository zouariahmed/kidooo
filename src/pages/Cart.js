import React, { Fragment, useState,useRef } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import "../styles/cart.css"
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart
} from "redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
const Cart = ({
    cartItems,
    decreaseQuantity,
    addToCart,
    deleteFromCart,
    deleteAllFromCart
  }) => {
    const [quantityCount] = useState(1);
    const { addToast } = useToasts();
    let cartTotalPrice = 0;
    const [discountedPrice,setDiscountedPrice] = useState(0)
    const discountRef = useRef(null); 
  return (
    <AnimationRevealPage>
            <MetaTags>
        <title>Kido | Cart</title>
        <meta
          name="description"
          content="Kid Cart page."
        />
      </MetaTags>
      <Header />
      <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your Cart experiences</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Nom de produit</th>
                            <th>Prix</th>
                            <th>N° d'article</th>
                            <th>Sous Total</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                       
                            const finalProductPrice = cartItem.price
                               cartTotalPrice +=
                                  finalProductPrice * cartItem.count
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/products/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.imageSrc
                                      }
                                      alt="cover me"
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/products/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.title}
                                  </Link>
                              
                                </td>

                                <td className="product-price-cart">
                                  
                                    <span className="amount">
                                      {"Tnd "+finalProductPrice}
                                    </span>
                                  
                                </td>
                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>

                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.count}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.count >=cartItem.maxLoad
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  Tnd {finalProductPrice * cartItem.count}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    Delete
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Clear my Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                 

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" ref={discountRef} />
                          <button className="cart-btn-2" onClick={(e)=>{
                              e.preventDefault();
                              if(cartItems[0].discounts && cartItems[0].discounts.includes(discountRef.current.value)){
                                  // console.log("hoohay")
                                  setDiscountedPrice(cartTotalPrice*0.9)
                              }
                          }}>
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {"Tnd" + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {discountedPrice>0 ? (
                               "Tnd" + discountedPrice.toFixed(2) 
                          ) : ("Tnd" + cartTotalPrice.toFixed(2))}
                        </span>
                      </h4>
                              <Link to="#" >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Kido Now
                      </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      <Footer />
    </AnimationRevealPage>
  );
};

const mapStateToProps = state => {
    return {
      cartItems: state.cartData,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      addToCart: (item, addToast, quantityCount) => {
        dispatch(addToCart(item, addToast, quantityCount));
      },
      decreaseQuantity: (item, addToast) => {
        dispatch(decreaseQuantity(item, addToast));
      },
      deleteFromCart: (item, addToast) => {
        dispatch(deleteFromCart(item, addToast));
      },
      deleteAllFromCart: addToast => {
        dispatch(deleteAllFromCart(addToast));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);
  
