import HeaderClient from "./headerClient";

const NAV_ITEMS = [
  {
    label: "Conditions",
    href: "#conditions",
    index: "01",
    title: "View Arkansas medical marijuana qualifying conditions",
  },
  {
    label: "How It Works",
    href: "#steps",
    index: "02",
    title: "See how the Arkansas medical marijuana card process works",
  },
  {
    label: "Pricing",
    href: "#pricing",
    index: "03",
    title: "View Arkansas medical marijuana evaluation pricing",
  },
  {
    label: "Contact",
    href: "/contact-us",
    index: "04",
    title: "Contact our Arkansas patient advocates",
  },
];

export function HeaderServer() {
  return <HeaderClient items={NAV_ITEMS} />;
}

export default HeaderServer;
