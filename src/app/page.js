"use client";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const today = new Date().toISOString().split("T")[0];

export default function OrderSlipPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    location: "",
    phone: "",
    orderNo: 1,
    date: today,
    category: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const lastOrder = localStorage.getItem("orderNo");
    const nextOrder = lastOrder ? parseInt(lastOrder) + 1 : 1;

    // Convert number to 6-digit format: 000001, 000002
    const paddedOrder = String(nextOrder).padStart(6, "0");

    setFormData((prev) => ({ ...prev, orderNo: paddedOrder }));
    localStorage.setItem("orderNo", nextOrder); // Store raw number
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const downloadPDF = () => {
    const node = document.getElementById("slip");
    domtoimage.toPng(node).then((dataUrl) => {
      const pdf = new jsPDF();
      const img = new Image();
      img.src = dataUrl;
      pdf.addImage(img, "PNG", 35, 20, 120, 160);

      pdf.save("slip.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-8 px-4 sm:py-10 font-sans">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-red-800 mb-6 sm:mb-8 text-center">
        <span className="text-black">
          {submitted ? "Order Slip" : "Welcome to"}
        </span>{" "}
        {!submitted && "Bloom Envy"}
      </h1>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md text-black"
        >
          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="name"
          >
            Recipient Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Recipient Name"
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 mb-4 sm:mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />

          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 sm:p-3 mb-4 sm:mb-5 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />

          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="city"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 mb-4 sm:mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black text-sm"
          >
            <option value="" disabled>
              Select city
            </option>
            <option value="Abbottabad">Abbottabad</option>
            <option value="Bahawalpur">Bahawalpur</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Gujrat">Gujrat</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Jacobabad">Jacobabad</option>
            <option value="Jhang">Jhang</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Larkana">Larkana</option>
            <option value="Mardan">Mardan</option>
            <option value="Multan">Multan</option>
            <option value="Muzaffarabad">Muzaffarabad</option>
            <option value="Nawabshah">Nawabshah</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Rahim Yar Khan">Rahim Yar Khan</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Sahiwal">Sahiwal</option>
            <option value="Sargodha">Sargodha</option>
            <option value="Sheikhupura">Sheikhupura</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Swat">Swat</option>
            <option value="Taxila">Taxila</option>
            <option value="Thatta">Thatta</option>
            <option value="Vehari">Vehari</option>
            <option value="Other">Other</option>
          </select>

          {/* 🆕 Bouquet Category */}
          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="category"
          >
            Bouquet Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 mb-4 sm:mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-black text-sm"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Snacks Bouquet">Snacks Bouquet</option>
            <option value="Chocolate Bouquet">Chocolate Bouquet</option>
            <option value="Rose Ribbon Bouquet">Rose Ribbon Bouquet</option>
            <option value="Makeup Bouquet">Makeup Bouquet</option>
            <option value="Customized Bouquet">Customized Bouquet</option>
            <option value="Cash Bouquet">Cash Bouquet</option>
            <option value="Customized Basket">Customized Basket</option>
            <option value="Snack Basket">Snack Basket</option>
            <option value="Deal for Men">Deal for Men</option>
            <option value="Deal for Women">Deal for Women</option>
          </select>

          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="location"
          >
            Location (Area / Block / Street)
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Gulshan-e-Iqbal, Block 7"
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 mb-4 sm:mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />

          <label
            className="block mb-2 text-sm sm:text-base font-semibold"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 03001234567"
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-red-800 hover:bg-pink-800 rounded-lg text-white font-bold text-sm sm:text-base transition-colors duration-300"
          >
            Generate Slip
          </button>
        </form>
      ) : (
        <div
          id="slip"
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md mt-6 sm:mt-8 text-black"
        >
          <div className="border-b border-gray-700 pb-2 sm:pb-3 mb-4 flex justify-between font-extrabold text-lg sm:text-xl tracking-wide text-red-800">
            <span>🌸 BLOOM ENVY</span>
            <span>Order Slip</span>
          </div>

          <div className="bg-gray-100 rounded-lg px-4 py-3 mb-4">
            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-800 font-semibold tracking-widest">
              <div>
                <div className="text-gray-500">Order No.</div>
                <div className="text-black text-lg font-bold">
                  #{formData.orderNo}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">Tracking ID</div>
                <div className="text-[10px] sm:text-xs font-mono bg-black text-white px-2 py-1 rounded tracking-widest">
                  BE-{formData.orderNo.slice(-2)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500">Date</div>
                <div className="text-black">{formData.date}</div>
              </div>
            </div>
          </div>

          <div className="mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
            <p>
              <strong>Recipient:</strong> {formData.name}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
            <p>
              <strong>City:</strong> {formData.city}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
          </div>

          <div className="flex justify-center my-4 sm:my-6">
            <QRCodeCanvas value={`https://bloom-envy.vercel.app`} size={100} />
          </div>

          <div className="text-xs text-right text-gray-600">
            Sender: Bloom Envy, Karachi, Pakistan
          </div>
        </div>
      )}

      {submitted && (
        <button
          onClick={downloadPDF}
          className="mt-4 sm:mt-6 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300"
        >
          Download PDF
        </button>
      )}
    </div>
  );
}
