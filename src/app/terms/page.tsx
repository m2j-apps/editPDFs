export const metadata = {
  title: "Terms of Service - EditPDFs.app",
  description: "Terms of service for EditPDFs.app free PDF tools.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using EditPDFs.app (&quot;the Service&quot;), you accept and agree to 
            be bound by these Terms of Service. If you do not agree to these terms, please 
            do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            EditPDFs.app provides free, browser-based PDF editing tools including but not 
            limited to: signing PDFs, merging PDFs, splitting PDFs, compressing PDFs, and 
            rotating PDF pages.
          </p>
          <p>
            All PDF processing occurs locally in your web browser. Your files are not 
            uploaded to our servers.
          </p>

          <h2>3. Use of Service</h2>
          <p>You agree to use the Service only for lawful purposes. You shall not:</p>
          <ul>
            <li>Use the Service to process documents you do not have the right to modify</li>
            <li>Attempt to circumvent any security features of the Service</li>
            <li>Use the Service in any way that could damage or impair the Service</li>
            <li>Use automated systems to access the Service in a manner that exceeds reasonable use</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            The Service, including its design, features, and content (excluding your documents), 
            is owned by EditPDFs.app and is protected by copyright and other intellectual 
            property laws.
          </p>
          <p>
            You retain all rights to your documents. We claim no ownership or rights to any 
            files you process using the Service.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF 
            ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF 
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, or 
            completely secure. We do not warrant that the results obtained from the use 
            of the Service will be accurate or reliable.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL EDITPDFS.APP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, 
            LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR 
            USE OF THE SERVICE.
          </p>
          <p>
            Because all processing occurs in your browser, you are responsible for maintaining 
            backups of your original documents.
          </p>

          <h2>7. Advertising</h2>
          <p>
            The Service is supported by advertising. By using the Service, you agree to the 
            display of advertisements. We strive to keep advertising non-intrusive and 
            relevant.
          </p>

          <h2>8. Changes to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service at any time 
            without notice. We may also modify these Terms of Service at any time. Continued 
            use of the Service after changes constitutes acceptance of the modified terms.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior 
            notice, for conduct that we believe violates these Terms of Service or is harmful 
            to other users, us, or third parties.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the 
            laws of the United States, without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@editpdfs.app">legal@editpdfs.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
