"use client";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded bg-gray-200"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded bg-[#0032ff] text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
