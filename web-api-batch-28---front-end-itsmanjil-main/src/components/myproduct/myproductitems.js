import styled from "styled-components";
import React, { useEffect, useState } from "react";
import EditProduct from "./editproduct";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import SimpleBackdrop from "../../Shared/Backdrop/Backdrop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 85%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  padding: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const MyproductItem = (props) => {
  const imagename = props.image.replace(
    "http://10.0.2.2:4000/",
    "http://localhost:4000/"
  );

  const [showEdit, setShowEdit] = useState(false);
  const userId = localStorage.getItem("user id");
  // const productId = useParams().id;
  // let navigate = useNavigate();

  const hadleShowEdit = () => {
    setShowEdit((prevState) => !prevState);
    console.log(showEdit);
  };

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    AxiosInstance.get(`products`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const filterMyProduct =
    products &&
    products.filter((product) => {
      return product.owner_id === userId && product._id === props.id;
    });

  const deleteProduct = () => {
    AxiosInstance.delete(`products/${props.id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        toast("Product removed sucessfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(toast("Error"));
      });
  };

  return (
    <>
      <LinkContainer>
        <ToastContainer />
        <Circle />
        <Image src={imagename} />
        <Info>
          {
            <div onClick={() => hadleShowEdit()}>
              <Icon>
                edit
                {/* <Icon>{props.name}</Icon> */}
                <EditSharpIcon />
              </Icon>
            </div>
          }
          <Link to={`/ProductDetail/${props.id}`} className="btn">
            <Icon>
              View Details
              {/* <SearchOutlined onClick={ProductDetails} /> */}
            </Icon>
          </Link>
          <Icon onClick={() => deleteProduct()}>
            <DeleteOutlineSharpIcon />
          </Icon>
        </Info>
      </LinkContainer>

      <SimpleBackdrop open={showEdit} onClick={hadleShowEdit}>
        {showEdit &&
          filterMyProduct.map((item) => {
            // console.log("item from eidt", item);
            return (
              <EditProduct
                onClick={hadleShowEdit}
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                condition={item.condition}
                image={item.image}
                phone={item.phone}
                usedFor={item.usedFor}
                delivery={item.delivery}
                availability={item.availability}
                negotiable={item.negotiation}
              />
            );
          })}
      </SimpleBackdrop>
    </>
  );
};

export default MyproductItem;
