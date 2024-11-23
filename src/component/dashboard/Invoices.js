import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../component/dashboard/Invoices.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const generateInvoiceNumber = (index) => {
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}${today.getFullYear()}`;
    return `INV-${formattedDate}${String(index + 1).padStart(5, '0')}`;
  };

  const getData = async () => {
    setLoading(true);
    const q = query(collection(db, 'invoices'), where('uid', '==', localStorage.getItem('uid')));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      ...doc.data(),
      invoiceNumber: doc.data().invoiceNumber || generateInvoiceNumber(index),
    }));
    setInvoices(data);
    setLoading(false);
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm('Are you sure you want to delete this invoice?');
    if (isSure) {
      try {
        await deleteDoc(doc(db, 'invoices', id));
        getData();
      } catch {
        window.alert('Something went wrong while deleting the invoice.');
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Invoices</h2>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <i className="fa-solid fa-spinner fa-spin fa-2x text-primary"></i>
        </div>
      ) : (
        <div>
          {invoices.length > 0 ? (
            <div className="row">
              {invoices.map((data) => (
                <div className="col-md-4" key={data.id}>
                  <div className="card invoice-card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{data.to}</h5>
                      <p className="card-text">
                        <strong>Invoice Number:</strong> {data.invoiceNumber}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(data.date.seconds * 1000).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Total:</strong> ${data.total.toFixed(2)}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => deleteInvoice(data.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                        <button
                          onClick={() => navigate('/dashboard/invoice-detail', { state: data })}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fa-solid fa-eye"></i> View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-invoice-wrapper text-center">
              <p className="lead">You have no invoices at the moment.</p>
              <button
                onClick={() => navigate('/dashboard/new-invoice')}
                className="btn btn-success"
              >
                Create New Invoice
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoices;
