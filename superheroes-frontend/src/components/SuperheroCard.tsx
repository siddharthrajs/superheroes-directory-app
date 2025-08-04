import type { Superhero } from '../types/superhero';

interface SuperheroCardProps {
  superhero: Superhero;
  onEdit: (superhero: Superhero) => void;
  onDelete: (id: string) => void;
}

export default function SuperheroCard({ superhero, onEdit, onDelete }: SuperheroCardProps) {
  const getAlignmentBadgeClass = (alignment: string) => {
    return alignment === 'hero' ? 'badge-success' : 'badge-error';
  };

  const getUniverseBadgeClass = (universe: string) => {
    switch (universe) {
      case 'marvel':
        return 'badge-error';
      case 'dc':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={superhero.imageUrl}
          alt={superhero.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x600/374151/ffffff?text=No+Image';
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {superhero.name}
          <div className="badge badge-secondary">{superhero.universe.toUpperCase()}</div>
        </h2>
        <p className="text-sm opacity-70">Real Name: {superhero.realName}</p>
        
        <div className="my-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {superhero.powers.slice(0, 3).map((power, index) => (
              <span key={index} className="badge badge-outline badge-sm">
                {power}
              </span>
            ))}
            {superhero.powers.length > 3 && (
              <span className="badge badge-outline badge-sm">
                +{superhero.powers.length - 3} more
              </span>
            )}
          </div>
        </div>

        <p className="text-sm line-clamp-3">
          {superhero.originStory}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className={`badge ${getAlignmentBadgeClass(superhero.alignment)}`}>
            {superhero.alignment}
          </div>
          
          <div className="card-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onEdit(superhero)}
            >
              Edit
            </button>
            <button 
              className="btn btn-error btn-sm"
              onClick={() => onDelete(superhero._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}