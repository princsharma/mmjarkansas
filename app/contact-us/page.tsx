import HeaderServer from "@/components/header/headerServer";
import Footer from "@/components/footer/footer";
import ContactPageContent from "./ContactPageContent";

export { contactMetadata as metadata } from "./metadata";

export default function ContactUsPage() {
  return (
    <>
      <HeaderServer />
      <ContactPageContent />
      <Footer />
    </>
  );
}
