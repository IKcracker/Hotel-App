import React, { useState } from 'react';

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accepted) {
      alert("You have accepted the Terms and Conditions.");
      // Handle further actions, such as form submission
    } else {
      alert("Please accept the Terms and Conditions before proceeding.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Moropane Luxury Hotel's website. By accessing this website, you agree to comply with and be bound by the following terms and conditions:
      </p>

      <h2>1. General Use</h2>
      <p>
        You must be at least 18 years old to use this site. By using this site, you confirm that you meet the legal age requirement.
      </p>

      <h2>2. Privacy</h2>
      <p>
        Your privacy is important to us. Please review our privacy policy for more details on how we handle your personal information.
      </p>

      <h2>3. Booking Terms</h2>
      <p>
        All bookings made through this site are subject to availability. Moropane Luxury Hotel reserves the right to cancel bookings under special circumstances.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        Moropane Luxury Hotel is not responsible for any damages that arise from the use or inability to use this website.
      </p>

      <h2>5. Changes to the Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the website following any changes indicates your acceptance of the new terms.
      </p>

      <h2>6. Contact Information</h2>
      <p>
        For questions about these Terms and Conditions, please contact us at:
        <br />
        Email: support@moropaneluxuryhotel.com
        <br />
        Phone: +1 234 567 890
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={accepted}
            onChange={handleCheckboxChange}
          />
          I accept the Terms and Conditions
        </label>
        <br />
        <button type="submit" disabled={!accepted}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TermsAndConditions;
