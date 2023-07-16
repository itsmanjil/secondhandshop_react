import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const DetailProduct = () => {
  let { id } = useParams();
  const [detailList, setdetailList] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((res) => {
        setdetailList(res.data.data);
        console.log("product detail" + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, );

  return (
      <div style={{marginTop:'60px'}}>
    <div className="container">
      {detailList &&
        detailList.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="card-image">
                <img
                  src={item.image.replace(
                    "http://10.0.2.2:4000/",
                    "http://localhost:4000/"
                  )}
                  alt={item.name}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="card-right">
                <h5 className="item-title">Product Name : <span>{item.name}</span></h5>
                <p className="item-price">Price :
                  <b> Rs. {item.price}.00</b>
                </p>
                <span className="item-desc"> Description: {item.description}</span>
                <br></br>
                <p className="item-con"> Condition :{item.condition}</p>
                <br></br>
                <p className="item-phone">Phone :{item.phone}</p>
                <br></br>
                <p className="item-used">Used For :{item.usedFor}</p>
                <br></br>
                <p className="item-owner">Devlivered: {String(item.delivery)}</p>
                <br></br>
                <p className="item-owner">Availabile: {String(item.availability)}</p>
                <br></br>
                <p className="item-owner">Negotability :{String(item.negotiation)}</p>
              </div>
            </React.Fragment>
          );
        })}
    </div>
    </div>
  );
};

export default DetailProduct;
