export type Step = {
  index: string;
  title: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    index: "01",
    title: "Create Your Account",
    body: "Start your Arkansas medical marijuana card application and share basic information about your medical history.",
  },
  {
    index: "02",
    title: "Telehealth Evaluation",
    body: "Meet an Arkansas-licensed physician online to review your qualifying condition and medical history in a private, HIPAA-secure video visit.",
  },
  {
    index: "03",
    title: "Receive Your Certification",
    body: "If approved, your physician issues a written certification you submit to the Arkansas Department of Health along with the $50 state application fee.",
  },
  {
    index: "04",
    title: "ADH Issues Your Card",
    body: "The ADH Medical Marijuana Section processes approved applications and issues your Arkansas Medical Marijuana Card, valid for one year.",
  },
];

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is an Arkansas Medical Marijuana Card and who needs one?",
    a: "An Arkansas Medical Marijuana Card (issued by the Arkansas Department of Health under Amendment 98) authorizes patients with a qualifying medical condition to legally purchase, possess, and use medical cannabis from licensed Arkansas dispensaries.",
  },
  {
    q: "How do I qualify for an Arkansas Medical Marijuana Card under Amendment 98?",
    a: "You must be a permanent Arkansas resident with a physician-certified qualifying condition listed under Amendment 98 — including cancer, glaucoma, PTSD, intractable pain, severe arthritis, fibromyalgia, and 12 other conditions. Our platform's licensed Arkansas physicians review your case to confirm eligibility.",
  },
  {
    q: "Can I apply for an Arkansas Medical Marijuana Card online?",
    a: "Yes. Our entire evaluation is conducted online via secure, HIPAA-compliant telehealth. After your physician issues a written certification, you submit it to the Arkansas Department of Health through the state online portal along with the $50 state application fee.",
  },
  {
    q: "How much does it cost to get an Arkansas Medical Marijuana Card?",
    a: "Our physician evaluation fee is $199, billed only if you are approved (money-back guarantee otherwise). The Arkansas Department of Health charges a separate $50 state application fee paid directly to ADH when you submit your certification.",
  },
  {
    q: "How long is an Arkansas Medical Marijuana Card valid?",
    a: "Your Arkansas Medical Marijuana Card is valid for one year from the date of issuance. You must renew annually with an updated physician certification and the ADH renewal fee.",
  },
  {
    q: "How much cannabis can I purchase or possess in Arkansas?",
    a: "Arkansas cardholders may purchase or possess up to 2.5 ounces of usable medical cannabis over any 14-day period from licensed Arkansas dispensaries.",
  },
  {
    q: "Does Arkansas accept out-of-state medical marijuana cards?",
    a: "Yes — Arkansas extends reciprocity to visiting patients with a valid out-of-state medical cannabis card for qualifying conditions, for up to 90 days per visit. Visiting patients must register with ADH before purchasing.",
  },
  {
    q: "Can I designate a caregiver in Arkansas?",
    a: "Yes. Arkansas patients may designate a registered caregiver to purchase medical cannabis on their behalf. Caregivers must register with the Arkansas Department of Health, be 21 or older, and pass a state background check.",
  },
];
