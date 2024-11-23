import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InvoiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: invoice } = location;

  if (!invoice) {
    return (
      <div className="container my-5 text-center">
        <h3>No invoice details found.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/dashboard/invoices')}>
          Go Back to Invoices
        </button>
      </div>
    );
  }

  const handleExportToPDF = () => {
    alert('Export to PDF functionality goes here.');
    // Example: Use jsPDF or any library to generate a PDF from the invoice details
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    navigate('/dashboard/new-invoice', { state: invoice });
  };

  const handleDelete = () => {
    const isSure = window.confirm('Are you sure you want to delete this invoice?');
    if (isSure) {
      // Placeholder for deleting the invoice from Firebase
      alert('Invoice deleted successfully.');
      navigate('/dashboard/invoices');
    }
  };

  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Invoice Details</h2>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Export
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button className="dropdown-item" onClick={handleExportToPDF}>
                Export to PDF
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handlePrint}>
                Print
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{invoice.to || 'N/A'}</h5>
          <p>
            <strong>Phone:</strong> {invoice.phone || 'N/A'}
          </p>
          <p>
            <strong>Address:</strong> {invoice.address || 'N/A'}
          </p>
          <p>
            <strong>Date:</strong>{' '}
            {invoice.date?.seconds
              ? new Date(invoice.date.seconds * 1000).toLocaleDateString()
              : 'N/A'}
          </p>

          {/* Product List */}
          <h6 className="mt-4">Products:</h6>
          {invoice.product.length > 0 ? (
            <ul className="list-group">
              {invoice.product.map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {item.name} (x{item.qty})
                  <span>${item.totalPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available for this invoice.</p>
          )}
          <h5 className="mt-4">Total: ${invoice.total.toFixed(2)}</h5>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-warning" onClick={handleEdit}>
          <i className="fa-solid fa-pen"></i> Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
