import React, { useState, useCallback } from 'react';
import { EditorOptions } from './types';
import Header from './components/Header';
import ControlsPanel from './components/ControlsPanel';
import EditorCanvas from './components/EditorCanvas';
import FileUpload from './components/FileUpload';

const App: React.FC = () => {
  const [options, setOptions] = useState<EditorOptions>({
    text: 'This is a secret message repeated over and over to create a hidden watermark.',
    fontSize: 2,
    density: 20000,
    color: '#ffffff',
    opacity: 0.1,
    avoidanceRadius: 100,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [avoidanceCenter, setAvoidanceCenter] = useState<{ x: number; y: number } | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
    setProcessedImageUrl(null); 
    setAvoidanceCenter(null);
  }, []);

  const handleProcessingChange = useCallback((isProcessing: boolean) => {
    setProcessing(isProcessing);
  }, []);

  const handleProcessingComplete = useCallback((dataUrl: string) => {
    setProcessedImageUrl(dataUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          <div className="lg:col-span-4 xl:col-span-3">
            <ControlsPanel 
              options={options}
              setOptions={setOptions}
              processing={processing}
              processedImageUrl={processedImageUrl}
              isImageLoaded={!!imageFile}
              avoidanceCenter={avoidanceCenter}
              setAvoidanceCenter={setAvoidanceCenter}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9 bg-gray-950/50 rounded-2xl shadow-lg border border-gray-700/50 flex items-center justify-center p-4 min-h-[400px] lg:min-h-0">
            {imageFile ? (
              <EditorCanvas 
                imageFile={imageFile}
                options={options}
                onProcessingComplete={handleProcessingComplete}
                onProcessingChange={handleProcessingChange}
                avoidanceCenter={avoidanceCenter}
                setAvoidanceCenter={setAvoidanceCenter}
              />
            ) : (
              <FileUpload onImageUpload={handleImageUpload} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;