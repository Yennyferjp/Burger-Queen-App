import Swal from 'sweetalert2';
import style from "./OrderCard.module.css";
import check from "./images/check.png";
import cancelIcon from "./images/cancelIcon.png"; 

function OrderCard({ order, onCheckClicked }) {
  const handleCheckClick = async () => {
    onCheckClicked(order._id, order.status);
  };

  const checkIcon = order.status === 'PENDIENTE' ? cancelIcon : check;
  const iconCancel = order.status === 'PENDIENTE' ? style.cancelIcon : '';

  return (
    <div className={style.orderCard}>
      <div className={style.cardHeader}>
        <h4 className={style.h4Mesa}>{`Mesa # ${order.table}`}</h4>
        <p className={style.orderStatusMessage}> {order.status}</p>
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
      <div >
        <img
          src={checkIcon}
          alt="check"
          className={`${style.checkIcon} ${iconCancel}`}
          onClick={handleCheckClick}
        />
      </div>
    </div>
  );
}

export default OrderCard;
