import Swal from 'sweetalert2';
import style from "./OrderCard.module.css";
import check from "./images/check.png";
import pendingIcon from "./images/pendingIcon.png"; 

function OrderCard({ order, onCheckClicked }) {
  const handleCheckClick = async () => {
    onCheckClicked(order._id, order.status);
  };

  const checkIcon = order.status === 'PENDIENTE' ? pendingIcon : check;

  return (
    <div className={style.orderCard}>
      <div className={style.cardHeader}>
        <h4 className={style.h4Mesa}>{`Mesa # ${order.table}`}</h4>
        
      </div>
      <hr style={{ borderColor: '#F7DC34' }} />
      <div className={style.orderSection}>
        {order.products.map((producto, index) => (
          <div className={style.productQuantity} key={index}>
            <h2 className={style.productName}> ✧ {producto.product.name}</h2>
            <h2 className={style.productqty}> {producto.qty}</h2>
          </div>
        ))}
      </div>
      <div className={style.orderStatusMessage}>
        <p> {order.status}</p>
        <img
          src={checkIcon}
          alt="check"
          className={style.checkIcon}
          onClick={handleCheckClick}
        />
      </div>
    </div>
  );
}

export default OrderCard;
