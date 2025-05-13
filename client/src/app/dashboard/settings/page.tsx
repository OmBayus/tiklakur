export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ayarlar</h1>
      <p className="text-gray-700">
        Hesap bilgilerinizi güncelleyebilir veya tercihleriniz üzerinde
        değişiklik yapabilirsiniz.
      </p>

      {/* Örnek ayar alanı */}
      <div className="border rounded p-4 bg-gray-50 space-y-2">
        <div>
          <label className="block text-sm font-medium">E-posta</label>
          <input
            type="email"
            defaultValue="cemil@example.com"
            className="mt-1 w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bildirimler</label>
          <select className="mt-1 w-full border px-3 py-2 rounded">
            <option>Tümü</option>
            <option>Sadece önemli olanlar</option>
            <option>Kapalı</option>
          </select>
        </div>
      </div>
    </div>
  );
}
