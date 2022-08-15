import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    phone: true,
  });

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
 

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneIsValid = isTenChars(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      phone:  enteredPhoneIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
     enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
 
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? '' : classes.invalid
  }`;
  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
    
      <div className={phoneControlClasses}>
        <label htmlFor='phone'>Phone number</label>
        <input type='text' id='phone' ref={phoneInputRef} />
        {!formInputsValidity.phone && (
          <p>Please enter a valid number! (10 characters long)!</p>
        )}
      </div>
     
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
