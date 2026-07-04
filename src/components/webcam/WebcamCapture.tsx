import Webcam from "react-webcam";
import { Button } from "../ui/Button";
import { useWebcamCapture } from "../../hooks/useWebcamCapture";
import { useDescribeImage } from "../../hooks/useDescribeImage";
import { useSpeechContext } from "../../context/SpeechContext";

interface WebcamCaptureProps {
  className?: string;
  facingMode?: "user" | "environment";
  maxWidth?: number;
  maxHeight?: number;
}

export function WebcamCapture({
  className,
  facingMode = "environment",
  maxWidth = 640,
  maxHeight = 480,
}: WebcamCaptureProps) {
  const { webcamRef, lastCapture, capture, clearCapture } =
    useWebcamCapture();

  const { description, isLoading, error, describeImage, clearDescription } =
    useDescribeImage();

  const { speak, stop } = useSpeechContext();

  const handleDescribe = async () => {
    if (!lastCapture) return;
    stop();
    const result = await describeImage(lastCapture);
    if (result) speak(result);
  };

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      <div className="relative overflow-hidden rounded-lg bg-neutral-900 aspect-video">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          videoConstraints={{
            facingMode,
            width: maxWidth,
            height: maxHeight,
          }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onPress={() => {
          if (lastCapture) clearCapture();
          capture();
        }}>
          {lastCapture ? "Nueva captura" : "Capturar"}
        </Button>

        {lastCapture && (
          <Button
            variant="primary"
            onPress={handleDescribe}
            isDisabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Describir imagen"}
          </Button>
        )}
      </div>

      {lastCapture && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-text-body">
            Captura
          </span>
          <img
            src={lastCapture}
            alt="Captura de cámara"
            className="rounded-lg border border-border-card max-h-48 object-contain"
          />
        </div>
      )}

      {isLoading && (
        <div className="flex items-center gap-2 rounded-lg border border-border-card bg-neutral-900 p-4">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-text-body border-t-transparent" />
          <span className="text-sm text-text-body">Procesando imagen...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {description && !isLoading && (
        <div className="flex flex-col gap-2 rounded-lg border border-border-card bg-neutral-900 p-4">
          <span className="text-sm font-medium text-text-body">
            Descripción
          </span>
          <p className="text-sm text-text-body">{description}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="quiet" onPress={() => speak(description)}>
              Repetir descripción
            </Button>
            <Button variant="quiet" onPress={clearDescription}>
              Limpiar descripción
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
