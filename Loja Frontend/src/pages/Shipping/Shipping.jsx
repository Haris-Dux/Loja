import React from "react";
import { motion } from "framer-motion";

const Shipping = () => {
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
      <section className="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="pl-4 mb-6 border-l-4 border-[#B9A79C] ">
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                  Delivery within Pakistan
                </h1>
              </div>
              <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                All orders within Pakistan are routed through TCS, Leopords,
                Call Courier and many others courier services. All our domestic
                clients will be provided with a tracking ID when the order is
                dispatched. Upon placing an order, you will receive a
                verification call or SMS from our Customer Service to confirm
                the order. If you fail to verify, your order will be
                automatically cancelled after 3 days (only applicable to
                purchases made through Cash on Delivery method). Once the order
                is verified, it will be dispatched within 1-2 working days and
                will be delivered to you within 4-5 working days. We offer free
                delivery on orders above Rs.2500 within Pakistan.
              </p>
            </div>
            <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="pl-4 mb-6 border-l-4 border-[#B9A79C] ">
                <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                  International Orders
                </h1>
              </div>
              <p className="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                International orders are routed through DHL. All our
                international clients will be provided with a tracking ID when
                the order is dispatched. International clients shall also
                receive a sales invoice via email and notification of shipment
                via email. The customer shall bear any additional charges for
                custom clearance or any other variation in price beyond our
                control.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Shipping;
