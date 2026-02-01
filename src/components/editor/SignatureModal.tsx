"use client";

import { useState, useCallback } from "react";
import SignatureCanvas from "@/components/SignatureCanvas";

interface SignatureModalProps {
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
}

type SignatureMode = "draw" | "type" | "upload";

const signatureFonts = [
  { name: "Script", fontFamily: "'Brush Script MT', cursive", style: "italic" },
  { name: "Elegant", fontFamily: "'Snell Roundhand', 'Brush Script MT', cursive", style: "normal" },
  { name: "Formal", fontFamily: "'Edwardian Script ITC', 'Brush Script MT', cursive", style: "normal" },
  { name: "Casual", fontFamily: "'Comic Sans MS', cursive", style: "normal" },
  { name: "Classic", fontFamily: "'Times New Roman', serif", style: "italic" },
  { name: "Modern", fontFamily: "'Segoe UI', sans-serif", style: "italic" },
];

export default function SignatureModal({ onClose, onSave }: SignatureModalProps) {
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("draw");
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [typedSignature, setTypedSignature] = useState("");
  const [selectedFont, setSelectedFont] = useState(0);

  const handleTypedSignatureToDataUrl = useCallback(() => {
    if (!typedSignature) return null;
    
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    
    // Transparent background - no fill
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = "black";
    const font = signatureFonts[selectedFont];
    ctx.font = `${font.style} 48px ${font.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);
    
    return canvas.toDataURL("image/png");
  }, [typedSignature, selectedFont]);

  const handleUploadSignature = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setSignatureDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSave = () => {
    let dataUrl = signatureDataUrl;
    if (signatureMode === "type") {
      dataUrl = handleTypedSignatureToDataUrl();
    }
    if (dataUrl) {
      onSave(dataUrl);
    }
  };

  const isValid = 
    (signatureMode === "draw" && signatureDataUrl) ||
    (signatureMode === "type" && typedSignature) ||
    (signatureMode === "upload" && signatureDataUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Signature</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {/* Mode tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-8">
              {[
                { id: "draw", label: "Draw", icon: "✏️" },
                { id: "type", label: "Type", icon: "⌨️" },
                { id: "upload", label: "Upload", icon: "📤" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSignatureMode(mode.id as SignatureMode)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    signatureMode === mode.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {mode.icon} {mode.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Signature input */}
          <div className="py-4">
            {signatureMode === "draw" && (
              <SignatureCanvas onSignatureChange={setSignatureDataUrl} />
            )}
            
            {signatureMode === "type" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Type your name"
                  className="w-full px-4 py-3 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500"
                  style={{ 
                    fontFamily: signatureFonts[selectedFont].fontFamily,
                    fontStyle: signatureFonts[selectedFont].style,
                  }}
                />
                
                {/* Font choices */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Choose a style:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {signatureFonts.map((font, index) => (
                      <button
                        key={font.name}
                        onClick={() => setSelectedFont(index)}
                        className={`p-3 border-2 rounded-lg text-left transition ${
                          selectedFont === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xs text-gray-500 block mb-1">{font.name}</span>
                        <span 
                          className="text-lg"
                          style={{ 
                            fontFamily: font.fontFamily,
                            fontStyle: font.style,
                          }}
                        >
                          {typedSignature || "Your Name"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {signatureMode === "upload" && (
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadSignature}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {signatureDataUrl && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <img src={signatureDataUrl} alt="Signature" className="max-h-24 mx-auto" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              Add Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
