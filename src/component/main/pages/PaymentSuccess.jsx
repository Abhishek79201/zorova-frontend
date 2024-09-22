import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Thank from '../assets/image/thanku.png'
import { useDispatch } from "react-redux";
import { checkPaymentPaid } from "../../features/bookingSlicer";

export default function  PaymentSuccess() {
    // const isOrderPlaced = useSelector((state) => state.booking.isSignup);
    const {id}=useParams();
    // const massageStateData = useSelector((state) => state.booking.data);
    const dispatch = useDispatch();

    useEffect(() => {
      if (id) {
        console.log(id)
        dispatch(checkPaymentPaid(id)).then((result)=>{
          console.log(result);
          if(!result.error){
            localStorage.removeItem('referralCode');
            console.log(result.payload.message);
          }else{
            console.log(result.error.message);
          }
        });
        // dispatch(sendConfirmationEmail(massageStateData));
      }
    }, [id]);
    return (
      <>
        <div className="final">
          <div className="final_content">
            <span className="check">
              <img src={Thank} alt="thankU" />
            </span>
          </div>
        </div>
      </>
    );
  };
