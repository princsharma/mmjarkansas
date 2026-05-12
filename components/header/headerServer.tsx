import HeaderClient from "./headerClient";

const NAV_ITEMS = [
  { label: "Conditions", href: "#conditions", index: "01" },
  { label: "How It Works", href: "#steps", index: "02" },
  { label: "Pricing", href: "#pricing", index: "03" },
  { label: "Contact", href: "/contact-us", index: "04" },
];

export function HeaderServer() {
  return <HeaderClient items={NAV_ITEMS} />;
}

export default HeaderServer;
