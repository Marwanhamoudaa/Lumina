// components/FeaturesSection.tsx

'use client';

import { motion } from 'framer-motion';
import { 
  FaTruck, 
  FaShieldHalved, 
  FaRotateLeft, 
  FaHeadset 
} from 'react-icons/fa6';

const features = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    color: "bg-blue-50 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    icon: FaRotateLeft,
    title: "Easy Returns",
    description: "14-day return policy",
    color: "bg-orange-50 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "bg-purple-50 text-purple-500 dark:bg-purple-500/15 dark:text-purple-300",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}     
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ 
                //   duration: 0.6, 
                //   ease: "easeOut",
                  delay: index * 0.1   // تأخير بسيط بين الكروت
                }}
                viewport={{ once: true }}   // يشتغل مرة واحدة فقط
                className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:shadow-slate-950/40 dark:hover:shadow-lg dark:border dark:border-slate-800"
              >
                {/* الأيقونة */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${feature.color}`}>
                  <Icon className="text-3xl" />
                </div>

                {/* النص */}
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}