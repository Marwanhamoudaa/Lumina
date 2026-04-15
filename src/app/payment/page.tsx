"use client";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
  Banknote, 
  CreditCard, 
  MapPin, 
  Phone, 
  Building2, 
  Mail, 
  Lock, 
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { PaymentDataType, PaymentSchema } from "./Payment.schema";
import { creatCashOrder, creatVisaOrder } from "./orderAction";
import { cartContext } from "@/context/CartContextProvider";

export default function Payment() {
  const { cartId, totalPrice, refreshCart } = useContext(cartContext) as any;
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<PaymentDataType>({
    defaultValues: { details: "", phone: "", city: "", postalCode: "", paymentMethod: "cash" },
    resolver: zodResolver(PaymentSchema),
    mode: "onBlur",
  });

  async function handlePayment(values: PaymentDataType) {
    const userData = {
      shippingAddress: { 
        city: values.city, 
        details: values.details, 
        postalCode: values.postalCode, 
        phone: values.phone 
      },
    };

    try {
      if (values.paymentMethod === "cash") {
        const res = await creatCashOrder(cartId ?? "", userData);
        if (res?.status === "success") {
          await refreshCart?.();
          toast.success("Cash order created successfully.");
          router.push("/allorders");
          return;
        }
        toast.error(res?.message || "Failed to create cash order.");
        return;
      }

      const res = await creatVisaOrder(cartId ?? "", userData);
      if (res?.status === "success" && res?.session?.url) {
        window.location.href = res.session.url;
        return;
      }
      toast.error(res?.message || "Failed to start online payment session.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong while processing your payment.";
      toast.error(message);
    }
  }

  const isOnline = form.watch("paymentMethod") === "online";
  const isValid = form.formState.isValid;
  const subtotal = Number(totalPrice) || 0;
  const shippingCost = subtotal >= 500 || subtotal === 0 ? 0 : 50;
  const finalTotal = subtotal + shippingCost;

  // Modern input classes
  const inputClass = (invalid?: boolean, isFocused?: boolean) => `
    w-full h-12 px-4 pl-11 rounded-xl text-sm
    bg-white border-2 transition-all duration-200
    placeholder:text-slate-400
    focus:outline-none focus:ring-4
    ${invalid 
      ? "border-red-500 focus:ring-red-100 bg-red-50/50" 
      : isFocused
        ? "border-indigo-500 ring-4 ring-indigo-100"
        : "border-slate-200 hover:border-slate-300 focus:border-indigo-500"
    }
  `;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12 lg:py-16">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - Order Summary & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-semibold text-indigo-600">Secure Checkout</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Order</h2>
                <p className="text-slate-500">Fill in your details to proceed with payment</p>
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 mb-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-indigo-500 rounded-full"></div>
                  Order Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold text-slate-800">{subtotal.toFixed(0)} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-semibold text-slate-800">
                      {shippingCost === 0 ? "Free" : `${shippingCost} EGP`}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-800">Total</span>
                      <span className="text-xl font-bold text-indigo-600">{finalTotal.toFixed(0)} EGP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Why shop with us?</h3>
                {[
                  { icon: Shield, text: "Secure payment processing", color: "text-emerald-500" },
                  { icon: Lock, text: "Your data is protected", color: "text-emerald-500" },
                  { icon: CheckCircle, text: "Fast delivery guaranteed", color: "text-emerald-500" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-1.5 bg-emerald-100 rounded-full">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm text-slate-600">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              {/* Header with Gradient Bar */}
              <div className="relative bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <h1 className="text-2xl font-bold text-white mb-1">Payment Details</h1>
                  <p className="text-indigo-100 text-sm">Fill in your shipping information</p>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
                  
                  {/* Full Address */}
                  <Controller 
                    name="details" 
                    control={form.control} 
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Full Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            {...field} 
                            onFocus={() => setFocusedField("details")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="123 Street, Building, Apartment" 
                            autoComplete="off" 
                            className={inputClass(fieldState.invalid, focusedField === "details")} 
                          />
                        </div>
                        <AnimatePresence>
                          {fieldState.error && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-500 mt-1 flex items-center gap-1"
                            >
                              <span>⚠</span> {fieldState.error.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    )} 
                  />

                  {/* Phone */}
                  <Controller 
                    name="phone" 
                    control={form.control} 
                    render={({ field, fieldState }) => (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            {...field} 
                            type="tel" 
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="01234567890" 
                            autoComplete="off" 
                            className={inputClass(fieldState.invalid, focusedField === "phone")} 
                          />
                        </div>
                      </div>
                    )} 
                  />

                  {/* City & Postal Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <Controller 
                      name="city" 
                      control={form.control} 
                      render={({ field, fieldState }) => (
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            City
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              {...field} 
                              onFocus={() => setFocusedField("city")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Cairo" 
                              autoComplete="off" 
                              className={inputClass(fieldState.invalid, focusedField === "city")} 
                            />
                          </div>
                        </div>
                      )} 
                    />

                    <Controller 
                      name="postalCode" 
                      control={form.control} 
                      render={({ field, fieldState }) => (
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Postal Code
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              {...field} 
                              onFocus={() => setFocusedField("postalCode")}
                              onBlur={() => setFocusedField(null)}
                              placeholder="11511" 
                              autoComplete="off" 
                              className={inputClass(fieldState.invalid, focusedField === "postalCode")} 
                            />
                          </div>
                        </div>
                      )} 
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Payment Method
                    </label>
                    
                    <div className="space-y-3">
                      {[
                        { value: "cash", label: "Cash on Delivery", sub: "Pay when you receive your order", icon: Banknote, color: "emerald" },
                        { value: "online", label: "Pay Online", sub: "Credit card or digital wallet", icon: CreditCard, color: "indigo" },
                      ].map(({ value, label, sub, icon: Icon, color }) => (
                        <Controller 
                          key={value} 
                          name="paymentMethod" 
                          control={form.control} 
                          render={({ field }) => (
                            <motion.label
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`
                                flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                ${field.value === value
                                  ? `border-${color}-500 bg-${color}-50 shadow-md` 
                                  : "border-slate-200 hover:border-slate-300 bg-white"
                                }
                              `}
                            >
                              <input 
                                type="radio" 
                                value={value} 
                                checked={field.value === value} 
                                onChange={field.onChange} 
                                className="sr-only" 
                              />

                              <div className={`
                                w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                                ${field.value === value ? `border-${color}-500` : "border-slate-300"}
                              `}>
                                {field.value === value && (
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} 
                                  />
                                )}
                              </div>

                              <div className={`p-2 rounded-xl ${field.value === value ? `bg-${color}-100` : "bg-slate-100"}`}>
                                <Icon size={20} className={field.value === value ? `text-${color}-600` : "text-slate-500"} />
                              </div>

                              <div className="flex-1">
                                <p className={`font-semibold text-sm ${field.value === value ? `text-${color}-700` : "text-slate-800"}`}>
                                  {label}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                              </div>

                              {field.value === value && (
                                <CheckCircle className={`w-5 h-5 text-${color}-500`} />
                              )}
                            </motion.label>
                          )} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ y: -2, boxShadow: "0 20px 40px -12px rgb(99 102 241 / 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="
                      w-full h-12 mt-4 rounded-xl font-bold text-base
                      bg-linear-to-r from-indigo-600 to-purple-600 
                      hover:from-indigo-700 hover:to-purple-700
                      text-white transition-all duration-200
                      disabled:opacity-70 disabled:cursor-not-allowed
                      shadow-lg shadow-indigo-500/30
                      flex items-center justify-center gap-2 group
                    "
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : isOnline ? (
                      <>
                        <span>Pay Securely Now</span>
                        <Lock className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Confirm Order</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  {/* Security Notice */}
                  <div className="flex items-center justify-center gap-2 pt-4 text-xs text-slate-400">
                    <Shield className="w-3 h-3" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}