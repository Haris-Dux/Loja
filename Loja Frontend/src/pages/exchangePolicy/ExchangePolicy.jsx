import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const ExchangePolicy = () => {
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
                Exchange Policy
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              Items purchased from our online store can be exchanged either at
              our physical outlet or by contacting our customer service for
              courier return. Exchange requests are subject to the following
              conditions:
              <ul>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  CThe customer must submit a request for exchange within 7
                  working days of receiving the purchased item, stating the
                  reason for exchange.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  The item must be in its original packaging with the price tag
                  intact.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  The original invoice for the item must be sent along with the
                  item.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  The item must be in its original, unused condition with no
                  signs of wear, odors, stains, or washing.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Sale items are not eligible for exchange at their sale price;
                  they will be exchanged at their regular price.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  LOJA reserves the right to accept or deny exchange requests.
                </li>
                <li>
                  <ArrowRightCircleIcon className="inline-block w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Upon approval of an exchange request, the customer will be
                  notified by our customer service.
                </li>
              </ul>
              Please note that this exchange policy does not apply to orders
              shipped outside Pakistan
            </p>
          </div>
          <div className="w-full px-6 mb-10 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 ">
              <h1 className="mt-2  font-black text-gray-700 md:text-3xl dark:text-gray-300">
                Refund Policy
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              LOJA strictly adheres to a 'NO refund' policy. Cashback is not
              available. The Exchange Policy is applicable once the customer has
              placed an order and received the parcel or when payment has been
              processed.
            </p>
          </div>
          <div className="w-full px-6 mb-10 lg:mb-0 ">
            <div className="pl-4 mb-6 border-l-4 ">
              <h1 className="mt-2  font-black text-gray-700 md:text-3xl dark:text-gray-300">
                Damage & Claims
              </h1>
            </div>
            <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
              The exchange of damaged items is allowed if the received item(s)
              have manufacturing defects, wrong sizes, or wrong items shipped.
              Customers must raise complaints within 2 working days of receiving
              the parcel, along with the paper invoice, through a call, message,
              or email. Please allow up to one week for the processing of damage
              and claims. Please note that items purchased from our retail
              outlet cannot be exchanged via courier; they must be exchanged at
              the retail outlet in person. Thank you for choosing LOJA. If you
              have any further questions or concerns, please do not hesitate to
              reach out to our customer service.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ExchangePolicy;
