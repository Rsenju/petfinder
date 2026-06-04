import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
