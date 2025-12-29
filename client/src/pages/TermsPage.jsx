import React from "react";
import "./TermsPage.css";

const TermsPage = () => {
  return (
    <div className="termspage-container">
      <header className="termspage-header">
        <h1 className="termspage-title">Terms & Conditions</h1>
        <p className="termspage-subtitle">
          Please read these terms carefully before using the PolicyRace platform.
        </p>
      </header>

      <section className="termspage-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using PolicyRace, you agree to be bound by these terms and conditions.
          If you do not agree, please do not use our platform.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          Users must be at least 18 years old to use our services. By using the platform,
          you confirm that you meet the eligibility requirements.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          To access certain features, you may need to create an account. You are responsible for
          maintaining the confidentiality of your login credentials and for all activities under your account.
        </p>

        <h2>4. Privacy</h2>
        <p>
          Our Privacy Policy explains how we handle your personal data. By using PolicyRace, you consent to
          the collection and use of information in accordance with our Privacy Policy.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, logos, graphics, and software on PolicyRace are the property of PolicyRace or its licensors.
          You may not copy, reproduce, or distribute any content without prior written permission.
        </p>

        <h2>6. Prohibited Activities</h2>
        <p>
          You agree not to use the platform for illegal activities, spamming, attempting unauthorized access,
          or interfering with the operation of the platform.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          PolicyRace is not liable for any direct, indirect, incidental, or consequential damages arising
          from the use or inability to use the platform.
        </p>

        <h2>8. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Updated terms will be posted on this page,
          and your continued use of the platform constitutes acceptance of the updated terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of India. Any disputes
          arising under these terms shall be resolved in the courts of India.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For any questions regarding these terms, please contact us at support@policyrace.com.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
