import DocSection from './DocSection';
import LlcName from './LlcName';

const SITE_URL = 'https://thebarbellballerina.com';

export default function TermsArticle() {
  return (
    <article className="text-left min-w-0">
      <div className="mb-12 min-w-0 max-w-full rounded-2xl border border-neutral-200/90 bg-white px-6 py-9 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:mb-14 md:px-10 md:py-11 lg:px-12 lg:py-12">
        <div className="space-y-5 break-words font-serif text-[17px] leading-[1.75] text-[#1a1a1a] [&_a]:break-all [&_a]:font-inherit [&_a]:text-inherit [&_a]:no-underline hover:[&_a]:opacity-80">
          <p>
            Please read these Terms &amp; Conditions carefully and in their entirety before using{' '}
            <a href={SITE_URL}>https://thebarbellballerina.com</a> (hereinafter referred to as the &ldquo;Site&rdquo;). The
            Site and its content are owned by <LlcName />.
          </p>

          <p>
            Purpose: These Terms &amp; Conditions are here to clearly explain, outline,
            and layout the rules, terms, and conditions of using, viewing, and/or browsing the Site and/or purchasing or
            downloading any course, program, service, or product offered on or by us or the Site.
          </p>

          <p>
            By using the Site in any capacity, you voluntarily agree to
            these Terms &amp; Conditions. You agree that you have read, understood, and consented to these Terms &amp;
            Conditions. If you have any questions, please contact us at{' '}
            <a href="mailto:support@thebarbellballerina.com">support@thebarbellballerina.com</a>.
          </p>
          <p>
            You must be at least 18 years old and be able to consent to these Terms &amp; Conditions. If you are under the age
            of 18, or you do not agree with these Terms &amp; Conditions as stated herein, please STOP now and do not use this
            Site or its content.
          </p>
          <p>
            These Terms &amp; Conditions contain an Arbitration Clause and require you to dispute or resolve any claim with us
            through Arbitration. By agreeing to these Terms &amp; Conditions, you agree to the Arbitration Clause and voluntarily waive your right to a jury trial.
          </p>
        </div>
      </div>

      <DocSection id="terms-definitions" index={1} title="Definitions">
        <p>
          &ldquo;Company&rdquo;, &ldquo;We&rdquo;, &ldquo;I&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo; means{' '}
          <LlcName /> and our website, <a href={SITE_URL}>https://thebarbellballerina.com</a>
        </p>
        <p>
          &ldquo;Content&rdquo; means any and all written, visual, video, or audio information contained on the Site,
          including, but not limited to, any and all emails received from Lili Pfeifer, <LlcName />, and/or{' '}
          <a href={SITE_URL}>https://thebarbellballerina.com</a>, and any and all written or downloadable material
          purchased, viewed, or otherwise offered by <LlcName /> and/or on{' '}
          <a href={SITE_URL}>https://thebarbellballerina.com</a>, including, but not limited to, blog posts, graphics,
          newsletters, designs, documents, information, templates and materials.
        </p>
        <p>
          &ldquo;Personal Information&rdquo; means information that can be used on its own or in conjunction with other
          information to identify, contact, or locate a person, or to identify an individual in context. For example,
          personal information includes, among other things, your name, address, email address, telephone number, etc.
        </p>
        <p>
          &ldquo;Site, Courses, Services, and/or Products&rdquo; means <a href={SITE_URL}>https://thebarbellballerina.com</a>
          , Content (as defined herein), email list/newsletters, social media posts, blog posts, courses, coaching services,
          guides, eBooks, forms, worksheets, workbooks, webinars, website materials, programs, and/or templates available on
          the Site.
        </p>
        <p>
          &ldquo;Site&rdquo; means <a href={SITE_URL}>https://thebarbellballerina.com</a> and any and all of its
          associated pages, tabs, landing pages, forms, or sub-pages.
        </p>
        <p>&ldquo;You&rdquo; or &ldquo;Your&rdquo; means the user, customer, or viewer of the Site.</p>
      </DocSection>

      <DocSection id="terms-consent" index={2} title="Consent">
        <p>
          By using the Site and/or making any Purchase, you implicitly and voluntarily agree to act in accordance with, and
          abide by, these Terms &amp; Conditions.
        </p>
        <p>
          By using the Site and/or making any Purchase, you represent and warrant that you are at least 18 years-old. Any
          use of, or access to, the Site and its Content by anyone under the age of 18 is unauthorized and in direct
          violation of these Terms &amp; Conditions.
        </p>
      </DocSection>

      <DocSection id="terms-site-rules" index={3} title="Site Rules">
        <p>By using the Site and/or making any Purchase, you hereby agree &amp; consent not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Abuse or harass any person through or on the Site.</li>
          <li>
            Post or transmit obscene, offensive, libelous, defamatory, pornographic, or abusive content, as well as content
            that infringes our intellectual property rights or those of another person, website, or company.
          </li>
          <li>
            Use the Site in any way or for any purpose which violates any law of the United States and the jurisdiction in
            which you use the Site.
          </li>
          <li>Post or transmit any &ldquo;spam&rdquo; or unwanted, unsolicited content.</li>
          <li>Post copyrighted materials, photographs, or content which do not belong to you.</li>
          <li>
            Promote or sell your own content, services, or products through the Site, or the content, services, or products
            of anyone else other than us.
          </li>
          <li>
            Copy, download, share, post, or transmit our intellectual property in any way that infringes on our
            intellectual property rights.
          </li>
        </ul>
      </DocSection>

      <DocSection id="terms-disclaimer" index={4} title="Disclaimer">
        <p>
          By using the Site, you understand that we are a National Academy of Sports Medicine Certified Personal Trainer and
          Certified Exercise Specialist. We are not a nutritionist, therapist, or licensed medical professional, and
          therefore you need to discuss and clear any and all changes to your lifestyle, food intake, exercise regimen, or
          medical treatment with your physician before implementing changes or habits suggested by us. You must discuss any
          and all changes to your diet, exercise regimen, supplements, medications, or lifestyle with your physician or
          qualified medical professional before implementing any suggested or offered changes, additions, or alterations to
          your lifestyle. Our Content is for informational and educational purposes only, and is based on our personal
          experience.
        </p>
      </DocSection>

      <DocSection id="terms-your-consent" index={5} title="Your Consent to These Terms & Conditions">
        <p>
          By using this Site, or Purchasing or Downloading from our Site, Courses, Services, and/or Products, you implicitly
          and voluntarily agree to these Terms &amp; Conditions as stated herein.
        </p>
      </DocSection>

      <DocSection id="terms-changes" index={6} title="Changes To These Terms & Conditions">
        <p>
          We reserve the right to change, amend, or otherwise alter these Terms &amp; Conditions at any time without notice
          to you. When changes are made to these Terms &amp; Conditions, we will update the &ldquo;Updated on&rdquo; date at
          the bottom of this page. If you do not agree with these Terms &amp; Conditions, please do NOT use our Site, read
          or implement its Content, or Purchase or Download anything from us.
        </p>
      </DocSection>

      <DocSection id="terms-third-party" index={7} title="Links to Third-Party or External Websites">
        <p>
          The Site may contain or include website URL links to third-party or external websites. Typically, these URL links
          are provided so that you may directly access a site that contains relevant information. Please note we are not
          liable for any of the information contained on or within the third-party or external websites. We are not
          responsible for the way they handle your personal information, whether they have a privacy policy, or any
          information you provide to them by visiting their website. You are responsible for reading and agreeing to, or
          expressing disagreement with, the external website&apos;s privacy policy or terms &amp; conditions.
        </p>
      </DocSection>

      <DocSection id="terms-ip" index={8} title="Intellectual Property Ownership">
        <p>
          The Site and its Content are intellectual property solely owned by <LlcName />. The Site and its
          Content are protected by United States copyright and trademark laws, as well as state intellectual property laws.
          Any violations of this term, and all terms contained herein, will be legally pursued to the fullest extent
          permitted by law.
        </p>
      </DocSection>

      <DocSection id="terms-limited-license" index={9} title="Our Limited License to You">
        <p>
          If you view, access, or Purchase the Site, Courses, Services, and/or Products, you are considered our Limited
          Licensee (&ldquo;Licensee&rdquo;). As a Licensee, you agree and understand that the Site, Courses, Services, and/or
          Products have been written, created, drafted, invented, and developed by us after a significant investment of
          time, money, education, hard work, and brainpower. The Site, Courses, Services, and/or Products are extremely
          valuable to us, both professionally and personally, and we take the protection of our Site, Courses, Services,
          and/or Products very seriously.
        </p>
        <p>
          You may not use the Site, Courses, Services, and/or Products in any manner that is unauthorized, improper,
          against these Terms &amp; Conditions, or which violate U.S. intellectual property laws unless authorized by us in
          writing beforehand.
        </p>
      </DocSection>

      <DocSection id="terms-license-to-us" index={10} title="Your License to Us">
        <p>
          By commenting on the Site, or submitting documents to <LlcName /> via contact form, email, or social
          media, you represent that you are the lawful owner of said documents, statements, and/or the information they
          contain. You grant us a license to use your comments or submissions in any way we see fit, as it relates to our
          business purposes.
        </p>
      </DocSection>

      <DocSection id="terms-purchase" index={11} title="Purchase & Access Terms">
        <p>
          During the course of your use, Purchase, and/or Download from the Site, Courses, Services, and/or Products, you
          agree and understand that you cannot distribute, copy, forward, and/or share information prohibited by these Terms
          &amp; Conditions. You also agree and understand that you are to take all necessary steps to make sure that you do
          not inadvertently share or distribute said materials, including, but not limited to, protecting your password (if
          any) to the Site to access your Purchase or Download. Any violations of these Terms &amp; Conditions will be
          legally pursued to the fullest extent permitted by law.
        </p>
      </DocSection>

      <DocSection id="terms-personal-use" index={12} title="Personal Use Only & Prohibited Conduct">
        <p>
          All memberships, programs, workouts, videos, educational materials, and app content are licensed for individual, personal use only. By accessing the Site, App, Courses, Services, and/or Products, you agree that you will not share login credentials, provide account access to others, screen record, reproduce, copy, download, distribute, publish, repurpose, teach from, sell, sublicense, or recreate any portion of the content for commercial or non-commercial use without prior written consent from <LlcName />.
        </p>
        <p>You may not use the content to create competing products, training programs, memberships, courses, coaching services, or educational materials. Unauthorized use, sharing, duplication, or distribution of any materials may result in immediate termination of access without refund and may be subject to legal action.</p>
      </DocSection>

      <DocSection id="terms-sharing" index={13} title="Sharing the Site & Its Content">
        <p>
          You must request and receive written permission by email{' '}
          <a href="mailto:support@thebarbellballerina.com">support@thebarbellballerina.com</a> before sharing our Site and its
          Content for commercial purposes. You may share the site for personal purposes, but we ask that you link directly
          to the Site. You are required to give us and the Site credit by linking to the Site and its Content if you share
          it on social media or your own website, including all photographs. Since the Site and its Content are not yours,
          you may not in any way imply or represent that the Site or its Content are yours or that you in any way created,
          caused, or contributed to the Site or its Content. You may not make any claims that you are in any way associated
          with <LlcName />.
        </p>
      </DocSection>

      <DocSection id="terms-no-claims" index={14} title="No Claims Made Regarding Results">
        <p>
          Any and all current or past-client testimonials, statements, or examples used by us are simply that: examples.
          They are not guarantees that you will also experience or receive the same results. Each client and his/her
          circumstances are unique and nothing shall be interpreted as a guarantee that you will experience the same results
          as another client of ours.
        </p>
      </DocSection>

      <DocSection id="terms-no-warranties" index={15} title="No Warranties, Guarantees, or Representations">
        <p>
          We do not offer any warranties, of any variety, regarding the Site, Courses, Services, and/or Products, and/or your
          Purchase or Download, in any way. The Site, Courses, Services, and/or Products, and/or your Purchases or Downloads
          are offered &ldquo;AS IS&rdquo; and without warranties of any kind, neither express nor implied, to the extent
          permitted by law.
        </p>
      </DocSection>

      <DocSection id="terms-release" index={16} title="Your Release of Us">
        <p>
          By using the Site or Purchasing, Downloading, or using <LlcName />&apos;s Courses, Services, and
          Products, you agree to release, forgive, and forever discharge <LlcName />, its subsidiaries,
          employees, agents, contractors, subcontractors, and affiliates from any and all claims, suits, actions, charges,
          demands, liabilities, damages, judgments, and/or costs, whether known or unknown, both legal and equitable in any
          manner.
        </p>
      </DocSection>

      <DocSection id="terms-errors" index={17} title="Errors & Omissions">
        <p>
          Every effort is made to provide up-to-date accurate information both on the Site and through our services.
          However, due to the complexity of the issues we cover, <LlcName /> does not and cannot warrant,
          represent, or guarantee that such information is free from errors, accurate, or up-to-date at all times. You should
          do your due diligence, research, or consult with a professional to ensure that all information you receive, act
          upon, or rely on from this Site and/or from our services is accurate and up-to-date.
        </p>
      </DocSection>

      <DocSection id="terms-refund" index={18} title="Our Refund Policy">
        <p>
          We will do everything within our ability (and within reason) to ensure your satisfaction. Refunds will not be
          issued for coaching services already rendered or products already purchased. If you have any questions or concerns,
          or if there is anything we can do to make your experience a more pleasant one, please email Lili at{' '}
          <a href="mailto:support@thebarbellballerina.com">support@thebarbellballerina.com</a>.
        </p>
      </DocSection>

      <DocSection id="terms-arbitration" index={19} title="Arbitration Clause">
        <p>
          If you have any complaint or should any issue arise in the use of the Site or <LlcName />&apos;s
          Courses, Services, and/or Products, please contact us directly first by emailing Lili at{' '}
          <a href="mailto:support@thebarbellballerina.com">support@thebarbellballerina.com</a>.
        </p>
        <p>
          However, if we are unable to amicably resolve your dispute in that manner, you agree that you and{' '}
          <LlcName /> shall submit your dispute to binding arbitration with the American Arbitration Association, before an
          arbitrator that is mutually agreed upon, in accordance with the American Arbitration Association&apos;s
          (&ldquo;AAA&rdquo;) rules.
        </p>
        <p>
          By agreeing to this term, you hereby agree and understand that you&apos;re waiving your right to a jury trial in
          court, which would otherwise be available to you if not for this Arbitration Clause. Should any arbitration hearing
          need to be held, it shall be held within 20 miles of Minneapolis, Minnesota.
        </p>
        <p>
          If the arbitrator issues an award and a judgment is made, the judgment will be binding and will be entered in court
          in the State of Minnesota. The only award that can be issued to you is a refund of any payment made to{' '}
          <LlcName /> for the applicable Product or Service. You are not permitted to seek additional damages,
          including consequential or punitive damages.
        </p>
      </DocSection>

      <DocSection id="terms-governing-law" index={20} title="Consent to Governing Law">
        <p>
          These Terms &amp; Conditions, and any dispute arising out of it, shall be governed by the laws of the State of
          Minnesota.
        </p>
      </DocSection>

      <DocSection id="terms-jurisdiction" index={21} title="Consent to Jurisdiction">
        <p>
          You hereby irrevocably consent to the exclusive jurisdiction and venue of any Federal Court in the United States
          District Court for the District of Minnesota or a state court located within the State of Minnesota in connection
          with any matter arising out of these Terms &amp; Conditions, or as a result of your use, Download, or Purchase from
          the Site, Courses, Services, and/or Products.
        </p>
      </DocSection>

      <DocSection id="terms-service" index={22} title="Consent to Service">
        <p>
          You hereby irrevocably agree that process may be served on you in any manner authorized by the Laws of the State of
          Minnesota for such persons, and you waive any objection which you might otherwise have to service of process under
          the laws of the State of Minnesota.
        </p>
      </DocSection>

      <DocSection id="terms-payment" index={23} title="Payment & Purchases">
        <p>
          When you Purchase or Download one of our Courses, Services, and Products from us or the Site, you may pay via
          PayPal, Afterpay, or credit card. By doing so, you give <LlcName /> permission to automatically
          charge your credit card for payment. You will receive an electronic receipt following your Purchase, which you
          should retain for your records.
        </p>
        <p>
          If you elect the installment or &ldquo;pay over time&rdquo; option at checkout, you agree that{' '}
          <LlcName /> has permission to automatically charge, without checking with you before each installment
          transaction is charged, the amount due on the date(s) agreed upon at checkout.
        </p>
        <p>
          If your payment method fails or is otherwise declined, you will be removed from, or canceled from having access
          to, our Courses, Services, and Products. Please note, in the event your payment method is declined at any time, you
          are still responsible for the full cost of your Purchase.
        </p>
        <p>
          We do not accept any chargeback threats (real or threatened). If any chargebacks are placed on a Purchase or
          Download of our Courses, Services, and Products, we will report said incident to the major credit reporting
          agencies. Doing so could have a negative impact on your credit report and/or credit score. Should we need to do so
          and you would like to have this report removed from your credit report, please contact us to arrange for payment
          owed. Once payment owed is received, we will make the appropriate reports to the credit agencies.
        </p>
        <p>
          Payment processing companies may have different privacy policies and practices than we do. We are not responsible
          for the policies of the payment processing companies. As with any online purchase, there are circumstances beyond
          our control which may compromise your credit card or payment method. We are not liable or responsible for any of
          those circumstances.
        </p>
        <p>
          You hereby release us from any and all damages related to your payment or use of our payment processing companies
          in which you incur and further agree not to assert any claims against us or them for any damages which arise from
          your Purchase or use of our Site and its Content.
        </p>
      </DocSection>

      <DocSection id="terms-liability" index={24} title="Limitation of Liability">
        <p>
          <LlcName /> is not responsible or liable in any way for any and all damages you receive directly or
          indirectly from your use, Purchase, or Download from our Site, Courses, Services, and/or Products. We do not
          assume liability for damages, injuries, harm, death, misuse of (or failure to properly use) information or
          documents, due to any act, or failure to act, by you. Notwithstanding anything to the contrary contained herein,
          your sole and exclusive remedy for negligence, failure to perform, or breach by us shall be a refund of the amount
          paid for such service or product. IN NO EVENT SHALL WE BE LIABLE TO YOU FOR ANY INDIRECT, SPECIAL, EXEMPLARY, OR
          CONSEQUENTIAL DAMAGES.
        </p>
      </DocSection>

      <DocSection id="terms-indemnification" index={25} title="Defense & Indemnification">
        <p>
          You shall, at all times, indemnify, defend, and hold harmless <LlcName />, Lili Pfeifer, and all of
          our shareholders, officers, members, affiliates, contractors, subcontractors, directors, assignees, employees, and
          licensees from and against all losses, damages, injuries, delays, deaths, lost profits, and expenses arising out
          of any proceeding (a) brought by either a third-party or by <LlcName /> and Lili Pfeifer (b) arising
          out of your breach of your obligations, representations, warranties, or covenants under these Terms &amp;
          Conditions; and (c) arising out of any alleged breach or negligence said to have been committed by us.
        </p>
      </DocSection>

      <DocSection id="terms-termination" index={26} title="Termination of Your Use">
        <p>
          At our sole discretion, we are permitted to terminate your use or access to the Site, Courses, Services, and/or
          Products, and Purchases/Downloads if you abuse, violate, or breach any of these Terms &amp; Conditions, or any
          other terms to which you have agreed to.
        </p>
      </DocSection>

      <DocSection id="terms-entire" index={27} title="Entire Agreement">
        <p>
          These Terms &amp; Conditions constitute the entire agreement between you and us with respect to the Site, Courses,
          Services, and/or Products, and they supersede all prior or contemporaneous communications and proposals, whether
          electronic, oral, or written, between you and us with respect to the Site, Courses, Services, and/or Products.
        </p>
      </DocSection>

      <DocSection id="terms-severability" index={28} title="Severability">
        <p>
          The provisions of these Terms &amp; Conditions are severable, and the invalidity or unenforceability of any
          provision shall not affect the validity and enforceability of any other provision herein. If any paragraph,
          section, subsection, sentence, or clause of these Terms &amp; Conditions are rendered illegal, invalid, or
          unenforceable, such illegality, invalidity, or unenforceability shall have no effect on these Terms &amp;
          Conditions as a whole or on any other paragraph, section, subsection, sentence, or clause herein.
        </p>
      </DocSection>

      <DocSection id="terms-contact" index={29} title="Contact">
        <p>If you have any questions or concerns regarding these Terms &amp; Conditions, you may contact us using the following information:</p>
        <p>
          Website: <a href={SITE_URL}>https://thebarbellballerina.com</a>
          <br />
          Email: Lili at <a href="mailto:support@thebarbellballerina.com">support@thebarbellballerina.com</a>
        </p>
      </DocSection>

      <div className="mt-14 md:mt-16 rounded-md bg-[#0A0A0A] text-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#BB8966] mb-3">Document</p>
        <p className="font-serif text-lg md:text-xl mb-3">Last updated · May 19, 2026</p>
        <p className="break-words text-sm text-white/85 font-sans leading-relaxed [&_a]:break-all">
          Questions? Email{' '}
          <a href="mailto:support@thebarbellballerina.com" className="text-[#C9A07E] underline underline-offset-2">
            support@thebarbellballerina.com
          </a>
        </p>
      </div>
    </article>
  );
}
