'use client';

import MyInput from '@/components/input/MyInput';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupDataType, signupSchema } from './signup.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signupReq } from './signup.action';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver : zodResolver(signupSchema)
    });

    async function handleSignUp(values:signupDataType) {
        const confirmed = await signupReq(values)

        if(confirmed) {
            toast.success("signup succefully" , {
                position : 'top-center' , 
                richColors : true
            })
            router.push("/login")
        }else{
            toast.error("failed to signup" , {
                position : 'top-center' , 
                richColors : true
            })
        }    
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Side - Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:flex flex-col justify-center space-y-8"
                    >
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30" />
                            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-30" />
                            
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-20 h-20 bg-linear-to-r from-indigo-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-8"
                                >
                                    <Sparkles className="w-10 h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                                    Create Account
                                </h1>
                                <p className="text-xl text-slate-600 mb-8">
                                    Join us and start your journey with amazing products and exclusive deals.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: CheckCircle, text: "Access to exclusive deals", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "Fast shipping & easy returns", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "Secure payment methods", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "24/7 customer support", color: "text-emerald-500" }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="p-1 bg-emerald-100 rounded-full">
                                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                    </div>
                                    <span className="text-slate-700">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="pt-8 border-t border-slate-200"
                        >
                            <p className="text-sm text-slate-500 mb-4">Trusted by 10,000+ customers</p>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((_, idx) => (
                                    <div key={idx} className="w-12 h-12 bg-slate-100 rounded-full" />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Signup Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        <div className="p-8 lg:p-10">
                            {/* Header */}
                            <div className="text-center mb-8 lg:hidden">
                                <div className="w-16 h-16 bg-linear-to-r from-indigo-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign Up</h2>
                                <p className="text-slate-600">Create your account</p>
                            </div>

                            <div className="hidden lg:block mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Create an account</h2>
                                <p className="text-slate-600">Fill in your details to get started</p>
                            </div>

                            <form className="space-y-5" onSubmit={form.handleSubmit(handleSignUp)}>
                                {/* Name Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className="text-slate-700 font-semibold">
                                                    Full Name
                                                </FieldLabel>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Enter your full name"
                                                        autoComplete="off"
                                                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className="text-slate-700 font-semibold">
                                                    Email Address
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type="email"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="example@email.com"
                                                        autoComplete="off"
                                                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className="text-slate-700 font-semibold">
                                                    Password
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type={showPassword ? "text" : "password"}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Enter password"
                                                        autoComplete="off"
                                                        className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                                                        ) : (
                                                            <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                                                        )}
                                                    </button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Re-Password Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Controller
                                        name="rePassword"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className="text-slate-700 font-semibold">
                                                    Confirm Password
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type={showRePassword ? "text" : "password"}
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="Confirm password"
                                                        autoComplete="off"
                                                        className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowRePassword(!showRePassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                    >
                                                        {showRePassword ? (
                                                            <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                                                        ) : (
                                                            <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                                                        )}
                                                    </button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Phone Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Controller
                                        name="phone"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name} className="text-slate-700 font-semibold">
                                                    Phone Number
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type="tel"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="01234567890"
                                                        autoComplete="off"
                                                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Button 
                                        type="submit"
                                        className="w-full h-12 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>

                                {/* Login Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-center pt-4"
                                >
                                    <p className="text-slate-600">
                                        Already have an account?{' '}
                                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}