import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";




 
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    fetch('/product')
      .then(response => response.json())
      .then(data => setProduct(data));
  }, []);
  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <div style={{
        margin:'auto',
        display: 'flex',
        flexDirection: 'column',

        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
       
        }}>
        <div style={{ maxWidth: '400px',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',}}>
        <h1>{product.name}</h1>
       <p>{product.description}</p>
       <p>Price: {product.price / 100} {product.currency}</p>
       <img src={product.image} alt={product.name} />
        </div>
        <div style={{marginLeft:'100px',width:'100%'}}>
          {/* <h1>React Stripe and the Payment Element</h1> */}
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
}

export default Payment;
