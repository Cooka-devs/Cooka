import Footer from "../Footer";
import Header from "../Header";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
