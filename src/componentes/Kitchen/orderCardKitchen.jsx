import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from "./orderCardKitchen.module.css";
import check from "./images/check.png";
import Swal from 'sweetalert2';
import { updateOrderToBackend } from '../../services/orders-services';

function OrderCardKitchen({ order, updateOrderList }) {
  const [status, setStatus] = useState("PENDIENTE");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startPreparation = () => {
    setStatus("EN PREPARACIÓN");

    const preparationTimer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    setTimer(preparationTimer);
  };

  const stopPreparation = async () => {
    Swal.fire({
      icon: 'question',
      title: 'Confirmar Entrega',
      text: '¿Estás seguro de que la orden está lista para ser entregada?',
      showCancelButton: true,
      confirmButtonColor: '#62335b',
      cancelButtonColor: '#EC2569',
      confirmButtonText: 'La orden ya esta lista',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        clearInterval(timer);
        setTimer(null);
        setElapsedTime(0);
        setStatus('LISTO PARA ENTREGAR');

        // Llama a la función para actualizar la orden en la base de datos
        await updateOrderToBackend(order._id, 'LISTO PARA ENTREGAR', elapsedTime);

        // Llama a la función para actualizar la lista de órdenes en el componente padre
        updateOrderList(order._id, 'LISTO PARA ENTREGAR');

        Swal.fire({
          icon: 'success',
          title: 'Preparación Completada',
          html: `<p class="${style.sweetAlertTable}"><strong>Mesa # ${order.table}</strong></p>
                 <p class="${style.sweetAlertTime}">Tiempo transcurrido: ${formatTime(elapsedTime)}</p>`,
          customClass: {
            container: style.sweetAlertContainer,
            title: style.sweetAlertTitle,
            content: style.sweetAlertContent,
            confirmButton: style.sweetAlertConfirmButton,
          },
        });
      } else if (status === 'LISTO PARA ENTREGAR') {
        updateOrderList(order._id, 'LISTO PARA ENTREGAR');
      }
    });
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const buttonColorClass = status === 'EN PREPARACIÓN' ? style.preparationButton : style.deliveryButton;

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className={style.orderCardKitchen}>
      <div className={style.cardHeader}>
        <h4 className={style.h4Mesa}>{`Mesa # ${order.table}`}</h4>
        {status === "LISTO PARA ENTREGAR" && <img src={check} alt="check" className={style.checkIcon} />}
        {status === "EN PREPARACIÓN" && (
          <p className={style.elapsedTime}>{`Tiempo transcurrido: ${formatTime(elapsedTime)}`}</p>
        )}
      </div>
      <hr style={{ borderColor: '#F7DC34' }} />
      <div className={style.orderSection}>
        {order.products && order.products.map((product, index) => (
          <div className={style.productQuantity} key={index}>
            <h2 className={style.productName}> ✧ {product.product.name} </h2>
            <h2 className={style.productqty}> {product.qty} </h2>
          </div>
        ))}
      </div>
      {status === "EN PREPARACIÓN" && (
        <button className={`${style.orderStatus} ${buttonColorClass}`} onClick={stopPreparation}>
          LISTO PARA ENTREGAR
        </button>
      )}
      {status === "PENDIENTE" && (
        <button className={style.deliveryButton} onClick={startPreparation}>
          PREPARAR
        </button>
      )}
    </div>
  );
}

OrderCardKitchen.propTypes = {
  order: PropTypes.object.isRequired,
  updateOrderList: PropTypes.func.isRequired,
};

export default OrderCardKitchen;
