import iconImg from "/icon.png";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <img src={iconImg} alt="Loading..." className="w-24 h-24 object-contain" />
    </div>
  );
}
