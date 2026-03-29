import React from 'react';
import Navbar from './Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                At IPL Predictor, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="mb-4">
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-2">Personal Information</h3>
              <p className="mb-4">We may collect the following personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Billing and payment information</li>
                <li>Shipping address for merchandise orders</li>
                <li>Subscription and service usage data</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-2">Usage Data</h3>
              <p className="mb-4">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP address and location information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Device information and screen resolution</li>
                <li>Referral sources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for various purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To process transactions and manage orders</li>
                <li>To manage your account and provide customer support</li>
                <li>To communicate with you about updates, promotions, and services</li>
                <li>To analyze usage patterns and improve our service</li>
                <li>To detect and prevent fraud and security issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except in the following circumstances:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you</li>
                <li><strong>Payment Processing:</strong> Payment information is processed securely through Razorpay and is not stored on our servers</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to legal processes</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure password hashing and storage</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure payment processing through certified providers</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect
                your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small
                data files stored on your device that help us remember your preferences and understand how you use our service.
              </p>
              <p className="mb-4">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect the
                functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy,
                unless a longer retention period is required by law. When we no longer need your information, we will securely
                delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information
                from children under 13. If we become aware that we have collected personal information from a child under 13,
                we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such
                transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or
                content of these external sites. We encourage you to review the privacy policies of any third-party websites
                you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy
                Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@iplpredictor.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@iplpredictor.com</p>
                <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
                <p><strong>Address:</strong> IPL Predictor, India</p>
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: March 29, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;