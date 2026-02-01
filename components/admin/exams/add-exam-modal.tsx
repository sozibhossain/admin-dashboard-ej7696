'use client';

import React, { useEffect } from "react"

import { useState } from 'react';
import { examAPI } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  exam?: any;
  isEdit?: boolean;
}

export function AddExamModal({ isOpen, onClose, onSuccess, exam, isEdit = false }: AddExamModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    effectivitySheetContent: '',
    bodyOfKnowledgeContent: '',
    n_question: '',
    durationMinutes: '',
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (isEdit && exam) {
      setFormData({
        name: exam.name || '',
        effectivitySheetContent: exam.effectivitySheetContent || '',
        bodyOfKnowledgeContent: exam.bodyOfKnowledgeContent || '',
        n_question: exam.n_question?.toString?.() || '',
        durationMinutes: exam.durationMinutes?.toString?.() || '',
        image: null,
      });
      setPreviewUrl(exam.image?.url || null);
    } else {
      setFormData({
        name: '',
        effectivitySheetContent: '',
        bodyOfKnowledgeContent: '',
        n_question: '',
        durationMinutes: '',
        image: null,
      });
      setPreviewUrl(null);
    }
  }, [isOpen, isEdit, exam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.effectivitySheetContent || !formData.bodyOfKnowledgeContent) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('effectivitySheetContent', formData.effectivitySheetContent);
      form.append('bodyOfKnowledgeContent', formData.bodyOfKnowledgeContent);
      form.append('n_question', formData.n_question || '0');
      form.append('durationMinutes', formData.durationMinutes || '0');
      if (formData.image) {
        form.append('image', formData.image);
      }

      if (isEdit && exam?._id) {
        await examAPI.updateExam(exam._id, form);
        toast.success('Exam updated successfully');
      } else {
        await examAPI.createExam(form);
        toast.success('Exam created successfully');
      }
      setFormData({
        name: '',
        effectivitySheetContent: '',
        bodyOfKnowledgeContent: '',
        n_question: '',
        durationMinutes: '',
        image: null,
      });
      setPreviewUrl(null);
      onSuccess();
    } catch (error: any) {
      console.error('[v0] Exam save error:', error);
      toast.error(error.response?.data?.message || 'Failed to save exam');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl" style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #E5EEFF 20.91%, #EDF3FF 41.83%, #DEE9FF 69.71%, #FFFFFF 100%)',
        }}>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update exam details' : 'Create a new exam for your platform'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name</label>
            <Input
              name="name"
              placeholder="Type your exam name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Effectivity Sheet Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effectivity Sheet Content
            </label>
            <Textarea
              name="effectivitySheetContent"
              placeholder="Type your exam Content"
              value={formData.effectivitySheetContent}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={4}
            />
          </div>

          {/* Body of Knowledge Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body of Knowledge Content
            </label>
            <Textarea
              name="bodyOfKnowledgeContent"
              placeholder="Type your exam Content"
              value={formData.bodyOfKnowledgeContent}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={4}
            />
          </div>

          {/* Questions and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
              <Input
                name="n_question"
                type="number"
                placeholder="10"
                value={formData.n_question}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Minutes)</label>
              <Input
                name="durationMinutes"
                type="number"
                placeholder="30"
                value={formData.durationMinutes}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload an image as logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              {previewUrl ? (
                <div className="space-y-4">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-24 h-24 mx-auto rounded-lg object-cover" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, image: null }));
                      setPreviewUrl(null);
                    }}
                    disabled={isLoading}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">Upload an image as logo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-6">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Update Exam' : 'Add Exam'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
