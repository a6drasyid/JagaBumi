import { useState } from "react";

export default function FeedbackSection() {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [form, setForm] = useState({
    nama: "",
    email: "",
    kategori: "Masukan",
    pesan: "",
  });

  // =====================================================
  // STATUS
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hilangkan pesan status ketika pengguna mulai
    // memperbaiki / mengubah data
    if (message.text) {
      setMessage({
        type: "",
        text: "",
      });
    }
  };

  // =====================================================
  // VALIDASI EMAIL
  // =====================================================

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------------------------
    // VALIDASI NAMA
    // -----------------------------------------------

    if (!form.nama.trim()) {
      setMessage({
        type: "error",
        text: "Silakan masukkan nama lengkap.",
      });

      return;
    }

    // -----------------------------------------------
    // VALIDASI EMAIL
    // -----------------------------------------------

    if (!form.email.trim()) {
      setMessage({
        type: "error",
        text: "Silakan masukkan alamat email.",
      });

      return;
    }

    if (!validateEmail(form.email.trim())) {
      setMessage({
        type: "error",
        text: "Format email tidak valid.",
      });

      return;
    }

    // -----------------------------------------------
    // VALIDASI PESAN
    // -----------------------------------------------

    if (!form.pesan.trim()) {
      setMessage({
        type: "error",
        text: "Silakan tuliskan pengaduan atau masukan Anda.",
      });

      return;
    }

    // -----------------------------------------------
    // MULAI KIRIM
    // -----------------------------------------------

    try {
      setLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      // =============================================
      // REQUEST KE BACKEND
      // =============================================

      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nama: form.nama.trim(),
          email: form.email.trim(),
          kategori: form.kategori,
          pesan: form.pesan.trim(),
        }),
      });

      // =============================================
      // AMBIL RESPONSE
      // =============================================

      const result = await response.json();

      // =============================================
      // CEK RESPONSE
      // =============================================

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Pengaduan gagal dikirim.");
      }

      // =============================================
      // BERHASIL
      // =============================================

      setMessage({
        type: "success",
        text: "Pengaduan berhasil dikirim. Terima kasih atas masukan Anda.",
      });

      // =============================================
      // RESET FORM
      // =============================================

      setForm({
        nama: "",
        email: "",
        kategori: "Masukan",
        pesan: "",
      });
    } catch (error) {
      console.error("Feedback error:", error);

      // =============================================
      // GAGAL
      // =============================================

      setMessage({
        type: "error",
        text: error.message || "Pengaduan gagal dikirim. Silakan coba kembali.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="pengaduan"
      className="
        relative
        w-full
        max-w-full
        overflow-hidden

        bg-[#050505]

        py-14
        sm:py-16
        md:py-20
        lg:py-32

        before:pointer-events-none
        before:absolute
        before:inset-0
        before:bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.10),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.07),transparent_36%)]
      "
    >
      {/* =================================================
          CONTAINER
      ================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl
          min-w-0

          px-3
          min-[375px]:px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div
          className="
            mx-auto
            mb-8
            w-full
            max-w-4xl

            text-center

            sm:mb-10
            md:mb-12
            lg:mb-16
          "
        >
          {/* LABEL */}

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-emerald-400

              min-[375px]:text-[11px]

              sm:text-xs
              sm:tracking-[0.22em]

              lg:text-base
              lg:tracking-widest
            "
          >
            Layanan Masyarakat
          </p>

          {/* TITLE */}

          <h2
            className="
              mt-2.5

              break-words

              text-[1.75rem]
              font-bold
              leading-[1.15]
              tracking-tight
              text-white

              min-[375px]:text-3xl

              sm:mt-3
              sm:text-4xl

              lg:mt-4
              lg:text-5xl
            "
          >
            Layanan & Pengaduan Masyarakat
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-3
              max-w-3xl

              text-xs
              leading-5
              text-gray-400

              min-[375px]:text-sm
              min-[375px]:leading-6

              sm:mt-4
              sm:text-base
              sm:leading-7

              lg:mt-5
            "
          >
            Sampaikan pengaduan, pertanyaan, atau masukan terkait sistem peringatan dini longsor
            JagaBumi. Setiap masukan membantu meningkatkan kualitas layanan dan pemantauan di
            wilayah Pusuk Sembalun.
          </p>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            w-full
            min-w-0

            grid-cols-1

            gap-4

            sm:gap-5
            md:gap-6

            lg:grid-cols-3
            lg:gap-8
          "
        >
          {/* =================================================
              INFORMATION CARD
          ================================================= */}

          <div
            className="
              flex
              h-full
              w-full
              min-w-0
              flex-col

              rounded-2xl
              sm:rounded-3xl

              border
              border-white/10

              bg-white/[0.055]

              backdrop-blur-xl

              shadow-[0_8px_40px_rgba(0,0,0,0.18)]

              p-5
              sm:p-6
              md:p-7
              lg:p-8
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                border
                border-emerald-400/20

                bg-emerald-400/10

                text-emerald-400
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 4H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3l4 3 4-3h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                />
              </svg>
            </div>

            {/* TITLE */}

            <h3
              className="
                mt-5
                text-xl
                font-bold
                tracking-tight
                text-white

                sm:text-2xl
              "
            >
              Hubungi Kami
            </h3>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-400
              "
            >
              Kami terbuka terhadap laporan masyarakat, pertanyaan, maupun masukan untuk mendukung
              pengembangan sistem JagaBumi.
            </p>

            {/* =================================================
                CONTACT OPTIONS
            ================================================= */}

            <div
              className="
                mt-7
                space-y-3
              "
            >
              {/* WHATSAPP */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-white/10

                  bg-white/[0.035]

                  p-4

                  transition
                  duration-300

                  hover:border-white/15
                  hover:bg-white/[0.06]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-emerald-400/10

                    text-emerald-400
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.5a8.5 8.5 0 0 1-12.9 7.3L3 20l1.3-4.8A8.5 8.5 0 1 1 21 11.5Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.5 8.5c.2-.4.5-.4.8-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4-.1.6l-.5.6c.5 1 1.3 1.7 2.3 2.2l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.6v.4c0 .3-.1.6-.4.8-.5.3-1.1.5-1.7.3-2.1-.6-4.6-2.9-5.6-5-.3-.7-.1-1.4.2-1.9Z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">WhatsApp</p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    Layanan pesan langsung
                  </p>
                </div>
              </div>

              {/* EMAIL */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border
                  border-white/10

                  bg-white/[0.035]

                  p-4

                  transition
                  duration-300

                  hover:border-white/15
                  hover:bg-white/[0.06]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-emerald-400/10

                    text-emerald-400
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <rect width="18" height="14" x="3" y="5" rx="2" />

                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email</p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    Layanan melalui email
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                INFORMATION
            ================================================= */}

            <div className="mt-auto pt-7">
              <div
                className="
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <p
                  className="
                    text-xs
                    leading-5
                    text-gray-500
                  "
                >
                  Gunakan formulir di samping untuk menyampaikan laporan atau masukan secara lebih
                  terstruktur.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FORM CARD
          ================================================= */}

          <div
            className="
              w-full
              min-w-0

              rounded-2xl
              sm:rounded-3xl

              border
              border-white/10

              bg-white/[0.055]

              backdrop-blur-xl

              shadow-[0_8px_40px_rgba(0,0,0,0.18)]

              p-5
              sm:p-6
              md:p-7

              lg:col-span-2
              lg:p-8
            "
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* =================================================
                  NAME + EMAIL
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5

                  sm:grid-cols-2
                "
              >
                {/* NAME */}

                <div className="min-w-0">
                  <label
                    htmlFor="nama"
                    className="
                      mb-2
                      block

                      text-xs
                      font-medium
                      text-gray-300

                      sm:text-sm
                    "
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    disabled={loading}
                    className="
    h-11
    w-full
    min-w-0

    rounded-xl

    border
    border-white/10

    bg-white/[0.035]

    px-4

    text-sm
    text-white

    outline-none

    transition

    placeholder:text-gray-600

    focus:border-emerald-400/40
    focus:bg-white/[0.05]
    focus:ring-2
    focus:ring-emerald-400/10

    disabled:cursor-not-allowed
    disabled:opacity-60

    [&:-webkit-autofill]:bg-transparent
    [&:-webkit-autofill]:text-white
    [&:-webkit-autofill]:[-webkit-text-fill-color:white]
    [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
    [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_rgba(255,255,255,0.035)_inset]
  "
                  />
                </div>

                {/* EMAIL */}

                <div className="min-w-0">
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block

                      text-xs
                      font-medium
                      text-gray-300

                      sm:text-sm
                    "
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    disabled={loading}
                    className="
    h-11
    w-full
    min-w-0

    rounded-xl

    border
    border-white/10

    bg-white/[0.035]

    px-4

    text-sm
    text-white

    outline-none

    transition

    placeholder:text-gray-600

    focus:border-emerald-400/40
    focus:bg-white/[0.05]
    focus:ring-2
    focus:ring-emerald-400/10

    disabled:cursor-not-allowed
    disabled:opacity-60

    [&:-webkit-autofill]:bg-transparent
    [&:-webkit-autofill]:text-white
    [&:-webkit-autofill]:[-webkit-text-fill-color:white]
    [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
    [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_rgba(255,255,255,0.035)_inset]
  "
                  />
                </div>
              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>
                <label
                  htmlFor="kategori"
                  className="
                    mb-2
                    block

                    text-xs
                    font-medium
                    text-gray-300

                    sm:text-sm
                  "
                >
                  Jenis Layanan
                </label>

                <select
                  id="kategori"
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  disabled={loading}
                  className="
                    h-11
                    w-full

                    rounded-xl

                    border
                    border-white/10

                    bg-[#101010]

                    px-4

                    text-sm
                    text-white

                    outline-none

                    transition

                    focus:border-emerald-400/40
                    focus:ring-2
                    focus:ring-emerald-400/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="Masukan">Masukan</option>

                  <option value="Pengaduan">Pengaduan Masyarakat</option>

                  <option value="Pertanyaan">Pertanyaan</option>

                  <option value="Laporan Sistem">Laporan Sistem</option>

                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div>
                <label
                  htmlFor="pesan"
                  className="
                    mb-2
                    block

                    text-xs
                    font-medium
                    text-gray-300

                    sm:text-sm
                  "
                >
                  Pesan / Pengaduan
                </label>

                <textarea
                  id="pesan"
                  name="pesan"
                  rows={5}
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Tuliskan pengaduan, pertanyaan, atau masukan Anda..."
                  disabled={loading}
                  className="
                    min-h-[130px]
                    w-full

                    resize-none

                    rounded-xl

                    border
                    border-white/10

                    bg-white/[0.035]

                    px-4
                    py-3

                    text-sm
                    leading-6
                    text-white

                    outline-none

                    transition

                    placeholder:text-gray-600

                    focus:border-emerald-400/40
                    focus:bg-white/[0.05]
                    focus:ring-2
                    focus:ring-emerald-400/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* =================================================
    ACTION + STATUS
================================================= */}

              <div
                className="
    border-t
    border-white/10
    pt-5
  "
              >
                <div
                  className="
      flex
      flex-col
      gap-4

      sm:flex-row
      sm:items-center
      sm:justify-between
    "
                >
                  {/* =============================================
        STATUS MESSAGE
    ============================================= */}

                  <div
                    className="
        min-h-[44px]
        flex-1
      "
                  >
                    {message.text && (
                      <div
                        className={`
            flex
            min-h-[44px]
            items-center
            rounded-xl
            border
            px-4
            py-2.5
            text-sm
            leading-5

            ${
              message.type === "success"
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                : "border-red-400/20 bg-red-400/10 text-red-300"
            }
          `}
                      >
                        {message.type === "success" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="
                mr-2
                h-4
                w-4
                shrink-0
              "
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="
                mr-2
                h-4
                w-4
                shrink-0
              "
                          >
                            <circle cx="12" cy="12" r="9" />

                            <path strokeLinecap="round" d="M12 8v4" />

                            <path strokeLinecap="round" d="M12 16h.01" />
                          </svg>
                        )}

                        <span>{message.text}</span>
                      </div>
                    )}
                  </div>

                  {/* =============================================
        BUTTON
    ============================================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
        inline-flex
        h-11
        w-full
        shrink-0

        items-center
        justify-center
        gap-2

        rounded-xl

        bg-emerald-500

        px-5

        text-sm
        font-semibold
        text-white

        shadow-[0_8px_25px_rgba(16,185,129,0.12)]

        transition
        duration-300

        hover:-translate-y-0.5
        hover:bg-emerald-400
        hover:shadow-[0_12px_30px_rgba(16,185,129,0.2)]

        active:translate-y-0

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0

        sm:w-auto
      "
                  >
                    {loading ? (
                      <>
                        <svg
                          className="
              h-4
              w-4
              animate-spin
            "
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="40"
                            strokeLinecap="round"
                          />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13" />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m22 2-7 20-4-9-9-4Z"
                          />
                        </svg>
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  FOOTNOTE
              ================================================= */}

              <p
                className="
                  text-center
                  text-[11px]
                  leading-5
                  text-gray-500
                "
              >
                Pengaduan akan dikirim secara langsung melalui sistem JagaBumi dan diteruskan kepada
                pengelola melalui WhatsApp dan email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
