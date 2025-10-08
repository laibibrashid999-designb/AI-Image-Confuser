import React, { useRef, useEffect, useCallback } from 'react';
import { EditorOptions } from '../types';

interface EditorCanvasProps {
  imageFile: File;
  options: EditorOptions;
  onProcessingComplete: (dataUrl: string) => void;
  onProcessingChange: (isProcessing: boolean) => void;
  avoidanceCenter: { x: number; y: number } | null;
  setAvoidanceCenter: (center: { x: number; y: number } | null) => void;
}

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const EditorCanvas: React.FC<EditorCanvasProps> = ({ 
  imageFile, 
  options, 
  onProcessingComplete,
  onProcessingChange,
  avoidanceCenter,
  setAvoidanceCenter
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageFile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = URL.createObjectURL(imageFile);
    await new Promise(resolve => image.onload = resolve);

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);

    const { text, fontSize, density, color, opacity, avoidanceRadius } = options;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = hexToRgba(color, opacity);
    
    const radiusSq = avoidanceRadius * avoidanceRadius;

    for (let i = 0; i < density; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      if (avoidanceCenter) {
        const dx = x - avoidanceCenter.x;
        const dy = y - avoidanceCenter.y;
        if (dx * dx + dy * dy < radiusSq) {
          continue;
        }
      }
      ctx.fillText(text, x, y);
    }
    
    // Draw visual marker for avoidance zone
    if (avoidanceCenter) {
      // Draw radius outline
      ctx.beginPath();
      ctx.arc(avoidanceCenter.x, avoidanceCenter.y, avoidanceRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 100, 100, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw center point
      ctx.beginPath();
      ctx.arc(avoidanceCenter.x, avoidanceCenter.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      ctx.fill();
    }

    onProcessingComplete(canvas.toDataURL('image/png'));
    URL.revokeObjectURL(image.src); // Clean up object URL

  }, [imageFile, options, onProcessingComplete, avoidanceCenter]);

  useEffect(() => {
    onProcessingChange(true);
    const handler = setTimeout(() => {
      drawCanvas().finally(() => {
        onProcessingChange(false);
      });
    }, 300); // Debounce updates

    return () => {
      clearTimeout(handler);
    };
  }, [drawCanvas, onProcessingChange]);
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const canvasX = (e.clientX - rect.left) * scaleX;
    const canvasY = (e.clientY - rect.top) * scaleY;
    
    setAvoidanceCenter({ x: canvasX, y: canvasY });
  };

  return (
    <div className="w-full h-full flex items-center justify-center cursor-crosshair">
        <canvas 
          ref={canvasRef} 
          onClick={handleCanvasClick}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
    </div>
  );
};

export default EditorCanvas;