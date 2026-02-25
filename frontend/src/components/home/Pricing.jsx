import React, { useState } from 'react';
import { Check, Sparkles, Crown, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const pricingPlans = [
    {
        name: "Free",
        price: "0",
        period: "forever",
        description: "Perfect for trying out our AI tools",
        icon: Sparkles,
        gradient: "from-gray-500 to-gray-600",
        bgGradient: "from-gray-50 to-gray-100",
        popular: false,
        features: [
            "AI Chatbox (100 messages/month)",
            "Image Generation (10 images/month)",
            "Basic Voice Assistant",
            "720p Video Generation",
            "5 Logo designs",
            "Community support"
        ]
    },
    {
        name: "Pro",
        price: "29",
        period: "per month",
        description: "Best for professionals and creators",
        icon: Crown,
        gradient: "from-blue-500 to-purple-600",
        bgGradient: "from-blue-50 to-purple-50",
        popular: true,
        features: [
            "Unlimited AI Chatbox",
            "Unlimited Image Generation",
            "Advanced Voice Assistant",
            "4K Video Generation",
            "Unlimited Logo designs",
            "Priority support",
            "Advanced analytics",
            "Custom branding",
            "API access"
        ]
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact sales",
        description: "For teams and large organizations",
        icon: Building2,
        gradient: "from-indigo-500 to-pink-600",
        bgGradient: "from-indigo-50 to-pink-50",
        popular: false,
        features: [
            "Everything in Pro",
            "Dedicated account manager",
            "Custom AI model training",
            "White-label solutions",
            "SLA guarantee",
            "Advanced security",
            "Team collaboration tools",
            "Custom integrations",
            "Unlimited team members"
        ]
    }
];

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    return (
        <section id="pricing" className="py-20 lg:py-32 bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-white relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-6">
                        <Sparkles size={16} className="animate-pulse" />
                        <span>Simple, Transparent Pricing</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-gradient">Perfect Plan</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 mb-8">
                        Start free, upgrade when you're ready. All plans include our core AI tools.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-2 bg-white rounded-full shadow-md border border-gray-200">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${billingPeriod === 'monthly'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('annual')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 relative ${billingPeriod === 'annual'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Annual
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {pricingPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        const annualPrice = plan.price !== "Custom" && plan.price !== "0"
                            ? Math.floor(plan.price * 12 * 0.8)
                            : plan.price;

                        return (
                            <div
                                key={index}
                                className={`relative bg-gradient-to-br ${plan.bgGradient} p-8 rounded-3xl border-2 ${plan.popular ? 'border-purple-300 shadow-2xl scale-105' : 'border-white shadow-lg'
                                    } hover:shadow-xl transition-shadow duration-300`}
                            >
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-bl-3xl rounded-tr-3xl font-bold text-sm shadow-lg">
                                        ⭐ Most Popular
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Plan name */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6">{plan.description}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    {plan.price === "Custom" ? (
                                        <div className="text-4xl font-bold text-gray-900">Custom</div>
                                    ) : (
                                        <>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                                                    ${billingPeriod === 'annual' ? annualPrice : plan.price}
                                                </span>
                                                {billingPeriod === 'annual' && plan.price !== "0" && (
                                                    <span className="text-gray-500 text-lg">/year</span>
                                                )}
                                                {billingPeriod === 'monthly' && plan.price !== "0" && (
                                                    <span className="text-gray-500 text-lg">/month</span>
                                                )}
                                            </div>
                                            {billingPeriod === 'annual' && plan.price !== "0" && (
                                                <p className="text-sm text-green-600 font-semibold mt-1">
                                                    Save ${plan.price * 12 - annualPrice}/year
                                                </p>
                                            )}
                                        </>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">{plan.period}</p>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full mb-8 rounded-full py-6 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 ${plan.popular
                                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:scale-105`
                                        : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>

                                {/* Features */}
                                <div className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Message */}
                <div className="text-center max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Try AI-Base with zero risk</h3>
                        <div className="flex items-center justify-center gap-2 text-green-600">
                            <Check className="w-5 h-5" />
                            <span className="font-semibold">No credit card required to start • Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
