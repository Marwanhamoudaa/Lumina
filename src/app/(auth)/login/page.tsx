'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginDataType } from './login.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { loginReq } from './login.action';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Login() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver : zodResolver(loginSchema)
    });

    async function handleSignUp(values:loginDataType) {
        await signIn("credentials",{ ...values , redirect : true , callbackUrl : "/" })
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
                                    <LogIn className="w-10 h-10 text-white" />
                                </motion.div>
                                
                                <h1 className="text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                                    Welcome Back
                                </h1>
                                <p className="text-xl text-slate-600 mb-8">
                                    Sign in to your account and continue your shopping journey.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: CheckCircle, text: "Access your wishlist", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "Track your orders", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "Save payment methods", color: "text-emerald-500" },
                                { icon: CheckCircle, text: "Exclusive member deals", color: "text-emerald-500" }
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

                    {/* Right Side - Login Form */}
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
                                    <LogIn className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                                <p className="text-slate-600">Sign in to your account</p>
                            </div>

                            <div className="hidden lg:block mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in to your account</h2>
                                <p className="text-slate-600">Enter your credentials to continue</p>
                            </div>

                            <form className="space-y-5" onSubmit={form.handleSubmit(handleSignUp)}>
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
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
                                    transition={{ delay: 0.2 }}
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
                                                            <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
                                                        ) : (
                                                            <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
                                                        )}
                                                    </button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />}
                                            </Field>
                                        )}
                                    />
                                </motion.div>

                                {/* Forgot Password Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                    className="text-right"
                                >
                                    <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
                                        Forgot password?
                                    </Link>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Button 
                                        type="submit"
                                        className="w-full h-12 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>

                                {/* Divider */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative my-6"
                                >
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-slate-500">Or continue with</span>
                                    </div>
                                </motion.div>

                                {/* Social Login Buttons - Using alternative icons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid grid-cols-3 gap-3"
                                >
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group"
                                    >
                                        <svg className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                                        </svg>
                                        <span className="text-sm font-medium text-slate-600 hidden sm:inline">GitHub</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group"
                                    >
                                        <svg className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                                        </svg>
                                        <span className="text-sm font-medium text-slate-600 hidden sm:inline">Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group"
                                    >
                                        <svg className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        <span className="text-sm font-medium text-slate-600 hidden sm:inline">Facebook</span>
                                    </button>
                                </motion.div>

                                {/* Sign Up Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-center pt-4"
                                >
                                    <p className="text-slate-600">
                                        Don't have an account?{' '}
                                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                                            Create account
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