'use client';

import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, X, Plus } from 'lucide-react';

interface PlanItem {
  id: string;
  text: string;
}

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  planData?: {
    id: string;
    name: string;
    price: number;
    duration: string;
    items: PlanItem[];
    note: string;
    status: string;
  };
  isEdit?: boolean;
}

export function AddPlanModal({
  isOpen,
  onClose,
  onSuccess,
  planData,
  isEdit = false,
}: AddPlanModalProps) {
  const [formData, setFormData] = useState({
    name: planData?.name || '',
    price: planData?.price?.toString() || '',
    duration: planData?.duration || 'Monthly',
    items: planData?.items || [{ id: '1', text: '' }],
    note: planData?.note || '',
    status: planData?.status || 'Active',
  });

  const [newItem, setNewItem] = useState('');

  const { mutate: savePlan, isLoading } = useMutation(
    async () => {
      throw new Error('Subscription plan management is not supported by the current backend.');
    },
    {
      onSuccess: () => {
        toast.success(
          isEdit ? 'Plan updated successfully' : 'Plan created successfully'
        );
        onSuccess?.();
        onClose();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to save plan'
        );
      },
    }
  );

  const addItem = () => {
    if (newItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          { id: Date.now().toString(), text: newItem },
        ],
      }));
      setNewItem('');
    }
  };

  const removeItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateItemText = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, text } : item
      ),
    }));
  };

  const isFormValid =
    formData.name &&
    formData.price &&
    formData.items.length > 0 &&
    formData.items.every((item) => item.text.trim());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Plan' : 'Add New Plan'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="Starter"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="price">Plan Price</Label>
              <div className="flex items-center">
                <span className="mr-2 text-lg">$</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="500"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Plan Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) =>
                  setFormData({ ...formData, duration: value })
                }
              >
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="note">Plan Note</Label>
              <Input
                id="note"
                placeholder="Add a short note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>
          </div>

          {/* Plan Items */}
          <div className="space-y-3">
            <Label>Plan Items</Label>
            <div className="space-y-2">
              {formData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <Input
                    placeholder="Up to 2 practice questions per certification"
                    value={item.text}
                    onChange={(e) =>
                      updateItemText(item.id, e.target.value)
                    }
                    className="flex-1"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Item */}
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Enter new plan item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addItem();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                className="px-3 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => savePlan()}
              disabled={!isFormValid || isLoading}
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Plan'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
