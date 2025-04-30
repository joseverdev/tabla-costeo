import "./Layout.css";

export default function Layout({ children, paddingBottom }) {
  return (
    <main
      className={`text-center center-container p-4 min-h-screen dark relative ${paddingBottom ? "" : "pb-12"
        }`}
    >
      <div className="overflow-y-auto scrollbar-hide mt-8">
        {children}

      </div>
    </main>
  );
}
