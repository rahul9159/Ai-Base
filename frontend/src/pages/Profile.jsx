import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, MessageSquare, Save, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { getProfile, updateProfile, getHistory } from '../lib/api';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        fullName: '',
        password: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileData, historyData] = await Promise.all([
                getProfile(),
                getHistory()
            ]);
            setProfile(profileData);
            setFormData({ fullName: profileData.fullName || '', password: '' });
            setHistory(historyData.history || []);
            return profileData;
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const updateData = { fullName: formData.fullName };
            if (formData.password) updateData.password = formData.password;

            await updateProfile(updateData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            const freshProfile = await fetchData(); // Refresh data and get it
            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...storedUser, fullName: freshProfile.fullName }));
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Update failed' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - User Info */}
                    <motion.div variants={fadeInUp} className="md:col-span-1 space-y-6">
                        {/* User Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4">
                                {profile?.fullName?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{profile?.fullName}</h2>
                            <p className="text-gray-500 text-sm">{profile?.email}</p>
                            <p className="text-gray-400 text-xs mt-2">
                                Member since {new Date(profile?.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Account Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Account
                            </h3>
                            <div className="p-4 rounded-xl bg-gray-100 text-gray-600">
                                <div className="font-bold text-lg mb-1">Standard Account</div>
                                <div className="text-sm text-gray-500">
                                    All dashboard tools are available.
                                </div>
                            </div>
                            <div className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium flex items-center justify-center">
                                Payments are not used in this app.
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Edit Profile & History */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Edit Profile Form */}
                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Edit Profile
                            </h3>

                            {message.text && (
                                <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password (optional)</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Recent History */}
                        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Recent History
                            </h3>

                            <div className="space-y-4">
                                {history.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No recent activity found.</p>
                                ) : (
                                    history.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                                <MessageSquare className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-semibold text-gray-900 capitalize">{item.action}</h4>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(item.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Support Button */}
            <button className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50">
                <MessageSquare className="w-6 h-6" />
            </button>
        </motion.div>
    );
}
