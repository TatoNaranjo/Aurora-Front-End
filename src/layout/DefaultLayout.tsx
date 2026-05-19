import { Footer, Navbar } from "@/components/layout";

interface LayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar/>
      <main className="h-full flex-grow bg-background flex flex-col transition-colors duration-300">
        {children}
      </main>
      <Footer/>
    </>
  )
}
