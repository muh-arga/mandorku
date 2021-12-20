import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  Meteor.subscribe('AllCustomers');

  const data = Customer.find().fetch();
  const listData = data.map((data) => {
    <li>{data._id}</li>
  })

  const increment = () => {
    setCounter(counter + 1);
  };


  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <ul>{listData}</ul>
      <p>You've pressed the button {counter} times.</p>
      
    </div>
  );
};


