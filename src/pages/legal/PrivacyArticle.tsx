import DocSection from './DocSection';
import LlcName from './LlcName';

const SITE_URL = 'https://thebarbellballerina.com';
const SUPPORT_EMAIL = 'support@thebarbellballerina.com';

export default function PrivacyArticle() {
  return (
    <article className="text-left min-w-0" data-legal-doc="privacy">
      <div className="mb-12 min-w-0 max-w-full rounded-2xl border border-neutral-200/90 bg-white px-6 py-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:mb-14 md:px-8 md:py-10 lg:px-12 lg:py-10">
        <div className="space-y-4 break-words text-[15px] leading-[1.65] text-neutral-700 font-serif [&_a]:break-all [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-1">
          <p className="uppercase">
            Please read this Privacy Policy carefully and in its entirety before using thebarbellballerina.com and app
            (hereinafter referred to as the &ldquo;Site&rdquo;).
          </p>
          <p>
            This Privacy Policy is here to better serve those who are concerned with how their information is used online.
            The following describes what type of information we collect, what it&rsquo;s used for, and the measures we take
            to protect it.
          </p>
          <p>
            <span className="font-bold">IMPORTANT NOTE:</span> By using the Site and/or purchasing, viewing, downloading, or
            otherwise signing up to receive The Barbell Ballerina LLC email list newsletter, social media posts, podcast, blog
            posts, courses, coaching services, guides, eBooks, forms, worksheets, workbooks, website materials, and/or
            memberships (hereinafter collectively referred to as the &ldquo;Site, Courses, Services, and/or Products&rdquo;),
            you voluntarily agree to be bound by this Privacy Policy.
          </p>
          <p>
            If you have any questions about this Privacy Policy, please contact{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
          <p>If you do not agree with the terms of this Privacy Policy, do not use or browse the Site.</p>
        </div>
      </div>

      <div className="space-y-4 break-words text-[15px] leading-[1.65] text-neutral-700 font-serif [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:break-all [&_a]:underline [&_a]:underline-offset-[3px]">
        <DocSection id="privacy-definitions" index={1} title="Definitions">
          <p>
            <span className="font-bold">&ldquo;Company&rdquo;</span>, <span className="font-bold">&ldquo;We&rdquo;</span>,{' '}
            <span className="font-bold">&ldquo;I&rdquo;</span>, <span className="font-bold">&ldquo;Our&rdquo;</span>, or{' '}
            <span className="font-bold">&ldquo;Us&rdquo;</span> means <LlcName /> and thebarbellballerina.com.
          </p>
          <p>
            <span className="font-bold">&ldquo;Content&rdquo;</span> means any and all written, visual, video, or audio
            information contained on the Site, including, but not limited to, any and all emails received from Lili Pfeifer,{' '}
            <LlcName />, or thebarbellballerina.com, and any and all written or downloadable material purchased, viewed, or
            otherwise offered on thebarbellballerina.com, such as blog posts, graphics, designs, documents, information,
            templates and materials.
          </p>
          <p>
            <span className="font-bold">&ldquo;Personal Information&rdquo;</span> means information that can be used on its
            own or in conjunction with other information to identify, contact, or locate a person, or to identify an
            individual in context. For example, personal information includes, among other things, your name, address, email
            address, telephone number, credit card information, site behavior, etc.
          </p>
          <p>
            <span className="font-bold">&ldquo;Site, Courses, Services, and/or Products&rdquo;</span> means thebarbellballerina.com,
            Content, email list, social media posts, podcast, blog posts, courses, coaching services, guides, eBooks, forms,
            worksheets, workbooks, website materials, and/or memberships available on the Site.
          </p>
          <p>
            <span className="font-bold">&ldquo;Site&rdquo;</span> means thebarbellballerina.com and any and all of the
            Company&rsquo;s associated pages, tabs, landing pages, forms, or sub-pages.
          </p>
          <p>
            <span className="font-bold">&ldquo;You&rdquo;</span> or <span className="font-bold">&ldquo;Your&rdquo;</span> means
            the user, customer, or viewer of the Site.
          </p>
        </DocSection>

        <DocSection id="privacy-company" index={2} title="Company Statement">
          <p>
            The Site and its Content are owned by <LlcName /> and Lili Pfeifer.
          </p>
          <p>
            <LlcName /> is committed to protecting your Personal Information. We will only collect or use your Personal
            Information in accordance with the Privacy Policy herein.
          </p>
        </DocSection>

        <DocSection id="privacy-collect" index={3} title="What kind of Personal Information do we collect?">
          <p>
            <span className="font-bold">Personal Information You Provide:</span>
          </p>
          <p>
            When using the Site, and in filling out forms, purchasing products, providing comments, or contacting us, you may
            be asked to enter your name, email address, website address, mailing address, payment or credit card information.
            We use this information to deliver the product purchased, or information requested, to improve the performance and
            applicability of the Site, and to provide you with educational content, newsletters, promotions, and special
            offers.
          </p>
          <p>
            <span className="font-bold">Personal Information Automatically Collected:</span>
          </p>
          <p>
            Through use of the Site, the Company may use data collection technology, such as Google Analytics, Jetpack, etc.
            (hereinafter referred to as the &ldquo;Data Collection Companies&rdquo;) to collect information related to your
            use of the Site. Generally speaking, this includes information about your geographic location and Site behavior.
            The Data Collection Companies also provide us with information about what type of device or software you use, your
            IP address (with location information), and whether you view the Site on mobile, tablet, or desktop.
          </p>
          <p>We collect this information for statistical purposes only and to improve the viewer experience.</p>
        </DocSection>

        <DocSection
          id="privacy-update"
          index={4}
          title="What if the Personal Information we have about you is incorrect or you want to update it?"
        >
          <p>
            If the Personal Information we have collected about you is incorrect or incomplete in any way, or you would like to
            update what we have, please contact{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We will make the appropriate corrections when notified,
            as long as the corrections requested to be made are not incorrect or fraudulent in any way.
          </p>
        </DocSection>

        <DocSection id="privacy-when" index={5} title="When do we collect Personal Information?">
          <p>
            We collect Personal Information from you when you purchase, order, or sign up on and for the Site, Courses,
            Services, and Products, download our freebies or resources, subscribe to our newsletter, fill out a form, browse
            the Site, view Content, make purchases, enter any of your Personal Information on the Site. If you&apos;re just
            viewing the Site, you won&apos;t be required to provide personal information to browse.
          </p>
          <p>
            If you&apos;re outside of the EU: if you sign-up to receive any freebies, downloads, webinars, recordings,
            courses, or services from the Company, or purchase any products or services from us, you will automatically be
            added to our email list to receive free email messages from us. You can unsubscribe at any time by clicking
            &ldquo;UNSUBSCRIBE&rdquo; at the bottom of each email. If you have any questions, or difficulty unsubscribing from
            those emails, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> to be unsubscribed from future
            messages.
          </p>
          <p>
            If you&apos;re IN the EU: if you sign-up to receive any freebies, downloads, webinars, recordings, courses, or
            services from the Company, or purchase any products or services from us, you will only be added to our email list to
            receive free email messages from us if you affirmatively consent to receiving such messages. You can unsubscribe at
            any time by clicking &ldquo;UNSUBSCRIBE&rdquo; at the bottom of each email. If you have any questions, or difficulty
            unsubscribing from those emails, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> to be unsubscribed
            from future messages.
          </p>
        </DocSection>

        <DocSection id="privacy-use" index={6} title="How do we use your Personal Information?">
          <p>
            When using the Site, Courses, Services, and/or Products, we may use the Personal Information we collect from you
            when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication
            (typically by email), browse the Site, or use certain other Site features in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To personalize your experience and to allow us to deliver the type of content and product offerings in which you
              are most interested.
            </li>
            <li>To improve our Site in order to better serve you.</li>
            <li>To allow us to better serve you in response to your customer service requests.</li>
            <li>To administer a contest, promotion, survey, or other Site feature.</li>
            <li>To quickly process your transactions on and for the Site, Courses, Services, and/or Products.</li>
            <li>To send periodic emails regarding the Site, Courses, Services, and/or Products.</li>
            <li>To tailor social media (i.e., Facebook, Instagram, etc.) advertisements to you.</li>
          </ul>
        </DocSection>

        <DocSection id="privacy-share" index={7} title="Do we share your Personal Information with anyone?">
          <p>
            In general, we DO NOT sell, trade, or otherwise transfer to outside (third) parties your Personal Information for
            marketing or advertising purposes, except for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              In order to comply with an investigation, law enforcement inquiry, government entities, courts, or other third
              parties as required or allowed by applicable law, such as for legal and/or safety purposes.
            </li>
            <li>
              Third-party service providers that provide products, tools, platforms or services to us, such as email-list
              building, website management, customer service, account maintenance, and performing other activities and services
              related to the management and running of our company.
            </li>
            <li>
              Social media platforms, such as Facebook, Instagram, Twitter, Pinterest, etc. that offer functionalities and
              services to use their services through our website (i.e., pinning an image to Pinterest, sharing a link to
              Facebook). If you use those functionalities on the Site, your information will be shared with those platforms to
              complete those functions and activities.
            </li>
            <li>
              Third-party advertising purposes, such as advertising on social media platforms (i.e., Facebook and Instagram) to
              track and categorize your interests and behavior on our Site for the purposes of marketing and advertising to you.
              We share information with these companies, and these companies may collect information, including your actions
              taken on the Site, through tracking methods such as Cookies. These third-parties may also possess or get
              information about you from your behavior/actions: directly with the third-parties; on/from other websites, mobile
              apps, or companies that the third-party companies work with; or from your interactions with advertisements the
              third-party companies show you. The information that these companies collect or that we share may be used to
              customize or personalize the advertisements that are displayed to you.
            </li>
          </ul>
          <p>
            We may disclose your Personal Information to our subsidiaries, contractors, subcontractors, assigns, affiliates or
            successors in interest when necessary to carry out our business functions. This may include website hosting partners
            and other parties who assist us in operating our website, email service, conducting our business, or serving our
            users, so long as those parties agree to keep this information confidential.
          </p>
          <p>
            However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising,
            or other uses. If you make your personal information available to third parties through our Site, Courses, Services,
            and/or Products, <LlcName /> is not responsible for any unauthorized use by that third party.
          </p>
          <p>It&apos;s also important to note that we do allow third-party behavioral tracking.</p>
        </DocSection>

        <DocSection id="privacy-protect" index={8} title="How do we protect your Personal Information?">
          <p>
            We aim to make your visit to our Site as safe as possible. The Site uses commercially acceptable methods of security
            protection to protect your information. The Site is scanned for security breaches using, for example, malware
            removal software.
          </p>
          <p>We also use a SSL certificate and never transmit your credit card information by email.</p>
          <p>
            Your Personal Information is contained behind secured networks and is only accessible by a limited number of persons
            who have special access rights to such systems, and are required to keep the Personal Information confidential. By
            viewing, using, or purchasing on or from the Site, Courses, Services, and/or Products, you acknowledge that{' '}
            <LlcName /> and its staff and independent contractors may access your Personal Information.
          </p>
          <p>
            In addition, all sensitive credit card or payment information you supply is encrypted via Secure Socket Layer (SSL)
            technology.
          </p>
          <p>
            We implement a variety of security measures when a user places an order to maintain the safety of your Personal
            Information. All transactions are processed through a gateway provider and are not stored or processed on our
            servers.
          </p>
        </DocSection>

        <DocSection id="privacy-cookies" index={9} title="Do we use &apos;cookies&apos; or social media pixels?">
          <p>
            <span className="font-bold">Cookies.</span> We, and third-parties as described in Section 7 herein, use cookies and
            collect information from the computer, mobile phone, or other device you use to access the Site, read our emails,
            or view our advertisements. This information is automatically collected. Cookies are small data files that a site or
            its service provider transfers to your computer&apos;s hard drive through your Web browser (if you allow) that
            enables the site or service provider&apos;s systems to recognize your browser and capture and remember certain
            information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are
            also used to help us understand your preferences based on previous or current Site activity, which enables us to
            provide you with improved services. We also use cookies to help us compile aggregate data about Site traffic and Site
            interaction so that we can offer better site experiences and tools in the future.
          </p>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Help remember and process the items in the shopping cart.</li>
            <li>
              Compile aggregate data about site traffic and site interactions in order to offer better Site experiences and
              tools in the future. We may also use trusted third-party services that track this information on our behalf.
            </li>
            <li>
              To personalize your experience and better understand customers&apos; preferences for our marketing and business
              purposes.
            </li>
          </ul>
          <p>
            You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all
            cookies. You do this through your browser settings. Since each browser is a little different, look at your
            browser&apos;s Help Menu to learn the correct way to modify your cookies.
          </p>
          <p>
            While you may disable the use of cookies through your browser&apos;s settings or options page, you may lose some of
            the features and functionality of the Site, Courses, Services, and/or Products, as cookies are necessary to help
            track and enhance your experience on the Site.
          </p>
          <p>
            <span className="font-bold">Pixels.</span> Yes. The Company does social media pixels (Facebook pixels) to track
            visitors to the Site so we can tailor advertisements towards those visitors on various social media platforms,
            including: Facebook, Instagram. The Company reserves the right to use pixels in accordance with the terms of the
            social media platform.
          </p>
        </DocSection>

        <DocSection id="privacy-third-links" index={10} title="Third-Party Links:">
          <p>
            Occasionally, at our discretion, we may include or offer third-party products, services, or links to
            articles/blogs/sites on our Site. These third-party sites may or may not have separate and independent privacy
            policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites
            and/or their privacy policy (or lack thereof). Nonetheless, we seek to protect the integrity of our Site and welcome
            any feedback about any issues you experience with linked-to sites by emailing us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </DocSection>

        <DocSection id="privacy-password" index={11} title="Password Privacy:">
          <p>
            While using the Site, Courses, Services, and/or Products, you may create a username and/or password for login. It is
            your responsibility to keep the username and password safe. You are also responsible for any actions which occur
            through the use of your username/password, whether completed by you directly or through the use of your account. You
            shall notify us immediately by email at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> of any unauthorized
            use of your login information or any other security breach. Please log out at the end of each session to prevent any
            unauthorized use of your account or login information.
          </p>
          <p>
            You may not share your username/password or login information with anyone other than yourself. We are not responsible
            or liable for any loss or damages as a result of your failure to protect your login information or your
            unauthorized sharing of the same.
          </p>
        </DocSection>

        <DocSection id="privacy-google" index={12} title="Google Ads &amp; Analytics:">
          <p>
            Google&apos;s advertising requirements can be summed up by Google&apos;s Advertising Principles. They are put in
            place to provide a positive experience for you. We are not currently using Google Ads on the Site, although this may
            change in the future.
          </p>
          <p>We have implemented the following through Google Analytics: Demographics and Interests Reporting.</p>
          <p>
            We, along with third-party vendors such as Google, use first-party cookies (such as the Google Analytics cookies)
            and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data
            regarding user interactions with ad impressions and other ad service functions as they relate to our website.
          </p>
          <p>
            To Opt-Out of Google Ads: You can set preferences for how Google advertises to you using the Google Ad Settings
            page. Alternatively, you can opt-out by visiting the Network Advertising Initiative Opt-Out page or by using the
            Google Analytics Opt-Out Browser add-on.
          </p>
        </DocSection>

        <DocSection id="privacy-caloppa" index={13} title="California Online Privacy Protection Act (&ldquo;CalOPPA&rdquo;):">
          <p>
            CalOPPA stretches well beyond California to require any person or company that operates websites collecting Personal
            Information from California viewers/consumers to post a conspicuous privacy policy on its website stating exactly the
            information being collected and those individuals or companies with whom it is being shared. Read more about
            CalOPPA{' '}
            <a
              href="https://oag.ca.gov/privacy/caloppa"
              className="underline underline-offset-[3px] decoration-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
          <p>Pursuant to CalOPPA, we agree to the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Users can visit our site anonymously.</li>
            <li>There is a link to this Privacy Policy on the footer of thebarbellballerina.com</li>
            <li>
              Our Privacy Policy link does include the word &apos;Privacy&apos; and can easily be found on the page specified
              above. It is titled &quot;Privacy Policy&quot; very clearly.
            </li>
            <li>
              You will be notified of any Privacy Policy changes on our Privacy Policy Page (see bottom &ldquo;Updated On&rdquo;
              date).
            </li>
          </ul>
        </DocSection>

        <DocSection id="privacy-coppa" index={14} title="Children&rsquo;s Online Privacy Protection Act (&ldquo;COPPA&rdquo;):">
          <p>
            We do not specifically market to children under the age of 13. Please STOP and do not use, view, purchase, or
            otherwise browse the Site, Courses, Services, or Products if you are under 13 years old. If you&apos;re younger than
            13, you are not permitted to enter any Personal Information on this Site.
          </p>
          <p>
            If you are a parent and you believe your child under the age of 13 has provided us with Personal Information,
            please contact us immediately to have it removed by emailing us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </DocSection>

        <DocSection id="privacy-fair" index={15} title="Fair Information Practices:">
          <p>
            In order to comply with Fair Information Practices we will take the following responsive action, should a data
            breach occur:
          </p>
          <p>We will notify you via email within 5 business days of any known breach.</p>
        </DocSection>

        <DocSection id="privacy-can-spam" index={16} title="CAN-SPAM Act of 2003:">
          <p>
            The CAN-SPAM Act is a U.S. law which establishes rules for commercial email messages, gives you the right to stop
            certain commercial emails from being sent to you, and outlines certain penalties for commercial entities or persons
            who violate the law.
          </p>
          <p>We collect your email address and name so we can:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send information, respond to inquiries, and/or other requests or questions.</li>
            <li>Process orders and to send information and updates pertaining to orders of a course, product, or service.</li>
            <li>Send you additional information related to your course, product and/or service.</li>
            <li>Market to our mailing list or continue to send emails to you after the original transaction has occurred.</li>
            <li>
              Email you a newsletter with free information and advertising certain Products, Services, and/or Courses we offer.
            </li>
          </ul>
          <p>In accordance with the CAN-SPAM Act, we agree to the following:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We WILL NOT use false or misleading subjects or email addresses.</li>
            <li>We WILL identify the email message as an advertisement in some reasonable way.</li>
            <li>We WILL include our business mailing address and/or physical address in our emails.</li>
            <li>
              We WILL monitor third-party email marketing services for compliance. We use Kajabi and/or Flodesk to send our
              emails to you.
            </li>
            <li>We WILL honor opt-out/unsubscribe requests quickly.</li>
            <li>We WILL allow users to unsubscribe by using the appropriate link at the bottom of each email.</li>
          </ul>
          <p>
            <span className="font-bold uppercase">TO UNSUBSCRIBE:</span>
          </p>
          <p>
            If at any time you would like to unsubscribe from receiving future emails, you can email us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or follow the instructions at the bottom of any email you
            receive from us and we will promptly remove you from future correspondence(s). However, unsubscribing from one list
            or set of emails may not unsubscribe you from receiving ALL future emails from us. If you experience any problems
            unsubscribing, please email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we will promptly handle your
            removal.
          </p>
        </DocSection>

        <DocSection id="privacy-gdpr" index={17} title='Your General Data Protection Regulation ("GDPR") Rights'>
          <p>
            If you are located within the European Union (&quot;EU&quot;), you are entitled to certain rights under the GDPR.
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Know how long we&apos;ll keep your information. We&apos;ll keep your personal information until the earlier of:
              (1) you either ask us to delete your information or (2) the Company decides it no longer needs the data and the
              cost of retaining it outweighs the value to keeping it.
            </li>
            <li>Access, rectify or erase your personal information.</li>
            <li>
              Withdraw your consent to the Company&apos;s processing of your data, which shall have no effect on the
              lawfulness of the processing of your personal information prior to your withdrawal.
            </li>
            <li>Lodge a complaint with a supervisory authority that has jurisdiction over GDPR issues.</li>
            <li>
              Provide only your personal information which is reasonably required to enter into a contract with us. The
              Company will not ask for your consent to provide unnecessary personal information on the condition of entering
              into a contractual relationship with the Company.
            </li>
          </ul>
        </DocSection>

        <DocSection id="privacy-contact" index={18} title="Contacting Us:">
          <p>If there are any questions regarding this Privacy Policy, you may contact us using the following information:</p>
          <p>
            <LlcName />
            <br />
            Website: <a href={SITE_URL}>thebarbellballerina.com</a>
            <br />
            Mailing Address: 1250 Wayzata Blvd E. Unit #1216 Wayzata, MN 55391
            <br />
            Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
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
