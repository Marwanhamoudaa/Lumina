"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Headphones,
    Heart,
    ShoppingCart,
    Search,
    ChevronRight,
    Zap,
    Tag,
    Grid3X3,
    Sparkles,
    Menu,
    X,
    ChevronDown,
    User,
    LogOut,
    ShoppingBag,
    TrendingUp,
    Package,
    Truck
    ,
    Moon,
    Sun
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/context/CartContextProvider";

const NavLinks = [
    { label: "Home", href: "/", icon: ShoppingBag },
    { label: "Shop", href: "/shop", icon: Package },
    { label: "Categories", href: "/categories", icon: Grid3X3 },
    { label: "Brands", href: "/brands", icon: TrendingUp },
];

// إزالة 'group' من الكلاس الأساسي
const navLinkClass = "relative inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all duration-200";

export default function Navbar() {

    const { numberOfCartItem, numberOfWishList } = useContext(cartContext) as any;
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [isDark, setIsDark] = React.useState(false);
    const [themeReady, setThemeReady] = React.useState(false);

    function handleLogout() {
        signOut({ redirect: true, callbackUrl: "/login" });
    }

    const session = useSession();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
        document.documentElement.classList.toggle("dark", shouldUseDark);
        setIsDark(shouldUseDark);
        setThemeReady(true);
    }, []);

    function handleToggleTheme() {
        const nextDark = !isDark;
        document.documentElement.classList.toggle("dark", nextDark);
        window.localStorage.setItem("theme", nextDark ? "dark" : "light");
        setIsDark(nextDark);
    }

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-xl" : ""}`}>
            {/* Top announcement bar - Modern Design */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-center gap-2 py-2.5 text-xs font-medium tracking-wide">
                    <Truck className="w-3.5 h-3.5 animate-pulse" />
                    <span>Free shipping on orders over $50 — Limited time offer</span>
                    <Sparkles className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Main navbar */}
            <nav className={`transition-all duration-300 ${scrolled ? "bg-white/98 backdrop-blur-xl shadow-lg" : "bg-white"} border-b border-slate-100`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {/* Logo - Modern Design */}
                        <Link href="/" className="shrink-0 flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Lumina
                                </span>
                                <span className="text-[10px] text-slate-400 -mt-0.5 tracking-[1px] font-medium">PREMIUM STORE</span>
                            </div>
                        </Link>

                        {/* Search Bar - Enhanced */}
                        <div className={`hidden md:block relative flex-1 max-w-md transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}>
                            <div className="relative">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <Input
                                    type="text"
                                    placeholder="Search products, brands..."
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    className="pl-11 pr-5 h-11 rounded-xl text-sm bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList className="gap-1">
                                {NavLinks.map(({ label, href, icon: Icon }) => (
                                    <NavigationMenuItem key={label}>
                                        <NavigationMenuLink asChild>
                                            <Link href={href} className={navLinkClass}>
                                                <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                                <span>{label}</span>                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 peer-hover:w-full"></div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            {/* Search Icon for Mobile */}
                            <button className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-all">
                                <Search className="w-5 h-5 text-slate-600" />
                            </button>

                            {/* Support Button */}
                            {/* <Button
                                variant="ghost"
                                asChild
                                className="hidden lg:flex items-center gap-2 h-10 px-4 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all"
                            >
                                <Link href="/contact">
                                    <Headphones size={18} />
                                    <div className="flex flex-col items-start leading-tight text-xs">
                                        <span className="font-medium">Support</span>
                                        <span className="text-[10px] opacity-70">24/7</span>
                                    </div>
                                </Link>
                            </Button> */}

                            {/* Wishlist */}
                            {themeReady && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleToggleTheme}
                                    className="h-10 w-10 rounded-xl hover:bg-slate-100 transition-all"
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                    title={isDark ? "Light mode" : "Dark mode"}
                                >
                                    {isDark ? (
                                        <Sun size={18} className="text-amber-500" />
                                    ) : (
                                        <Moon size={18} className="text-slate-600" />
                                    )}
                                </Button>
                            )}

                            {/* Wishlist */}
                            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10 rounded-xl hover:bg-slate-100 transition-all group">
                                <Link href="/wishlist">
                                    <Heart size={18} className="text-slate-600 group-hover:text-rose-500 transition-colors" />
                                    {numberOfWishList > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 text-[10px] bg-gradient-to-r from-rose-500 to-pink-500 border-none">
                                            {numberOfWishList}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>

                            {/* Cart */}
                            <Button asChild className="relative h-10 px-5 rounded-xl gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all group">
                                <Link href="/cart">
                                    <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="hidden sm:inline">Cart</span>
                                    {numberOfCartItem > 0 && (
                                        <Badge className="h-5 min-w-5 px-1.5 text-xs bg-white/20 text-white border border-white/30">
                                            {numberOfCartItem}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-2">
                                {session.status === "authenticated" ? (
                                    <div className="relative group">
                                        <Button
                                            className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium gap-2"
                                        >
                                            <User size={16} />
                                            <span>Account</span>
                                            <ChevronDown size={14} />
                                        </Button>
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-xl transition-all"
                                            >
                                                <LogOut size={14} />
                                                <span>Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="h-10 px-5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all"
                                        >
                                            <Link href="/login">Log In</Link>
                                        </Button>

                                        <Button
                                            asChild
                                            className="h-10 px-5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-medium shadow-md"
                                        >
                                            <Link href="/signup">Sign Up</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-100 shadow-lg">
                    <div className="px-4 py-4 space-y-2">
                        {NavLinks.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{label}</span>
                            </Link>
                        ))}
                        <div className="border-t border-slate-100 my-2"></div>
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            <Headphones className="w-5 h-5" />
                            <span className="font-medium">Support 24/7</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}