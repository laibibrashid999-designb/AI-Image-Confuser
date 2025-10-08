import React from 'react';
import { EditorOptions } from '../types';

interface ControlsPanelProps {
  options: EditorOptions;
  setOptions: React.Dispatch<React.SetStateAction<EditorOptions>>;
  processing: boolean;
  processedImageUrl: string | null;
  isImageLoaded: boolean;
  avoidanceCenter: { x: number; y: number } | null;
  setAvoidanceCenter: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  options,
  setOptions,
  processing,
  processedImageUrl,
  isImageLoaded,
  avoidanceCenter,
  setAvoidanceCenter,
}) => {

  const handleOptionChange = <K extends keyof EditorOptions>(key: K, value: EditorOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const DownloadButton: React.FC<{ href: string | null }> = ({ href }) => (
    <a
      href={href ?? '#'}
      download="microprinted-image.png"
      onClick={(e) => !href && e.preventDefault()}
      className={`
        w-full text-center font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
        ${href 
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/40' 
          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Download Image
    </a>
  );
  
  return (
    <div className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700/50 space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-3 text-cyan-300">Controls</h2>
        {processing && (
          <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 p-2 mt-4 bg-gray-900/50 rounded-md">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Updating Preview...</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-300">Microprint Text</label>
        <textarea
          id="text-input"
          value={options.text}
          onChange={(e) => handleOptionChange('text', e.target.value)}
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          disabled={!isImageLoaded}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="font-size" className="block text-sm font-medium text-gray-300">Font Size: <span className="font-bold text-cyan-400">{options.fontSize}px</span></label>
        <input
          id="font-size"
          type="range"
          min="1"
          max="10"
          step="1"
          value={options.fontSize}
          onChange={(e) => handleOptionChange('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          disabled={!isImageLoaded}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="density" className="block text-sm font-medium text-gray-300">Density: <span className="font-bold text-cyan-400">{options.density.toLocaleString()} words</span></label>
        <input
          id="density"
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={options.density}
          onChange={(e) => handleOptionChange('density', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          disabled={!isImageLoaded}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="opacity" className="block text-sm font-medium text-gray-300">Opacity: <span className="font-bold text-cyan-400">{Math.round(options.opacity * 100)}%</span></label>
        <input
          id="opacity"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={options.opacity}
          onChange={(e) => handleOptionChange('opacity', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          disabled={!isImageLoaded}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="color" className="block text-sm font-medium text-gray-300">Color</label>
        <input
          id="color"
          type="color"
          value={options.color}
          onChange={(e) => handleOptionChange('color', e.target.value)}
          className="w-full h-10 p-1 bg-gray-900 border border-gray-600 rounded-md cursor-pointer"
          disabled={!isImageLoaded}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-700/50">
        <h3 className="text-lg font-semibold text-cyan-300">Avoidance Zone</h3>
         <p className="text-xs text-gray-400">Click on the image to set a point to avoid printing text on.</p>
        <div className="space-y-2">
          <label htmlFor="avoidance-radius" className="block text-sm font-medium text-gray-300">Radius: <span className="font-bold text-cyan-400">{options.avoidanceRadius}px</span></label>
          <input
            id="avoidance-radius"
            type="range"
            min="0"
            max="500"
            step="5"
            value={options.avoidanceRadius}
            onChange={(e) => handleOptionChange('avoidanceRadius', Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            disabled={!avoidanceCenter}
          />
        </div>
        <button
          onClick={() => setAvoidanceCenter(null)}
          disabled={!avoidanceCenter}
          className="w-full bg-red-500/80 hover:bg-red-600/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          Clear Zone
        </button>
      </div>
      
      <div className="pt-4 mt-auto">
        <DownloadButton href={processedImageUrl} />
      </div>
    </div>
  );
};

export default ControlsPanel;