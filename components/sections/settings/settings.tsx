"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings as SettingsIcon, ShoppingBag, Shield, HelpCircle, X } from "lucide-react";

export const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="text-white mr-3" size={24} />
          <h1 className="text-white text-2xl font-bold">Account Settings</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-[#001a3f] rounded-lg p-4 border border-[#1a3b6d] sticky top-20">
              <nav className="space-y-1">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdhe7oJaxHU4KKbJwneB77E6v8XWWNYwTGv2Od2ULLG76EHxg/viewform?usp=header" className="flex items-center px-3 py-2 text-white rounded-md bg-[#0e2d5e] font-medium">
                  <ShoppingBag size={18} className="mr-2" /> Request Vendor
                </a>
                <a href="#security" className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#0e2d5e] rounded-md">
                  <Shield size={18} className="mr-2" /> Security
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdhe7oJaxHU4KKbJwneB77E6v8XWWNYwTGv2Od2ULLG76EHxg/viewform?usp=header" className="flex items-center px-3 py-2 text-gray-300 hover:bg-[#0e2d5e] rounded-md">
                  <HelpCircle size={18} className="mr-2" /> Help & Support
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Vendor Section */}
            <div id="vendor" className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
              <h2 className="text-white text-xl font-semibold mb-2">Request Vendor</h2>
              <p className="text-[#CCD0D4] mb-4">
                Submit a request to become a vendor or find vendors near your location.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfY7JqYhReoFENnEZCfRZ9_JXed1Nq-x6JVZgmhjgyUKVPCdw/viewform" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#bfdbfe] text-[#001D48] hover:bg-[#a3c4fd] px-4 py-2 rounded flex-1 text-center"
                  >
                    Request Vendor Status
                  </Link>
                  <button className="bg-[#1a3b6d] text-white hover:bg-[#254b82] px-4 py-2 rounded flex-1">
                    Find Nearby Vendors
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-[#001a3f] rounded-md border border-[#1a3b6d]">
                  <h3 className="text-white text-md font-medium mb-2">Current Vendor Status</h3>
                  <p className="text-gray-300">Not a vendor yet. Submit a request to get started.</p>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div id="security" className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
              <h2 className="text-white text-xl font-semibold mb-4">Security Settings</h2>
              
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
              
              {/* Password Change Modal */}
              {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d] max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white text-lg font-semibold">Change Password</h3>
                      <button 
                        onClick={() => setShowPasswordModal(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-[#001a3f] border border-[#1a3b6d] rounded px-3 py-2 text-white"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-[#001a3f] border border-[#1a3b6d] rounded px-3 py-2 text-white"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full bg-[#001a3f] border border-[#1a3b6d] rounded px-3 py-2 text-white"
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-2">
                        <button 
                          onClick={() => setShowPasswordModal(false)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help & Support Section */}
            <div id="help" className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
              <h2 className="text-white text-xl font-semibold mb-4">Help & Support</h2>
              <p className="text-[#CCD0D4] mb-4">
                Need assistance? Submit a support request and our team will get back to you.
              </p>
              <Link 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdcmj7CQwbj0YPB8VuGa9FhYrYF8-Yx3HRIzUQQAJjJM3J1pQ/viewform" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a3b6d] text-white hover:bg-[#254b82] px-4 py-2 rounded inline-block"
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