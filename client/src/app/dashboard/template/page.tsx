export default function TemplatesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Templatelerim</h1>
      <p className="text-gray-700">
        Kayıtlı teklif şablonlarınızı buradan yönetebilirsiniz.
      </p>

      {/* Örnek template kutusu */}
      <div className="border rounded p-4 shadow-sm bg-gray-50">
        <h2 className="font-semibold">Varsayılan Teklif</h2>
        <p className="text-sm text-gray-600">Son güncelleme: 9 Mayıs 2025</p>
        <p className="mt-2 text-gray-700">
          Merhaba, projeniz için detaylıca çalışabiliriz. İlk aşamada analiz
          yapıp ardından üretime geçeriz...
        </p>
      </div>
    </div>
  );
}
