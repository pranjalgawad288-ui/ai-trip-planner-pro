import { ClipLoader } from "react-spinners";

export default function Loader({ size = 40, fullScreen = false }) {
  const wrapperClass = fullScreen
    ? "flex items-center justify-center h-screen"
    : "flex items-center justify-center py-10";

  return (
    <div className={wrapperClass}>
      <ClipLoader color="#2563EB" size={size} />
    </div>
  );
}
