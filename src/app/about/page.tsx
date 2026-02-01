export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About EditPDFs.app
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">
          <h2>Why We Built This</h2>
          <p>
            We were tired of &quot;free&quot; PDF tools that aren&apos;t actually free. You know 
            the drill: upload your document, make your edits, click download... and 
            then hit a paywall asking for $10/month.
          </p>
          <p>
            That&apos;s a bait-and-switch, and it&apos;s frustrating.
          </p>
          <p>
            So we built EditPDFs.app — a collection of PDF tools that are <strong>actually 
            free</strong>. No premium tier. No watermarks. No limits on file sizes or 
            number of operations. Just tools that work.
          </p>

          <h2>How We Stay Free</h2>
          <p>
            This site is supported by advertising. That&apos;s it. We show some ads, and 
            in exchange, you get unlimited access to all our tools without paying a cent.
          </p>
          <p>
            We believe this is a fair trade. You see a few ads; you save money on 
            software you&apos;d only use occasionally anyway.
          </p>

          <h2>Privacy First</h2>
          <p>
            Here&apos;s what makes us different from most online PDF tools: <strong>your 
            files never leave your browser</strong>.
          </p>
          <p>
            When you use EditPDFs.app, all the PDF processing happens locally on your 
            device using JavaScript. Your files are never uploaded to any server. We 
            literally cannot see your documents.
          </p>
          <p>
            This isn&apos;t just a privacy feature — it also means faster processing (no 
            upload/download wait) and the ability to work offline once the page loads.
          </p>

          <h2>The Tools</h2>
          <ul>
            <li><strong>Sign PDF</strong> — Add signatures by drawing, typing, or uploading an image</li>
            <li><strong>Merge PDF</strong> — Combine multiple PDFs into one document</li>
            <li><strong>Split PDF</strong> — Extract specific pages from a PDF</li>
            <li><strong>Compress PDF</strong> — Reduce file size for easier sharing</li>
            <li><strong>Rotate PDF</strong> — Fix wrongly oriented pages</li>
          </ul>
          <p>
            More tools coming soon. If there&apos;s something you need that we don&apos;t have 
            yet, let us know!
          </p>

          <h2>Open Source</h2>
          <p>
            We use open-source libraries to power our tools, including{" "}
            <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer">
              pdf-lib
            </a>{" "}
            for PDF manipulation. We believe in giving back to the community that 
            makes tools like this possible.
          </p>

          <h2>Contact</h2>
          <p>
            Questions, feedback, or feature requests? We&apos;d love to hear from you.
            Reach out at <a href="mailto:hello@editpdfs.app">hello@editpdfs.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
