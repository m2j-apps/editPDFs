import AdUnit from "@/components/AdUnit";

export default function PdfAccessibilityScreenReader() {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>PDF Accessibility: Making PDFs Screen Reader Friendly</h1>
      <p className="text-sm text-gray-500">Mike &middot; <time dateTime="2026-03-30T08:00:00-05:00">March 30, 2026</time> &middot; 9 min read</p>
      <p>
        Most PDFs look fine on screen — but for the roughly 7.6 million Americans who are blind or have
        low vision, a poorly structured PDF can be completely unreadable. Screen readers like JAWS, NVDA,
        and VoiceOver don&apos;t read what a document <em>looks like</em> — they read the underlying
        structure. If that structure is missing or wrong, users get a jumbled mess, or silence.
      </p>
      <p>
        The good news: making a PDF accessible isn&apos;t complicated once you know what to fix. This guide
        covers the key requirements, how to check your current PDFs, and how to correct the most common
        problems — without expensive software.
      </p>

      <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

      <h2>What Makes a PDF &quot;Accessible&quot;?</h2>
      <p>
        An accessible PDF is one that assistive technologies can read, navigate, and interact with in a
        meaningful way. The standard most organizations follow is <strong>WCAG 2.2 AA</strong> (Web Content
        Accessibility Guidelines) and the PDF/UA-1 specification (ISO 14289). In practice, an accessible
        PDF must have:
      </p>
      <ul>
        <li>
          <strong>Real, selectable text</strong> — not a scanned image of text. Screen readers can&apos;t
          read images.
        </li>
        <li>
          <strong>PDF tags</strong> — structural markers that tell assistive tech what each element is
          (heading, paragraph, list, table, figure, etc.).
        </li>
        <li>
          <strong>Logical reading order</strong> — the order content is read aloud should match the visual
          order on the page.
        </li>
        <li>
          <strong>Alt text on images</strong> — a text description of any image that conveys meaning.
          Decorative images should be marked as artifacts so they&apos;re skipped.
        </li>
        <li>
          <strong>Proper heading structure</strong> — H1, H2, H3 etc. used correctly, so users can skim
          by jumping between headings.
        </li>
        <li>
          <strong>Accessible form fields</strong> — if the PDF has forms, every field needs a label.
        </li>
        <li>
          <strong>Sufficient color contrast</strong> — text should have at least a 4.5:1 contrast ratio
          against its background.
        </li>
        <li>
          <strong>Document language set</strong> — so screen readers use the correct pronunciation rules.
        </li>
        <li>
          <strong>A document title</strong> — the document properties should have a meaningful title, not
          just the filename.
        </li>
      </ul>
      <p>
        Miss any of these, and the experience for a screen reader user ranges from frustrating to
        completely inaccessible.
      </p>

      <h2>Step 1: Check Whether Your PDF Has Real Text</h2>
      <p>
        The first thing to check is whether your PDF contains actual text or just images. This is
        especially common with scanned documents.
      </p>
      <p>Here&apos;s a quick test:</p>
      <ol>
        <li>Open the PDF in any PDF viewer.</li>
        <li>Try to click and drag to select some text on the page.</li>
        <li>
          If you can highlight individual words, you have real text. If the entire page gets selected as
          a single image, the PDF is image-only.
        </li>
      </ol>
      <p>
        <strong>If your PDF is image-only:</strong> You need to run OCR (Optical Character Recognition)
        first to extract the text layer. See our guide on{" "}
        <a href="/blog/how-to-make-pdf-searchable">how to make a PDF searchable with OCR</a> to fix this
        before doing anything else. Without real text, no accessibility fix will work.
      </p>

      <h2>Step 2: Check for PDF Tags</h2>
      <p>
        PDF tags are invisible structural markers embedded in the file. They&apos;re what screen readers
        actually interpret. A PDF without tags is like a webpage with no HTML — the content might be
        there, but without structure it&apos;s impossible to navigate.
      </p>
      <p>To check if your PDF is tagged:</p>
      <ul>
        <li>
          <strong>In Adobe Acrobat Reader:</strong> Go to File → Properties → Description tab. Look for
          &quot;Tagged PDF: Yes&quot; in the Advanced section.
        </li>
        <li>
          <strong>In a browser:</strong> Open the PDF, right-click → &quot;Open in PDF viewer&quot;. If
          headings, lists, and paragraphs are clearly structured in the accessibility tree, it&apos;s
          likely tagged.
        </li>
        <li>
          <strong>Quick test:</strong> If you paste the PDF text into a text editor and it comes out in
          the correct reading order (not scrambled columns), the tagging is likely reasonable.
        </li>
      </ul>

      <h2>Step 3: Fix the Most Common Accessibility Issues</h2>

      <h3>Problem: No Tags (Untagged PDF)</h3>
      <p>
        If a PDF was created by printing to PDF from a browser or old application, it often arrives
        untagged. The fix depends on your source:
      </p>
      <ul>
        <li>
          <strong>Microsoft Word / PowerPoint:</strong> Re-export the original document using File →
          Save As → PDF, and check the &quot;Document structure tags for accessibility&quot; option in
          the export settings. This is by far the most reliable method — fix it at the source.
        </li>
        <li>
          <strong>Google Docs:</strong> Use File → Download → PDF Document. Google Docs exports
          reasonably tagged PDFs for simple documents.
        </li>
        <li>
          <strong>Adobe InDesign:</strong> Export with &quot;Tagged PDF&quot; enabled and map your
          paragraph styles to heading levels before exporting.
        </li>
        <li>
          <strong>Scanned documents:</strong> Run OCR first, then add tags — or use a remediation
          service for large volumes.
        </li>
      </ul>

      <h3>Problem: Wrong Reading Order</h3>
      <p>
        Multi-column documents, sidebars, and complex layouts often have a scrambled reading order in the
        PDF tag tree. The visual layout might look correct, but a screen reader reads columns left-to-right
        across the page instead of down each column.
      </p>
      <p>
        For example: imagine a two-column newsletter where column 1 discusses topic A and column 2
        discusses topic B. A screen reader with a bad reading order might read: &quot;Topic A headline,
        Topic B headline, first sentence of A, first sentence of B...&quot; — completely incoherent.
      </p>
      <p>
        Fixing this typically requires Adobe Acrobat Pro&apos;s Reading Order tool or a PDF accessibility
        remediation tool. In Acrobat Pro: View → Show/Hide → Navigation Panels → Reading Order, then drag
        the tagged elements into the correct sequence.
      </p>

      <h3>Problem: Images Without Alt Text</h3>
      <p>
        Any image that conveys meaning — a chart, photo, diagram, logo — needs a text description so
        screen reader users know what it shows. Purely decorative images (divider lines, background
        textures) should be tagged as &quot;Artifact&quot; so the screen reader skips them.
      </p>
      <p>
        Good alt text describes what the image communicates, not just what it looks like. Instead of
        &quot;Bar graph image,&quot; write &quot;Bar graph showing sales growth from $1.2M in Q1 to
        $1.8M in Q4 2025.&quot;
      </p>

      <h3>Problem: Form Fields Without Labels</h3>
      <p>
        PDF forms are a frequent accessibility failure. A form field that visually shows &quot;First
        Name&quot; next to it will read as a blank input to a screen reader if the label isn&apos;t
        programmatically attached to the field.
      </p>
      <p>
        When creating forms, use{" "}
        <a href="/blog/how-to-create-fillable-pdf-forms">proper form-building tools</a> that attach
        labels correctly. If you&apos;re fixing an existing PDF, Acrobat Pro lets you edit field
        properties to add tooltip text, which functions as the accessible label.
      </p>

      <h3>Problem: Missing Document Title</h3>
      <p>
        When a screen reader user opens a PDF, the first thing announced is the document title. If this
        is empty, they hear the filename — often something unhelpful like
        &quot;Doc_v3_FINAL_PRINT.pdf.&quot;
      </p>
      <p>
        Set a meaningful title in the document properties. In most PDF creation tools, this is under
        File → Properties or Document Settings before export.
      </p>

      <AdUnit slot="MID_ARTICLE" format="rectangle" className="my-8" />

      <h2>Step 4: Test Your PDF with a Screen Reader</h2>
      <p>
        The only way to truly know if a PDF is accessible is to test it with actual assistive technology.
        Here are free options:
      </p>
      <ul>
        <li>
          <strong>NVDA (Windows, free):</strong>{" "}
          <a href="https://www.nvaccess.org/download/" rel="noopener noreferrer" target="_blank">
            Download from nvaccess.org
          </a>
          . Open your PDF in a browser or Adobe Reader and press Ctrl+Home, then let NVDA read through
          it. Press H to jump between headings.
        </li>
        <li>
          <strong>VoiceOver (Mac / iPhone, built-in):</strong> Enable VoiceOver in System
          Settings → Accessibility. Open the PDF in Preview and use VoiceOver to navigate.
        </li>
        <li>
          <strong>TalkBack (Android, built-in):</strong> Enable TalkBack and open the PDF in Google
          Drive or Chrome.
        </li>
      </ul>
      <p>
        When testing, ask yourself: Does reading order make sense? Can you navigate by headings? Are
        images described? Can you fill out forms without visual reference?
      </p>

      <h2>Step 5: Use an Automated Checker</h2>
      <p>
        Manual testing is important, but automated checkers catch structural issues quickly:
      </p>
      <ul>
        <li>
          <strong>PAC 2024 (PDF Accessibility Checker)</strong> — free tool that checks against
          PDF/UA-1 and WCAG 2.2 criteria. Reports specific failures with page numbers.
        </li>
        <li>
          <strong>Adobe Acrobat Pro Accessibility Check</strong> — built-in checker under Tools →
          Accessibility → Full Check.
        </li>
        <li>
          <strong>WAVE</strong> — if your PDF is embedded on a webpage, WAVE can flag accessibility
          issues in the surrounding context.
        </li>
      </ul>
      <p>
        Run automated checks first to get a baseline, then do manual screen reader testing to catch
        issues automated tools miss (like alt text that technically exists but is completely
        uninformative).
      </p>

      <h2>Quick Checklist Before Publishing a PDF</h2>
      <ul>
        <li>☐ Text is real and selectable (not an image)</li>
        <li>☐ Document is tagged (Tagged PDF: Yes)</li>
        <li>☐ Heading levels (H1, H2, H3) are used correctly</li>
        <li>☐ Reading order is logical, top to bottom</li>
        <li>☐ All meaningful images have alt text</li>
        <li>☐ Decorative images are marked as artifacts</li>
        <li>☐ Form fields have descriptive labels</li>
        <li>☐ Document language is set</li>
        <li>☐ Document title is set in properties</li>
        <li>☐ Tested with a screen reader</li>
        <li>☐ Passed automated accessibility check</li>
      </ul>

      <h2>Legal Requirements: Who Needs to Worry?</h2>
      <p>
        In the United States, PDF accessibility requirements apply broadly:
      </p>
      <ul>
        <li>
          <strong>Federal agencies and contractors</strong> — Section 508 of the Rehabilitation Act
          requires all electronic documents to be accessible. This was updated in 2017 to align with
          WCAG 2.0 Level AA.
        </li>
        <li>
          <strong>State and local governments</strong> — Title II of the ADA now explicitly covers
          web content and documents, following 2024 DOJ regulations that cite WCAG 2.1 AA.
        </li>
        <li>
          <strong>Private businesses</strong> — Title III of the ADA covers places of public
          accommodation, which courts have increasingly applied to websites and documents.
        </li>
        <li>
          <strong>Educational institutions</strong> — Section 504 and Title II of the ADA require
          accessible course materials.
        </li>
      </ul>
      <p>
        Even if none of these apply to you directly, accessible PDFs rank better in search engines
        (Google can index tagged content more accurately), load more reliably on all devices, and
        simply work better for everyone — including users on mobile, low-bandwidth connections, or who
        just prefer keyboard navigation.
      </p>

      <h2>The Easiest Fix: Start With an Accessible Source</h2>
      <p>
        Retrofitting accessibility into existing PDFs is time-consuming. The most efficient approach is
        to build accessibility in from the start:
      </p>
      <ol>
        <li>Use heading styles in Word, Google Docs, or InDesign (not just big bold text).</li>
        <li>Add alt text to images before exporting.</li>
        <li>
          Export to PDF using the accessibility-preserving export option (not &quot;Print to PDF&quot;).
        </li>
        <li>Run a quick automated check before distributing.</li>
      </ol>
      <p>
        Five minutes of attention during creation saves hours of remediation later.
      </p>

      <h2>Need to Edit an Existing PDF?</h2>
      <p>
        If you&apos;re working with PDFs that someone else created —{" "}
        <a href="/">EditPDFs.app</a> lets you edit text, add annotations, reorganize pages, and more,
        directly in your browser. No software to install, no account required. For PDFs that need OCR
        to become searchable, the{" "}
        <a href="/blog/how-to-make-pdf-searchable">OCR guide here walks through the process</a>.
      </p>
      <p>
        Accessible PDFs aren&apos;t just the right thing to do — they&apos;re better documents, full
        stop. Clear structure, searchable text, and logical organization make any PDF easier to use for
        everyone.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What makes a PDF accessible?</h3>
      <p>
        An accessible PDF has real, selectable text (not a scanned image), structural tags that identify
        headings, lists, and tables, a logical reading order, alt text on meaningful images, labeled form
        fields, a set document language, and a meaningful title. Together these let assistive technology
        read and navigate the document the way a sighted user reads the layout.
      </p>

      <h3>Do screen readers read any PDF?</h3>
      <p>
        No. A screen reader interprets the PDF&apos;s underlying tag structure, not its visual appearance.
        An untagged or image-only PDF may read back as silence, gibberish, or a scrambled jumble — even
        though it looks perfectly normal on screen.
      </p>

      <h3>What are PDF tags, and why do they matter?</h3>
      <p>
        Tags are invisible structural markers embedded in the file — the PDF equivalent of HTML. They tell
        assistive tech what each element is (heading, paragraph, list, figure, table) and the order to read
        it in. Without tags, a screen reader has no way to navigate the content meaningfully.
      </p>

      <h3>Is a scanned PDF accessible?</h3>
      <p>
        Not on its own — a scan is just an image of a page, so there&apos;s no text for a screen reader to
        read. You first need to run OCR to add a real text layer, then tag the document. See our{" "}
        <a href="/blog/how-to-make-pdf-searchable">guide to making a PDF searchable with OCR</a> for that
        first step.
      </p>

      <h3>How do I add alt text to images in a PDF?</h3>
      <p>
        The most reliable way is to add alt text in the source document (Word, Google Docs, InDesign)
        before exporting to a tagged PDF. To fix an existing PDF, Adobe Acrobat Pro lets you edit a
        figure&apos;s alternate text in the tag tree. Describe what the image communicates — &quot;Bar
        graph showing sales rising from $1.2M to $1.8M&quot; — not just &quot;chart.&quot;
      </p>

      <h3>How do I check whether my PDF meets PDF/UA, WCAG, or Section 508?</h3>
      <p>
        Start with a free automated checker like PAC 2024, which tests against PDF/UA-1 and WCAG 2.2 and
        lists failures by page. Then confirm with a real screen reader, since automated tools can&apos;t
        judge whether alt text or reading order actually makes sense. Section 508 and the ADA generally
        point back to WCAG AA, so passing WCAG is the practical target.
      </p>

      <h3>Does making a PDF accessible help with SEO?</h3>
      <p>
        Yes. The same tags and real text that screen readers rely on also let search engines index the
        document&apos;s structure and content more accurately. Accessible PDFs tend to be cleaner, more
        portable, and easier for every reader — which is good for both rankings and users.
      </p>
    </article>
  );
}
