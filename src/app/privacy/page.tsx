export const metadata = {
  title: "Privacy Policy - EditPDFs.app",
  description: "Privacy policy for EditPDFs.app - Your files never leave your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500">Last updated: June 17, 2026</p>
          
          <h2>The Short Version</h2>
          <p>
            <strong>Your PDF files never leave your browser.</strong> We cannot see, access, 
            or store your documents. All PDF processing happens locally on your device using 
            JavaScript.
          </p>

          <h2>What We Don&apos;t Collect</h2>
          <ul>
            <li>Your PDF files or any content within them</li>
            <li>Your signatures or any data you add to PDFs</li>
            <li>Personal information (we don&apos;t have accounts)</li>
          </ul>

          <h2>What We Do Collect</h2>
          <p>We use standard web analytics to understand how our site is used:</p>
          <ul>
            <li>Pages visited</li>
            <li>General geographic region (country level)</li>
            <li>Device type and browser</li>
            <li>Referral source</li>
          </ul>
          <p>
            This data is aggregated and anonymous. We use it to improve the site and 
            understand which tools are most useful.
          </p>

          <h2>Advertising</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements that help support this
            free service. Third-party vendors, including Google, use cookies to serve ads based on a
            user&apos;s prior visits to this website and other sites on the Internet. Google&apos;s use
            of advertising cookies enables it and its partners to serve ads to our users based on
            their visits to our site and/or other sites.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            , or opt out of third-party vendors&apos; use of cookies for personalized advertising at{" "}
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            . For more information, see{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              how Google uses information from sites that use its services
            </a>
            .
          </p>

          <h2>Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>Analytics (understanding site usage)</li>
            <li>Advertising (Google AdSense and its partners may set cookies to serve and measure ads)</li>
          </ul>
          <p>
            We do not use cookies to track your PDF activity or store any document data.
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics</strong> — for understanding site usage</li>
            <li><strong>Google AdSense</strong> — for displaying advertisements</li>
            <li><strong>Vercel</strong> — for hosting the website</li>
          </ul>
          <p>
            Each of these services has their own privacy policy governing their data practices.
          </p>

          <h2>Data Security</h2>
          <p>
            Because your files are processed entirely in your browser and never sent to our 
            servers, there is no risk of your documents being intercepted, stored, or accessed 
            by us or any third party through our service.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect 
            any information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify users of any 
            material changes by posting the new policy on this page with an updated date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{" "}
            <a href="mailto:privacy@editpdfs.app">privacy@editpdfs.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
