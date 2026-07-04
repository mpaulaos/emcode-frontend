import { WebcamCapture } from "../../components/webcam/WebcamCapture";

export default function WebcamTestPage() {
  return (
    <main className="mx-auto w-full max-w-310 px-6 py-12">
      <h1 className="text-2xl font-heading font-bold text-text-body mb-6">
        Captura de Cámara
      </h1>

      <WebcamCapture facingMode="environment" />
    </main>
  );
}
