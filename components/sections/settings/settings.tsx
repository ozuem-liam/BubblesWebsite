"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings as SettingsIcon, ShoppingBag, Shield, HelpCircle, X } from "lucide-react";

export const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="text-gray-800 mr-3" size={24} />
          <h1 className="text-gray-800 text-xl font-bold">Account Settings</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 sticky top-20">
              <nav className="space-y-1">
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf8ar0Decnr26f16zz7ck1MjcYbwQwrnva7JOQGYyZ6JA0oAQ/viewform?usp=header" 
                  className="flex items-center px-3 py-2 text-gray-800 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200"
                >
                  <ShoppingBag size={18} className="mr-2" /> Request a Vendor
                </a>
                <a 
                  href="#security" 
                  className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <Shield size={18} className="mr-2" /> Security
                </a>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdhe7oJaxHU4KKbJwneB77E6v8XWWNYwTGv2Od2ULLG76EHxg/viewform?usp=header" 
                  className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <HelpCircle size={18} className="mr-2" /> Help & Support
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Security Section */}
            <div id="security" className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-gray-800 text-xl font-semibold mb-4">Security Settings</h2>
              
              <button 
                className="bg_linear-gradient hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
              
              {/* Password Change Modal */}
              {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-gray-800 text-lg font-semibold">Change Password</h3>
                      <button 
                        onClick={() => setShowPasswordModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium bg_linear-gradient mb-1">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium bg_linear-gradient mb-1">New Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium bg_linear-gradient mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-2">
                        <button 
                          onClick={() => setShowPasswordModal(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help & Support Section */}
            <div id="help" className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h2 className="text-gray-800 text-xl font-semibold mb-4">Help & Support</h2>
              <p className="text-gray-600 mb-4">
                Need assistance? Submit a support request and our team will get back to you.
              </p>
              <Link 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdcmj7CQwbj0YPB8VuGa9FhYrYF8-Yx3HRIzUQQAJjJM3J1pQ/viewform" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg_linear-gradient text-white hover:bg-blue-700 px-4 py-2 rounded inline-block transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}