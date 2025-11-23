import { useRef, useCallback } from 'react';

export const useImageWorker = () => {
  const workerRef = useRef<Worker | null>(null);

  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      try {
        workerRef.current = new Worker(
          new URL('../workers/imageProcessor.worker.ts', import.meta.url),
          { type: 'module' }
        );
      } catch (error) {
        console.error('Failed to initialize worker:', error);
      }
    }
    return workerRef.current;
  }, []);

  const compressImage = useCallback(
    (blob: Blob, quality: number = 0.8): Promise<any> => {
      return new Promise((resolve, reject) => {
        const worker = initWorker();
        if (!worker) {
          reject(new Error('Worker not available'));
          return;
        }

        const handleMessage = (e: MessageEvent) => {
          if (e.data.type === 'COMPRESS_COMPLETE') {
            worker.removeEventListener('message', handleMessage);
            resolve(e.data.data);
          }
        };

        worker.addEventListener('message', handleMessage);
        worker.postMessage({ type: 'COMPRESS_IMAGE', data: { blob, quality } });
      });
    },
    [initWorker]
  );

  const resizeImage = useCallback(
    (blob: Blob, width: number, height: number): Promise<any> => {
      return new Promise((resolve, reject) => {
        const worker = initWorker();
        if (!worker) {
          reject(new Error('Worker not available'));
          return;
        }

        const handleMessage = (e: MessageEvent) => {
          if (e.data.type === 'RESIZE_COMPLETE') {
            worker.removeEventListener('message', handleMessage);
            resolve(e.data.data);
          }
        };

        worker.addEventListener('message', handleMessage);
        worker.postMessage({ type: 'RESIZE_IMAGE', data: { blob, width, height } });
      });
    },
    [initWorker]
  );

  return { compressImage, resizeImage };
};
