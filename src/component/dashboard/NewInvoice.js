import '../../component/dashboard/NewInvoice.css';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Timestamp, addDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const NewInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [to, setTo] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState(1);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  // Pre-fill data when editing an existing invoice
  useEffect(() => {
    if (location.state) {
      const { id, to, phone, address, product, total } = location.state;
      setInvoiceId(id || null);
      setTo(to || '');
      setPhone(phone || '');
      setAddress(address || '');
      setProduct(product || []);
      setTotal(total || 0);
    }
  }, [location.state]);

  const addProduct = () => {
    if (!name || !price || qty <= 0) {
      alert('Please fill out valid product details.');
      return;
    }

    const productVat = (parseFloat(vat) / 100) * parseFloat(price);
    const totalPrice = (parseFloat(price) + productVat) * qty;

    const newProduct = {
      id: product.length,
      name,
      price: parseFloat(price),
      qty,
      vat: parseFloat(vat),
      totalPrice,
    };

    setProduct([...product, newProduct]);
    setTotal(total + totalPrice);
    setName('');
    setPrice('');
    setQty(1);
    setVat(0);
  };

  const deleteProduct = (index) => {
    const updatedProductList = product.filter((_, i) => i !== index);
    const removedProduct = product[index];
    setTotal(total - removedProduct.totalPrice);
    setProduct(updatedProductList);
  };

  const saveData = async () => {
    setLoading(true);
    const invoiceData = {
      to,
      phone,
      address,
      product,
      total,
      uid: localStorage.getItem('uid'),
      date: Timestamp.fromDate(new Date()),
    };

    try {
      if (invoiceId) {
        // Update existing invoice
        await updateDoc(doc(db, 'invoices', invoiceId), invoiceData);
        alert('Invoice updated successfully!');
      } else {
        // Create new invoice
        await addDoc(collection(db, 'invoices'), invoiceData);
        alert('Invoice created successfully!');
      }
      navigate('/dashboard/invoices');
    } catch (error) {
      console.error('Error saving invoice:', error.message);
      alert('Failed to save invoice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-invoice-wrapper">
      <div className="main-container">
        <div className="header-row">
          <h2>{invoiceId ? 'Edit Invoice' : 'New Invoice'}</h2>
          <button onClick={saveData} className="add-btn" type="button">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Save Data'}
          </button>
        </div>

        <form className="new-invoice-form">
          <div className="first-row">
            <input
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
              value={to}
            />
            <input
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              value={phone}
            />
            <input
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              value={address}
            />
          </div>

          <div className="product-row">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              value={name}
            />
            <input
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              value={price}
              type="number"
            />
            <input
              onChange={(e) => setQty(e.target.value)}
              type="number"
              placeholder="Quantity"
              value={qty}
              min="1"
            />
            <input
              onChange={(e) => setVat(e.target.value)}
              type="number"
              placeholder="VAT (%)"
              value={vat}
              min="0"
            />
          </div>

          <button onClick={addProduct} className="add-btn" type="button">
            Add Product
          </button>
        </form>

        {product.length > 0 && (
          <div className="product-wrapper">
            <div className="product-list header">
              <p>S. No</p>
              <p>Product Name</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>VAT (%)</p>
              <p>Total Price</p>
              <p>Action</p>
            </div>
            {product.map((data, index) => (
              <div className="product-list" key={index}>
                <p>{index + 1}</p>
                <p>{data.name}</p>
                <p>${data.price.toFixed(2)}</p>
                <p>{data.qty}</p>
                <p>{data.vat}%</p>
                <p>${data.totalPrice.toFixed(2)}</p>
                <p>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))}
            <div className="total-wrapper">
              <p>Total: ${total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewInvoice;
