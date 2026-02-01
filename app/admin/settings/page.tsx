'use client';

import React from "react"

import { useState } from 'react';
import { useQuery } from 'react-query';
import { paymentAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    examUnlockPrice: '150',
    professionalPlanPrice: '180',
    currency: 'USD',
    professionalPlanIntervalCount: '3',
    professionalPlanIntervalUnit: 'months',
    professionalPlanDescription: "What's included in your plan",
    professionalPlanFeatures: `Access to selected free exams
Full-length mock exams
Timed & full simulation modes
Interactive study mode
Progress tracking, performance dashboard & exam history
Detailed explanations with code references
All smart study tools`,
  });

  const [isSaving, setIsSaving] = useState(false);

  const { isLoading } = useQuery('pricing-settings', paymentAPI.getPricingSettings, {
    onSuccess: (response: any) => {
      const data = response?.data?.data;
      if (!data) return;
      setFormData({
        examUnlockPrice: data.examUnlockPrice?.toString() || '150',
        professionalPlanPrice: data.professionalPlanPrice?.toString() || '180',
        currency: data.currency || 'USD',
        professionalPlanIntervalCount: data.professionalPlanIntervalCount?.toString() || '3',
        professionalPlanIntervalUnit: data.professionalPlanIntervalUnit || 'months',
        professionalPlanDescription: data.professionalPlanDescription || "What's included in your plan",
        professionalPlanFeatures: Array.isArray(data.professionalPlanFeatures)
          ? data.professionalPlanFeatures.join('\n')
          : formData.professionalPlanFeatures,
      });
    },
    onError: (error: any) => {
      console.error('[v0] Pricing settings error:', error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const features = formData.professionalPlanFeatures
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

      await paymentAPI.updatePricing({
        examUnlockPrice: parseFloat(formData.examUnlockPrice),
        professionalPlanPrice: parseFloat(formData.professionalPlanPrice),
        currency: formData.currency,
        professionalPlanIntervalCount: parseInt(formData.professionalPlanIntervalCount, 10),
        professionalPlanIntervalUnit: formData.professionalPlanIntervalUnit,
        professionalPlanDescription: formData.professionalPlanDescription,
        professionalPlanFeatures: features,
      });
      toast.success('Settings saved successfully');
    } catch (error: any) {
      console.error('[v0] Save settings error:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage platform settings and configuration</p>
      </div>

      {/* Pricing Settings */}
      <Card className="p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Configuration</h2>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Exam Unlock Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Unlock Price</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{formData.currency}</span>
                <Input
                  type="number"
                  name="examUnlockPrice"
                  value={formData.examUnlockPrice}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  placeholder="150"
                  step="0.01"
                  min="0"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Price for unlocking individual exams</p>
          </div>

          {/* Professional Plan Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Plan Price</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{formData.currency}</span>
                <Input
                  type="number"
                  name="professionalPlanPrice"
                  value={formData.professionalPlanPrice}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  placeholder="180"
                  step="0.01"
                  min="0"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Price for the professional plan</p>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                disabled={isSaving}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD (USD)</option>
                <option value="EUR">EUR (EUR)</option>
                <option value="GBP">GBP (GBP)</option>
                <option value="CAD">CAD (CAD)</option>
                <option value="AUD">AUD (AUD)</option>
              </select>
            )}
          </div>

          <hr className="my-2" />

          <h3 className="text-lg font-semibold text-gray-900">Professional Plan</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interval Count</label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  type="number"
                  name="professionalPlanIntervalCount"
                  value={formData.professionalPlanIntervalCount}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  placeholder="3"
                  min="1"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interval Unit</label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <select
                  name="professionalPlanIntervalUnit"
                  value={formData.professionalPlanIntervalUnit}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="months">Months</option>
                  <option value="weeks">Weeks</option>
                  <option value="years">Years</option>
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Description</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                type="text"
                name="professionalPlanDescription"
                value={formData.professionalPlanDescription}
                onChange={handleInputChange}
                disabled={isSaving}
                placeholder="What's included in your plan"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Features (one per line)</label>
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <textarea
                name="professionalPlanFeatures"
                value={formData.professionalPlanFeatures}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    professionalPlanFeatures: e.target.value,
                  }))
                }
                disabled={isSaving}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">These render as bullets in the plan card.</p>
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Security Settings */}
      <Card className="p-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Session Management</h3>
            <p className="text-sm text-gray-600 mb-4">Manage user sessions and login security</p>
            <Button variant="outline" className="w-full bg-transparent">
              View Active Sessions
            </Button>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">API Keys</h3>
            <p className="text-sm text-gray-600 mb-4">Manage API keys for integrations</p>
            <Button variant="outline" className="w-full bg-transparent">
              Manage API Keys
            </Button>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Backup & Export</h3>
            <p className="text-sm text-gray-600 mb-4">Export your data or create backups</p>
            <Button variant="outline" className="w-full bg-transparent">
              Export Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
