import "./Layout.css";

export default function Layout({ children }) {
  return (
    <main className=" text-center p-4 min-h-screen dark relative pb-16">
      {children}
    </main>
  );
}
