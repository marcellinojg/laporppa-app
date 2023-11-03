/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c81e4f",
        primaryDarker: "#AD1B44",
        kategoriDitangani: "#D7EFFC",
        kategoriDitanganiDarker: "#009EF7",
        kategoriVerifikasi: "#EAE1FE",
        kategoriVerifikasiDarker: '#7239EA',
        kategoriSelesai: "#D7FFEB",
        kategoriSelesaiDarker: '#47C890',        
        kategoriRujuk: "#FFDFE9",
        kategoriRujukDarker: '#F1416C',
        kategoriDikembalikan: "#FBDCC6",
        kategoriDikembalikanDarker: "#f97316",
        inputBorder: "#CCCCCC",
        inputBorderHover: "#B3B3B3"
      },
    },
  },
  plugins: [],
};
