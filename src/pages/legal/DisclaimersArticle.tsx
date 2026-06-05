import { Link } from 'react-router-dom';
import DocSection from './DocSection';
import LlcName from './LlcName';

const SUPPORT_EMAIL = 'support@thebarbellballerina.com';

export default function DisclaimersArticle() {
  return (
    <article className="text-left min-w-0" data-legal-doc="disclaimers">
      <div className="mb-12 min-w-0 max-w-full rounded-2xl border border-neutral-200/90 bg-white px-6 py-9 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:mb-14 md:px-10 md:py-11 lg:px-12 lg:py-12">
        <div className="space-y-4 break-words text-[15px] leading-[1.65] text-neutral-700 font-serif [&_a]:break-all [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-1">
          <p>
            Please read this Disclaimer carefully and in its entirety before using thebarbellballerina.com and app
            (hereinafter referred to as the &ldquo;Site&rdquo;). The Site and its content are owned by <LlcName />.
          </p>
          <p>
            <span className="font-bold">PURPOSE:</span> This Disclaimer is here to clearly explain, outline, and layout who
            we are, what we do, and what we don&apos;t do before you use, view, and/or browse the Site and/or purchase or
            Download any course, program, service, or product offered by us. In short, the purpose of the Site is to provide
            information &amp; education on optimizing athletic performance for dancers.
          </p>
          <p>
            <span className="font-bold">IMPORTANT NOTE:</span> By using the Site in any capacity, you voluntarily agree to
            this Disclaimer. You agree that you have read (or had the opportunity to read and chose not to), understood, and
            consented to this Disclaimer. If you have any questions, please contact us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
          <p>
            Finally, you must be at least 18 years old and be able to consent to this Disclaimer. If you are under the age of
            18, or you do not agree with this Disclaimer as stated herein, please STOP now and do not use this Site or its
            content. By using the Site, you agree to the Disclaimer as stated herein, regardless of whether or not you have
            read it.
          </p>
        </div>
      </div>

      <div className="space-y-4 break-words text-[15px] leading-[1.65] text-neutral-700 font-serif [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_a]:break-all [&_a]:underline [&_a]:underline-offset-[3px]">
        <DocSection id="disc-definitions" index={1} title="Definitions">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold">&ldquo;Company&rdquo;</span>, <span className="font-bold">&ldquo;We&rdquo;</span>,{' '}
              <span className="font-bold">&ldquo;I&rdquo;</span>, <span className="font-bold">&ldquo;Our&rdquo;</span>, or{' '}
              <span className="font-bold">&ldquo;Us&rdquo;</span> means <LlcName /> and thebarbellballerina.com.
            </li>
            <li>
              <span className="font-bold">&ldquo;Content&rdquo;</span> means any and all written, visual, video, or audio
              information contained on the Site, including, but not limited to, any and all emails received from or on behalf
              of <LlcName />, or thebarbellballerina.com, and any and all written or Downloadable material Purchased, viewed,
              or otherwise offered on thebarbellballerina.com, such as blog posts, graphics, designs, documents, information,
              templates, and materials.
            </li>
            <li>
              <span className="font-bold">&ldquo;Purchase&rdquo;</span>, <span className="font-bold">&ldquo;Purchased&rdquo;</span>,{' '}
              <span className="font-bold">&ldquo;Purchasing&rdquo;</span>, <span className="font-bold">&ldquo;Downloading&rdquo;</span>{' '}
              or <span className="font-bold">&ldquo;Download&rdquo;</span> means any Content (as defined herein) or Courses,
              Services, and/or Products (as defined herein) you paid for and/or copied to your computer, hard drive, cloud
              system, or another process of downloading data, from this Site (as defined herein).
            </li>
            <li>
              <span className="font-bold">&ldquo;Personal Information&rdquo;</span> means information that can be used on its
              own or in conjunction with other information to identify, contact, or locate a single person, or to identify an
              individual in context. For example, personal information includes your name, address, email address, telephone
              number, etc.
            </li>
            <li>
              <span className="font-bold">&ldquo;Site, Courses, Services, and/or Products&rdquo;</span> means thebarbellballerina.com
              and its associated pages, Content, email list, social media posts, blog posts, courses, coaching services, group
              courses or programs, templates, contracts, forms, guides, eBooks, worksheets, workbooks, website materials, and/or
              templates available on the Site.
            </li>
            <li>
              <span className="font-bold">&ldquo;Site&rdquo;</span> means thebarbellballerina.com and any and all of its pages,
              tabs, or sub-pages and <span className="font-bold">&ldquo;Content&rdquo;</span>, as defined herein.
            </li>
            <li>
              <span className="font-bold">&ldquo;You&rdquo;</span> or <span className="font-bold">&ldquo;Your&rdquo;</span> means
              the user, customer, or viewer of the Site.
            </li>
          </ul>
        </DocSection>

        <DocSection id="disc-disclaimer" index={2} title="Disclaimer">
          <p>
            The Site, Courses, Services, and/or Products are intended for informational &amp; educational purposes only and are
            not intended as professional medical advice by us. By accessing and using the Site, Courses, Services, and/or
            Products, such use shall constitute your agreement that the Site, Courses, Services, and/or Products is not
            professional medical advice and shall not be relied upon by you as such.
          </p>
          <p>
            You should ALWAYS consult with your physician or another medical professional first before implementing any of our
            advice, information, or suggestions. You should always consult with a physician or medical professional (not us)
            before implementing any changes to your diet, medication, lifestyle, exercise regimen, supplement regimen, or health
            practices. Please only implement any and all changes after consulting with your physician and assessing your own
            risk.
          </p>
        </DocSection>

        <DocSection id="disc-affiliate" index={3} title="Affiliate Links/Products">
          <p>
            From time to time, we link to products or services we love using affiliate links. This means that we may receive a
            small percentage or fee for referring you to any product you may purchase from one of those sites. These small fees
            help sustain our business. We truly appreciate your support.
          </p>
        </DocSection>

        <DocSection id="disc-sponsored" index={4} title="Sponsored Posts">
          <p>
            We may feature sponsored blog posts. If we do, we will clearly state that the post is sponsored and by whom in the
            post. While we are committed to only featuring sponsored content from companies or products we have tried and loved,
            we make no warranties, guarantees, or representations as to the effectiveness or safety of said products or
            services. You should use them at your own risk and make all the appropriate investigations you need to on your own to
            feel comfortable using them. Please feel free to email us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> if you have any questions about our sponsored posts.
          </p>
        </DocSection>

        <DocSection id="disc-professional" index={5} title="Information Is No Substitute for Professional Advice">
          <p>
            The Content contained on this Site is not a substitute for the advice of your attorney, physician, medical
            professional, mental health professional, financial advisor, accountant, or any other professional you consult or
            should consult. This Site simply contains informational and educational material and information.
          </p>
        </DocSection>

        <DocSection id="disc-warranties" index={6} title="No Warranties, Guarantees, or Representations">
          <p>
            Although we do our best to maintain the Site and its Content, we do not warranty, guarantee, or represent that our
            Content or Site, Courses, Services, and/or Products are accurate, complete, reliable, or free of errors or that
            they pertain to your particular circumstances or health situation. Although we do our best to update the Site, we
            also cannot guarantee -- due to how rapidly things change -- that all of our Content is up to date or completely
            accurate.
          </p>
        </DocSection>

        <DocSection id="disc-liability" index={7} title="Disclaimer of Liability">
          <p>
            To the extent permitted by law, we disclaim any and all liability pertaining to your use, purchase, or download of
            the Site, Courses, Services, and/or Products. Please use the Site, Courses, Services, and/or Products at your own
            risk, after making an independent assessment of risk.
          </p>
        </DocSection>

        <DocSection id="disc-testimonials" index={8} title="Testimonials/Examples">
          <p>
            The Testimonials or examples on the Site are simply that: examples. While they are all accurate and authentic, we
            are not making any claims that YOU will experience the same or better results from using or purchasing the Site,
            Courses, Services, and/or Products.
          </p>
        </DocSection>

        <DocSection id="disc-endorsements" index={9} title="No Endorsements">
          <p>
            Any links to, mentions of, or features of various companies, products, or services are not in any way an
            endorsement of said company, product, and/or service by us. It does not mean that we guarantee your success,
            satisfaction, or safety with respect to said company, product, and/or service. You should only use or do business
            with one of those companies, products, or services after you have independently investigated it, assessed the
            applicable risk, and determined you would like to use or try it.
          </p>
        </DocSection>

        <DocSection id="disc-earnings" index={10} title="Earnings Disclaimer">
          <p>
            We make every effort to accurately represent our products, programs and services. Any earnings stated on the Site
            are estimates or examples only of what&apos;s possible. They are not guarantees of future results, guaranteed success
            or a promise that you will experience the same or even similar results. There is no guarantee that past results will
            be replicated in the future. The failure or success of use of our products, programs and services relies on your own
            due diligence and efforts. We are not liable for the success or failure of your business, health, financial
            situation, and/or any other effect from use of our products, programs and/or services.
          </p>
        </DocSection>

        <DocSection id="disc-legal-links" index={11} title="Privacy Policy + Terms &amp; Conditions">
          <p>
            Please read our{' '}
            <Link to="/privacy-policy" className="underline underline-offset-[3px] decoration-1">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/terms-and-conditions" className="underline underline-offset-[3px] decoration-1">
              Terms &amp; Conditions
            </Link>{' '}
            before using the Site. Thank you.
          </p>
        </DocSection>

        <DocSection id="disc-contact" index={12} title="Contact Us">
          <p>
            If you have any questions about the Disclaimer or its terms, or our Privacy Policy and Terms &amp; Conditions,
            please email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </DocSection>
      </div>

      <div className="mt-14 md:mt-16 rounded-md bg-[#0A0A0A] text-white px-6 py-8 md:px-10 md:py-10">
        <p className="text-[10px] font-sans uppercase tracking-[0.28em] text-[#BB8966] mb-3">Document</p>
        <p className="font-serif text-lg md:text-xl mb-3">Last updated · June 3, 2026</p>
        <p className="break-words text-sm text-white/85 font-sans leading-relaxed [&_a]:break-all">
          Questions? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#C9A07E] underline underline-offset-2">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </article>
  );
}
