"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
    Eye, EyeOff, Github, Chrome, Mail, Lock, User, ArrowRight,
} from "lucide-react";

export default function TabAuthSection() {
    const [showLoginPw, setShowLoginPw] = useState(false);
    const [showSignupPw, setShowSignupPw] = useState(false);

    // Form state for Login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

    // Form state for Signup
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupTerms, setSignupTerms] = useState(false);
    const [signupErrors, setSignupErrors] = useState<{ name?: string; email?: string; password?: string; terms?: string }>({});

    // Password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Login
    const validateLogin = (): boolean => {
        const errors: { email?: string; password?: string } = {};

        if (!loginEmail.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(loginEmail)) {
            errors.email = "Please enter a valid email";
        }

        if (!loginPassword.trim()) {
            errors.password = "Password is required";
        }

        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Validate Signup
    const validateSignup = (): boolean => {
        const errors: { name?: string; email?: string; password?: string; terms?: string } = {};

        if (!signupName.trim()) {
            errors.name = "Full name is required";
        }

        if (!signupEmail.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(signupEmail)) {
            errors.email = "Please enter a valid email";
        }

        if (!signupPassword.trim()) {
            errors.password = "Password is required";
        } else if (!passwordRegex.test(signupPassword)) {
            errors.password = "Password must be 8+ chars with uppercase, lowercase, number & special char";
        }

        if (!signupTerms) {
            errors.terms = "You must agree to the terms";
        }

        setSignupErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle Login Submit
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateLogin()) {
            console.log("Login submitted:", { email: loginEmail, password: loginPassword });
            // Add your login API call here
        }
    };

    // Handle Signup Submit
    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateSignup()) {
            console.log("Signup submitted:", { name: signupName, email: signupEmail, password: signupPassword });
            // Add your signup API call here
        }
    };

    // subtle monochrome particles (optional)
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        setSize();

        type P = { x: number; y: number; v: number; o: number };
        let ps: P[] = [];
        let raf = 0;

        const make = (): P => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            v: Math.random() * 0.25 + 0.05,
            o: Math.random() * 0.35 + 0.15,
        });

        const init = () => {
            ps = [];
            const count = Math.floor((canvas.width * canvas.height) / 9000);
            for (let i = 0; i < count; i++) ps.push(make());
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ps.forEach((p) => {
                p.y -= p.v;
                if (p.y < 0) {
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + Math.random() * 40;
                    p.v = Math.random() * 0.25 + 0.05;
                    p.o = Math.random() * 0.35 + 0.15;
                }
                ctx.fillStyle = `rgba(250,250,250,${p.o})`;
                ctx.fillRect(p.x, p.y, 0.7, 2.2);
            });
            raf = requestAnimationFrame(draw);
        };

        const onResize = () => { setSize(); init(); };

        window.addEventListener("resize", onResize);
        init();
        raf = requestAnimationFrame(draw);
        return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
    }, []);

    return (
        <section className="fixed inset-0 text-zinc-50" style={{ backgroundColor: '#050514' }}>
            <style>{`
        /* card fade-up on mount */
        .card-animate { opacity: 0; transform: translateY(12px); animation: fadeUp .6s ease .25s forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        /* accent lines */
        .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.7}
        .hline,.vline{position:absolute;background:#27272a}
        .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:drawX .6s ease forwards}
        .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:drawY .7s ease forwards}
        .hline:nth-child(1){top:18%;animation-delay:.08s}
        .hline:nth-child(2){top:50%;animation-delay:.16s}
        .hline:nth-child(3){top:82%;animation-delay:.24s}
        .vline:nth-child(4){left:22%;animation-delay:.20s}
        .vline:nth-child(5){left:50%;animation-delay:.28s}
        .vline:nth-child(6){left:78%;animation-delay:.36s}
        @keyframes drawX{to{transform:scaleX(1)}}
        @keyframes drawY{to{transform:scaleY(1)}}

        /* --- SIMPLE BLUR SWITCH --- */
        /* Wrapper to keep card height stable */
        .tab-shell{ position:relative; min-height: 420px; }

        /* Panels stay mounted, switch states.
           Inactive: absolute, invisible, blur + disabled events.
           Active: normal, smooth reveal. */
        .tab-panel{
          transition: opacity .22s ease, filter .22s ease;
        }
        .tab-panel[data-state="inactive"]{
          position:absolute; inset:0;
          opacity:0; filter: blur(8px);
          pointer-events:none;
        }
        .tab-panel[data-state="active"]{
          position:relative;
          opacity:1; filter: blur(0px);
        }

        /* tabs UI tweaks */
        .auth-tabs [role="tablist"] {
          background: #0f0f10; border: 1px solid #27272a; border-radius: 10px; padding: 4px;
        }
        .auth-tabs [role="tab"] {
          font-size: 13px; letter-spacing: .02em;
        }
        .auth-tabs [role="tab"][data-state="active"] {
          background: #111113; border-radius: 8px; box-shadow: inset 0 0 0 1px #27272a;
        }
      `}</style>

            {/* particles */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen pointer-events-none" />

            {/* accent lines */}
            <div className="accent-lines">
                <div className="hline" />
                <div className="hline" />
                <div className="hline" />
                <div className="vline" />
                <div className="vline" />
                <div className="vline" />
            </div>

            {/* header */}
            <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4 border-b border-zinc-800/80" style={{ backgroundColor: '#050514' }}>
                <span className="text-xs tracking-[0.14em] uppercase text-zinc-400">CYBERLENS</span>
                <Button variant="outline" className="h-9 rounded-lg border-cyan-500 bg-cyan-500 text-zinc-900 hover:bg-cyan-400">
                    <span className="mr-2">Contact</span>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </header>

            {/* centered card with tabs */}
            <div className="h-full w-full grid place-items-center px-4">
                <Card className="card-animate w-full max-w-md border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Welcome</CardTitle>
                        <CardDescription className="text-zinc-400">Log in or create an account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="login" className="auth-tabs w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Log In</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            {/* shell holds height; panels stack */}
                            <div className="tab-shell mt-6">
                                {/* LOGIN */}
                                <TabsContent value="login" forceMount className="tab-panel space-y-5">
                                    <form onSubmit={handleLoginSubmit} className="space-y-5">
                                        <div className="grid gap-2">
                                            <Label htmlFor="login-email" className="text-zinc-300">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="login-email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={loginEmail}
                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                    className={`pl-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 ${loginErrors.email ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                            {loginErrors.email && <p className="text-red-400 text-xs">{loginErrors.email}</p>}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="login-password" className="text-zinc-300">Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="login-password"
                                                    type={showLoginPw ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    className={`pl-10 pr-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 ${loginErrors.password ? 'border-red-500' : ''}`}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-zinc-400 hover:text-zinc-200"
                                                    onClick={() => setShowLoginPw((v) => !v)}
                                                    aria-label={showLoginPw ? "Hide password" : "Show password"}
                                                >
                                                    {showLoginPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {loginErrors.password && <p className="text-red-400 text-xs">{loginErrors.password}</p>}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Checkbox id="remember" className="border-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900" />
                                                <Label htmlFor="remember" className="text-zinc-400">Remember me</Label>
                                            </div>
                                            <a href="#" className="text-sm text-zinc-300 hover:text-zinc-100">Forgot password?</a>
                                        </div>

                                        <Button type="submit" className="w-full h-10 rounded-lg bg-cyan-500 text-zinc-900 hover:bg-cyan-400">
                                            Continue
                                        </Button>
                                    </form>

                                    <div className="relative">
                                        <Separator className="bg-zinc-800" />
                                        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-zinc-900/70 px-2 text-[11px] uppercase tracking-widest text-zinc-500">or</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="h-10 rounded-lg border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500/20">
                                            <Github className="h-4 w-4 mr-2" /> GitHub
                                        </Button>
                                        <Button variant="outline" className="h-10 rounded-lg border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500/20">
                                            <Chrome className="h-4 w-4 mr-2" /> Google
                                        </Button>
                                    </div>
                                </TabsContent>

                                {/* SIGN UP */}
                                <TabsContent value="signup" forceMount className="tab-panel space-y-5">
                                    <form onSubmit={handleSignupSubmit} className="space-y-5">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={signupName}
                                                    onChange={(e) => setSignupName(e.target.value)}
                                                    className={`pl-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 ${signupErrors.name ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                            {signupErrors.name && <p className="text-red-400 text-xs">{signupErrors.name}</p>}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="signup-email" className="text-zinc-300">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={signupEmail}
                                                    onChange={(e) => setSignupEmail(e.target.value)}
                                                    className={`pl-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 ${signupErrors.email ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                            {signupErrors.email && <p className="text-red-400 text-xs">{signupErrors.email}</p>}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="signup-password" className="text-zinc-300">Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    id="signup-password"
                                                    type={showSignupPw ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    value={signupPassword}
                                                    onChange={(e) => setSignupPassword(e.target.value)}
                                                    className={`pl-10 pr-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 ${signupErrors.password ? 'border-red-500' : ''}`}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-zinc-400 hover:text-zinc-200"
                                                    onClick={() => setShowSignupPw((v) => !v)}
                                                    aria-label={showSignupPw ? "Hide password" : "Show password"}
                                                >
                                                    {showSignupPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            {signupErrors.password && <p className="text-red-400 text-xs">{signupErrors.password}</p>}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="terms"
                                                    checked={signupTerms}
                                                    onCheckedChange={(checked) => setSignupTerms(checked === true)}
                                                    className="border-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900"
                                                />
                                                <Label htmlFor="terms" className="text-zinc-400 text-sm">I agree to the Terms & Privacy</Label>
                                            </div>
                                            {signupErrors.terms && <p className="text-red-400 text-xs">{signupErrors.terms}</p>}
                                        </div>

                                        <Button type="submit" className="w-full h-10 rounded-lg bg-cyan-500 text-zinc-900 hover:bg-cyan-400">Create account</Button>
                                    </form>

                                    <div className="relative">
                                        <Separator className="bg-zinc-800" />
                                        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-zinc-900/70 px-2 text-[11px] uppercase tracking-widest text-zinc-500">or</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="h-10 rounded-lg border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500/20">
                                            <Github className="h-4 w-4 mr-2" /> GitHub
                                        </Button>
                                        <Button variant="outline" className="h-10 rounded-lg border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500/20">
                                            <Chrome className="h-4 w-4 mr-2" /> Google
                                        </Button>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </CardContent>

                    <CardFooter className="flex items-center justify-center text-sm text-zinc-400">
                        Need help? <a className="ml-1 text-zinc-200 hover:underline" href="#">Contact support</a>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}
