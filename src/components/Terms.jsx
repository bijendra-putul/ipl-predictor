import React from 'react';
import Navbar from './Navbar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using IPL Predictor, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials on IPL Predictor's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Subscription Services</h2>
              <p className="mb-4">
                IPL Predictor offers premium subscription services for enhanced IPL prediction features. By subscribing to our services:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You agree to pay the subscription fees as specified</li>
                <li>Subscription automatically renews unless cancelled</li>
                <li>You may cancel your subscription at any time</li>
                <li>Refunds are provided within 7 days of purchase if unsatisfied</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Product Purchases</h2>
              <p className="mb-4">
                All purchases of IPL merchandise are subject to availability. We reserve the right to refuse or cancel any order
                for any reason. Prices are subject to change without notice.
              </p>
              <p className="mb-4">
                Payment processing is handled securely through Razorpay. All transactions are encrypted and secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <p className="mb-4">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Content and Intellectual Property</h2>
              <p className="mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of IPL Predictor
                and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p className="mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Prohibited Uses</h2>
              <p className="mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms.
              </p>
              <p className="mb-4">
                Upon termination, your right to use the service will cease immediately. If you wish to terminate your account,
                you may simply discontinue using the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall IPL Predictor, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions.
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material,
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="mb-4">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service
                after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> support@iplpredictor.com</p>
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

export default Terms;