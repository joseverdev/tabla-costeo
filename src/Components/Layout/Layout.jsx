import "./Layout.css";

export default function Layout({ children, paddingBottom }) {
  return (
    <main
      className={`text-center p-4 min-h-screen dark relative ${
        paddingBottom ? "" : "pb-12"
      }`}
    >
      {children}
    </main>
  );
}
