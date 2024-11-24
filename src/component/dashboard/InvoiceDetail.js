import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate, useLocation } from 'react-router-dom';

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
  });
  const invoice = location.state;

  useEffect(() => {
    // Fetch profile details from localStorage
    const companyName = localStorage.getItem('cName');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const address = localStorage.getItem('address');
    const logo = localStorage.getItem('photoURL');

    setProfile({ companyName, email, phone, address, logo });
  }, []);

  if (!invoice) {
    return (
      <div className="container my-5 text-center">
        <h3>No invoice details found.</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/dashboard/invoices')}
        >
          Go Back to Invoices
        </button>
      </div>
    );
  }

  const handleExportToPDF = () => {
    const content = document.getElementById('invoice-content');
    html2canvas(content, { useCORS: true }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${new Date().toISOString().split('T')[0]}.pdf`);
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('invoice-content');
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="container my-5">
      {/* Buttons for Export/Print */}
      <div className="d-flex justify-content-between align-items-center no-print">
        <h2>Invoice Details</h2>
        <div>
          <button onClick={handleExportToPDF} className="btn btn-primary me-2">
            Export to PDF
          </button>
          <button onClick={handlePrint} className="btn btn-secondary">
            Print
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div
        id="invoice-content"
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="mb-4">
          {/* Company Details */}
          <div className="d-flex justify-content-between align-items-center">
            {profile.logo && (
              <img
                src={profile.logo}
                alt="Company Logo"
                style={{ maxWidth: '100px' }}
              />
            )}
            <div className="text-end">
              <h4>{profile.companyName || 'Company Name'}</h4>
              <p>{profile.email || 'Email Address'}</p>
              <p>{profile.phone || 'Phone Number'}</p>
              <p>{profile.address || 'Address'}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-4">
          <h5>Invoice To:</h5>
          <p>
            <strong>Name:</strong> {invoice.to || 'N/A'}
          </p>
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
        </div>

        {/* Product List */}
        <div className="mb-4">
          <h5>Products:</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.product.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="text-end">
          <h5>Total: ${invoice.total.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
