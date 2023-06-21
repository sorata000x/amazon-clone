import React, { useState, useEffect } from 'react'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';
import './Orders.css';
import { doc, onSnapshot, query, orderBy, collection} from 'firebase/firestore';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      const ordersRef = collection(userRef, "orders");
      const q = query(ordersRef, orderBy('created', 'desc'));
      onSnapshot(q, snapshot => (
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))));
    } else {
      setOrders([])
    }
    
  }, [user])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
