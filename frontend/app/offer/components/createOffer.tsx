import React, { useState } from 'react';

const AddOfferForm = () => {
  const [formData, setFormData] = useState({
    namePer: '',
    shopName: '',
    businessType: '',
    businessPhoneNumber: '',
    businessEmail: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:9000/bns/offer/add-offer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add offer');
      }

      setSubmitSuccess(true);

      // Reset the form after successful submission
      setFormData({
        namePer: '',
        shopName: '',
        businessType: '',
        businessPhoneNumber: '',
        businessEmail: '',
        description: '',
        startDate: '',
        endDate: ''
      });

      console.log('Offer added successfully');
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Offer</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="namePer"
            value={formData.namePer}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Shop Name:
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Business Type:
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Business Type</option>
            <option value="Business">Business</option>
            <option value="AnotherType">Another Type</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label className="block mb-2">
          Business Phone Number:
          <input
            type="text"
            name="businessPhoneNumber"
            value={formData.businessPhoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Business Email:
          <input
            type="text"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>

      {submitSuccess && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
          Offer added successfully!
        </div>
      )}
    </div>
  );
};

export default AddOfferForm;
