import React, { useState, useEffect } from 'react';
import style from "./orderCardKitchen.module.css";
import check from "./images/check.png";
import Swal from 'sweetalert2';

export function OrderCardKitchen({ order }) {
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

  const stopPreparation = () => {
    Swal.fire({
      icon: 'question',
      title: 'Confirmar Entrega',
      text: '¿Estás seguro de que la orden está lista para ser entregada?',
      showCancelButton: true,
      confirmButtonText: 'Sí, lista para entregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        clearInterval(timer);
        setTimer(null);
        setElapsedTime(0);
        setStatus('LISTO PARA ENTREGAR');
        Swal.fire({
          icon: 'success',
          title: 'Preparación Completada',
          text: 'La orden está lista para ser entregada.',
        });
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
  

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);  

  return (
    <div className={style.orderCardKitchen}>
      <div className={style.cardHeader}>
        <h4>{`Mesa # ${order.table}`}</h4>
        {status === "LISTO PARA ENTREGAR" && <img src={check} alt="check" className={style.checkIcon} />}
      </div>
      <hr></hr>
      <div className={style.orderSection}>
        {order.products && order.products.map((product, index) => (
          <div className={style.productQuantity} key={index}>
            <h2> {product.product.name} </h2>
            <h2> {product.qty} </h2>
          </div>
        ))}
      </div>
      {status === "PENDIENTE" && (
        <button className={style.orderStatus} onClick={startPreparation}>
          PREPARAR
        </button>
      )}
      {status === "EN PREPARACIÓN" && (
        <>
          <p>{`Tiempo transcurrido: ${formatTime(elapsedTime)}`}</p>
          <button className={style.orderStatus} onClick={stopPreparation}>
            LISTO PARA ENTREGAR
          </button>
        </>
      )}
    </div>
  );
}

export default OrderCardKitchen;
