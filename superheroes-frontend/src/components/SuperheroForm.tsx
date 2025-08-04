import { useState, useEffect } from 'react';
import type { Superhero, CreateSuperheroData } from '../types/superhero';

interface SuperheroFormProps {
  superhero?: Superhero;
  onSubmit: (data: CreateSuperheroData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function SuperheroForm({ superhero, onSubmit, onCancel, isLoading = false }: SuperheroFormProps) {
  const [formData, setFormData] = useState<CreateSuperheroData>({
    name: '',
    realName: '',
    powers: [''],
    originStory: '',
    imageUrl: '',
    alignment: 'hero',
    universe: 'marvel'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (superhero) {
      setFormData({
        name: superhero.name,
        realName: superhero.realName,
        powers: superhero.powers.length > 0 ? superhero.powers : [''],
        originStory: superhero.originStory,
        imageUrl: superhero.imageUrl,
        alignment: superhero.alignment,
        universe: superhero.universe
      });
    }
  }, [superhero]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Superhero name is required';
    }

    if (!formData.realName.trim()) {
      newErrors.realName = 'Real name is required';
    }

    const validPowers = formData.powers.filter(power => power.trim().length > 0);
    if (validPowers.length === 0) {
      newErrors.powers = 'At least one power is required';
    }

    if (!formData.originStory.trim()) {
      newErrors.originStory = 'Origin story is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please provide a valid image URL (jpg, jpeg, png, gif, webp)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const validPowers = formData.powers.filter(power => power.trim().length > 0);
    onSubmit({
      ...formData,
      powers: validPowers
    });
  };

  const handlePowerChange = (index: number, value: string) => {
    const newPowers = [...formData.powers];
    newPowers[index] = value;
    setFormData({ ...formData, powers: newPowers });
  };

  const addPowerField = () => {
    setFormData({ ...formData, powers: [...formData.powers, ''] });
  };

  const removePowerField = (index: number) => {
    if (formData.powers.length > 1) {
      const newPowers = formData.powers.filter((_, i) => i !== index);
      setFormData({ ...formData, powers: newPowers });
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {superhero ? 'Edit Superhero' : 'Add New Superhero'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Superhero Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Spider-Man"
            />
            {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
          </div>

          {/* Real Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Real Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.realName ? 'input-error' : ''}`}
              value={formData.realName}
              onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
              placeholder="e.g., Peter Parker"
            />
            {errors.realName && <span className="text-error text-sm mt-1">{errors.realName}</span>}
          </div>

          {/* Powers */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Powers</span>
            </label>
            {formData.powers.map((power, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  value={power}
                  onChange={(e) => handlePowerChange(index, e.target.value)}
                  placeholder="e.g., Web-slinging"
                />
                {formData.powers.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removePowerField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary btn-sm mt-2"
              onClick={addPowerField}
            >
              Add Power
            </button>
            {errors.powers && <span className="text-error text-sm mt-1">{errors.powers}</span>}
          </div>

          {/* Origin Story */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Origin Story</span>
            </label>
            <textarea
              className={`textarea textarea-bordered h-24 ${errors.originStory ? 'textarea-error' : ''}`}
              value={formData.originStory}
              onChange={(e) => setFormData({ ...formData, originStory: e.target.value })}
              placeholder="Tell the superhero's origin story..."
            />
            {errors.originStory && <span className="text-error text-sm mt-1">{errors.originStory}</span>}
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              className={`input input-bordered ${errors.imageUrl ? 'input-error' : ''}`}
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <span className="text-error text-sm mt-1">{errors.imageUrl}</span>}
          </div>

          {/* Alignment */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Alignment</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.alignment}
              onChange={(e) => setFormData({ ...formData, alignment: e.target.value as 'hero' | 'villain' })}
            >
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
            </select>
          </div>

          {/* Universe */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Universe</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.universe}
              onChange={(e) => setFormData({ ...formData, universe: e.target.value as 'marvel' | 'dc' | 'other' })}
            >
              <option value="marvel">Marvel</option>
              <option value="dc">DC</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {superhero ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                superhero ? 'Update Superhero' : 'Create Superhero'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}