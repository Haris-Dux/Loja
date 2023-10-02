import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const PrivacyPolicy = () => {
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
      <section className="flex items-center bg-stone-100 font-poppins dark:bg-gray-800 ">
        <div className=" flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="w-full px-6 mb-10 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 border-[#B9A79C] ">
              <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                Privacy Policy
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              LOJA is committed to ensuring the proper and secure use of your
              personal information. This Privacy Policy outlines how we collect
              and use your personal information through our website
              [www.loja.pk]. Please read this Privacy Policy carefully to
              understand how we collect, use, protect, and handle your personal
              information. We want to assure you that we will not sell or
              distribute your information to any third parties. What Personal
              Information Do We Collect? When you place an order or register on
              our site, we may ask you to provide your name, email address,
              contact number, mailing address, credit card information, or other
              details to enhance your shopping experience. When Do We Collect
              Information? We collect information from you when you register on
              our site, place an order, subscribe to updates, contact our
              Customer Service, or provide information on our site. Use and
              Storage of Your Personal Information. We use the information we
              collect from you for various purposes, including:
              <ul>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Contacting you in case of delivery issues
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Processing orders and providing order-related updates
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Sending text message notifications for delivery status
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Personalizing your experience and tailoring content to your
                  preferences
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Improving customer service by addressing your requests
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Efficiently processing transactions
                </li>
              </ul>
              We retain your information only as long as necessary to provide
              our services to you or as required by law. After this period, your
              personal information will be securely deleted. Your sensitive
              information is protected with SSL encryption, ensuring the secure
              transmission of data.
            </p>
          </div>
          <div className="w-full px-6 mb-10 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 ">
              <h1 className="mt-2  font-black text-gray-700 md:text-3xl dark:text-gray-300">
                Cookies
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              We utilize non-personal data, including third-party cookies, to
              collect statistics and enhance your website experience. Cookies
              are small pieces of information stored on your computer's hard
              drive that record your website interactions. Cookies make it
              easier for you to log in and use our website during future visits.
              Permanent cookies are stored on your computer or mobile device for
              a maximum of 24 months, and you can easily remove them via your
              browser settings.
            </p>
          </div>
          <div className="w-full px-6 mb-10 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 ">
              <h1 className="mt-2  font-black text-gray-700 md:text-3xl dark:text-gray-300">
                Your Rights
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              You have the right to request information about the personal data
              we hold about you. If your data is incorrect, incomplete, or
              irrelevant, you can request corrections or removal of the
              information. Thank you for choosing LOJA. If you have any
              questions or concerns about your privacy or data security, please
              don't hesitate to contact us.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
