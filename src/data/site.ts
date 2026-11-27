/**
 * ============================================================
 *  SITE CONFIGURATION — edit this file to make the site yours.
 * ============================================================
 */

export const SITE = {
  brand: "XYZ......",
  brandSuffix: "Tiles",
  tagline: "Tiles · Marble · Stone",
  established: 1998,

  // WhatsApp number in international format, digits only (no + or spaces)
  whatsappNumber: "919999999999",
  phoneDisplay: "+91 99999 99999",
  phoneHref: "tel:+919999999999",
  email: "studio@aureliasurfaces.com",

  address: {
    lines: ["XYZ...... Tiles Design Gallery", "12 Marble Arch Road, Design District", "Your City, 000 000"],
    hours: ["Mon – Sat · 10:00 – 19:00", "Sunday · By appointment"],
  },

  // Paste a Google Maps "Embed a map" URL (src="...") here to replace the placeholder.
  // Example: "https://www.google.com/maps/embed?pb=!1m18!1m12..."
  googleMapsEmbedUrl: "",
  googleMapsLink: "https://maps.google.com/?q=marble+showroom",

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],

  /**
   * ENQUIRY FORM BACKEND (Web3Forms — free, no server needed)
   * 1. Go to https://web3forms.com, enter the email that should receive enquiries.
   * 2. Copy the Access Key they email you.
   * 3. Paste it below, OR set it as VITE_WEB3FORMS_KEY in a .env file.
   * Until a key is set, the form will NOT pretend to succeed — it will tell the
   * visitor to use WhatsApp instead.
   */
  web3formsAccessKey: (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || "",
};

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
