import React, { useState } from "react";
import { motion } from "framer-motion";

const Faq = () => {
  const routeVariants = {
    initial: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        mass: 0.4,
        duration: 0.3,
        delay: 0.1,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <motion.div
    variants={routeVariants}
    initial="initial"
    animate="visible"
    exit="exit"
  >
    <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Any Questions? Look Here
              </h2>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Do I need to have an account to shop with you? "
              text="You can shop from our online store without creating an account and use guest checkout. However, creating an account will streamline your shopping process."
            />
            <AccordionItem
              header="How do I create an account?"
              text="Click on ‘Create an Account’ on our homepage, where you'll need to provide personal details to create your account."
            />
            <AccordionItem
              header="How can I change my shipping address?"
              text="Yes, you can edit or add a new shipping address by logging into your account. Visit ‘My Account’ to update your details for future orders. If your order is confirmed and you need to change the delivery address, please contact our customer service immediately."
            />
             <AccordionItem
              header="Can I add more items to my existing order?"
              text="Adding items to the cart doesn’t reserve them; you must pay and place an order to secure the items."
            />
             <AccordionItem
              header="What payment options are available?"
              text="Payment options include Cash on Delivery (for domestic clients) and online payment."
            />
             <AccordionItem
              header="What happens if my payment fails?"
              text="Orders are processed upon successful payment. If you face payment issues, contact our customer service for assistance."
            />
             <AccordionItem
              header="What does Cash on Delivery mean?"
              text="Choosing Cash on Delivery means paying in cash at the time of delivery, with a receipt provided."
            />
             <AccordionItem
              header="Is Cash on Delivery service offered to international clients?"
              text="No, it's available only for domestic clients"
            />
             <AccordionItem
              header="Can I get a refund?"
              text=" No,LOJA strictly follows a 'No refund' policy. Refer to our Exchange Policy for more details."
            />
             <AccordionItem
              header="Is it safe to pay with credit/debit card?"
              text=" Yes, payment information is confidential. All payments are processed securely with encryption."
            />
             <AccordionItem
              header="Is my personal information safe?"
              text=" Yes, your personal information is secure. Read our Privacy Policy for details."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="What if I forget my password?"
              text="Click ‘Forgot Your Password’ on the login/sign-up page, enter your email address, and click ‘Reset Password.’ Follow the instructions sent to your registered email to create a new password."
            />
            <AccordionItem
              header="How do I place an order?"
              text="To place an order:
              Enter the quantity next to the product and click ‘add to cart.’
              After browsing, click ‘proceed to checkout,’ select a payment method, and receive a sales invoice via email/SMS.
              Your order will be confirmed via phone call by our Customer Service and then processed for delivery"
            />
            <AccordionItem
              header="How long will my order take to arrive?"
              text="You will receive a tracking ID to monitor your order. Domestic orders typically take 3-4 days, while international orders usually take 7-8 days."
            />
             <AccordionItem
              header="Can I cancel my order?"
              text=" Orders cannot be canceled once checked out, but you can cancel during a verification call from Customer Service. Exchange Policy applies after order placement."
            />
             <AccordionItem
              header="How long will my order take to arrive?"
              text="You will receive a tracking ID to monitor your order. Domestic orders typically take 3-4 days, while international orders usually take 7-8 days."
            />
             <AccordionItem
              header="Do you take orders over phone call or WhatsApp?"
              text="Yes, you can place orders via WhatsApp or phone call at 03064257447, providing the product's article number, color, and size."
            />
             <AccordionItem
              header="What does it imply if I don't recieve invoice after checkout?"
              text=" If you don’t receive a sales invoice via email within an hour, it means your order wasn’t successfully placed."
            />
             <AccordionItem
              header="How will I know the status of my order?"
              text="An Order ID is assigned when you place an order, and a Tracking ID is issued when your order is dispatched for tracking."
            />
             <AccordionItem
              header="How many times does the courier service attempts to deliver my order?"
              text="The courier service agent contacts you 8 hours before delivery. If you miss the first attempt, they will try again. The order will be canceled if not received the second time."
            />
              <AccordionItem
              header="Do you ship internationally?"
              text="Yes, we ship internationally!"
            />
              <AccordionItem
              header="Are the prices inclusive of delivery charges?"
              text="No, prices exclude delivery and shipping charges."
            />
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3056D3" stop-opacity="0.36" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-center items-center h-full">
  <div className="w-full px-4 lg:w-1/2">
    <AccordionItem
      header="How are the delivery charges calculated for international orders?"
      text="Delivery charges for international orders depend on parcel weight and delivery region."
    />
  </div>
</div>
    </section>
    </motion.div>
  );
};

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="single-faq mb-8 w-full rounded-lg border border-[#c3c4c6] bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary">
          <svg
            className={`duration-200 ease-in-out fill-primary stroke-primary ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-semibold text-black">{header}</h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
      </div>
    </div>
  );
};

export default Faq;
