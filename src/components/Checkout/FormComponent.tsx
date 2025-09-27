"use client";

interface FormComponentProps {
  nama: string;
  setNama: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  whatsapp: string;
  setWhatsapp: (value: string) => void;
}

export default function FormComponent({ nama, setNama, email, setEmail, whatsapp, setWhatsapp }: FormComponentProps) {
  return (
    <div className="form-pelanggan-wrapper">
      <div className="mb-4">
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
          Nama
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Masukkan Nama pelanggan"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ">
          Alamat Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Masukkan Email Pelanggan"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          Nomor Whatsapp
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Masukkan Nomor Whatsapp Pelanggan"
        />
        <small>Jika terjadi kesalahan, kami akan menghubungi ke nomor ini.</small>
      </div>
    </div>
  );
}
