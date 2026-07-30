const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const Sensor = require("../models/sensorModel");

const exportController = {
  // =====================================
  // EXPORT EXCEL
  // =====================================
  exportExcel: async (req, res) => {
    const { start, end } = req.query;

    try {
      Sensor.getExportData(start, end, async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Gagal mengambil data export.",
            error: err.message,
          });
        }

        const workbook = new ExcelJS.Workbook();

        workbook.creator = "Landslide Monitoring System";
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet("Monitoring");

        // =====================================
        // JUDUL LAPORAN
        // =====================================

        worksheet.mergeCells("A1:G1");

        const titleCell = worksheet.getCell("A1");

        titleCell.value = "LAPORAN MONITORING SISTEM PERINGATAN DINI LONGSOR";

        titleCell.font = {
          name: "Calibri",
          size: 20,
          bold: true,
          color: {
            argb: "FFFFFF",
          },
        };

        titleCell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };

        titleCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "1F4E78",
          },
        };

        // worksheet.getRow(1).height = 32;

        // =====================================
        // INFORMASI
        // =====================================
        const totalData = result.length;

        const avgRain =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.rain), 0) / totalData).toFixed(2)
            : 0;

        const avgSoil =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.soil), 0) / totalData).toFixed(2)
            : 0;

        const avgTilt =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.tilt), 0) / totalData).toFixed(2)
            : 0;

        const lastStatus = totalData > 0 ? result[result.length - 1].status : "-";

        worksheet.getCell("A3").value = "Tanggal Export";
        worksheet.getCell("B3").value = new Date().toLocaleString("id-ID");

        worksheet.getCell("A4").value = "Filter";

        worksheet.getCell("B4").value = start && end ? `${start} s/d ${end}` : "Semua Data";

        // =====================================
        // RINGKASAN MONITORING
        // =====================================

        worksheet.getCell("A6").value = "RINGKASAN MONITORING";
        worksheet.getCell("A6").font = {
          bold: true,
          size: 14,
        };

        worksheet.getCell("A7").value = "Jumlah Data";
        worksheet.getCell("B7").value = totalData;

        worksheet.getCell("A8").value = "Status Terakhir";
        worksheet.getCell("B8").value = lastStatus;

        worksheet.getCell("A9").value = "Rata-rata Curah Hujan";
        worksheet.getCell("B9").value = `${avgRain} mm`;

        worksheet.getCell("A10").value = "Rata-rata Kelembaban";
        worksheet.getCell("B10").value = `${avgSoil} %`;

        worksheet.getCell("A11").value = "Rata-rata Kemiringan";
        worksheet.getCell("B11").value = `${avgTilt}°`;

        // =====================================
        // HEADER
        // =====================================
        worksheet.columns = [
          { key: "no", width: 8 },
          { key: "created_at", width: 25 },
          { key: "rain", width: 18 },
          { key: "soil", width: 22 },
          { key: "tilt", width: 18 },
          { key: "fuzzy_value", width: 18 },
          { key: "status", width: 15 },
        ];

        const headerRow = worksheet.getRow(13);

        headerRow.values = [
          "No",
          "Tanggal",
          "Curah Hujan (mm)",
          "Kelembaban Tanah (%)",
          "Kemiringan (°)",
          "Nilai Fuzzy",
          "Status",
        ];

        headerRow.eachCell((cell) => {
          cell.font = {
            bold: true,
            color: {
              argb: "FFFFFFFF",
            },
          };

          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: "1F4E78",
            },
          };

          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
          };
        });

        // =====================================
        // DATA
        // =====================================
        result.forEach((item, index) => {
          const formattedDate = new Date(item.created_at).toLocaleString("id-ID");

          worksheet.insertRow(14 + index, [
            index + 1,
            formattedDate,
            item.rain,
            item.soil,
            item.tilt,
            item.fuzzy_value,
            item.status,
          ]);

          const row = worksheet.lastRow;

          // row.getCell(2).numFmt = "dd-mm-yyyy hh:mm:ss";

          const statusCell = row.getCell(7);

          switch (item.status) {
            case "AMAN":
              statusCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                  argb: "C6EFCE",
                },
              };
              break;

            case "WASPADA":
              statusCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                  argb: "FFF2CC",
                },
              };
              break;

            case "BAHAYA":
              statusCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                  argb: "F8CBAD",
                },
              };
              break;
          }
        });

        // =====================================
        // BORDER
        // =====================================
        worksheet.eachRow((row) => {
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        });

        // =====================================
        // ALIGNMENT
        // =====================================
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber >= 13) {
            row.eachCell((cell) => {
              cell.alignment = {
                horizontal: "center",
                vertical: "middle",
              };
            });
          }
        });

        // =====================================
        // AUTO FILTER
        // =====================================
        worksheet.autoFilter = {
          from: "13",
          to: "13",
        };

        // =====================================
        // FREEZE HEADER
        // =====================================
        worksheet.views = [
          {
            state: "frozen",
            ySplit: 13,
          },
        ];

        worksheet.columns.forEach((column) => {
          let maxLength = 8;

          column.eachCell({ includeEmpty: true }, (cell) => {
            const value = cell.value ? cell.value.toString() : "";

            if (value.length > maxLength) {
              maxLength = value.length;
            }
          });

          // batas minimum
          if (maxLength < 10) maxLength = 10;

          // batas maksimum
          if (maxLength > 22) maxLength = 22;

          column.width = maxLength + 2;
        });

        // =====================================
        // DOWNLOAD
        // =====================================
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader("Content-Disposition", 'attachment; filename="Monitoring.xlsx"');

        await workbook.xlsx.write(res);

        res.end();
      });
    } catch (error) {
      res.status(500).json({
        message: "Export Excel gagal.",
        error: error.message,
      });
    }
  },

  // =====================================
  // EXPORT PDF
  // =====================================
  exportPDF: async (req, res) => {
    const { start, end } = req.query;

    try {
      Sensor.getExportData(start, end, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Gagal mengambil data export PDF.",
            error: err.message,
          });
        }
        const totalData = result.length;

        const avgRain =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.rain), 0) / totalData).toFixed(2)
            : 0;

        const avgSoil =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.soil), 0) / totalData).toFixed(2)
            : 0;

        const avgTilt =
          totalData > 0
            ? (result.reduce((sum, item) => sum + Number(item.tilt), 0) / totalData).toFixed(2)
            : 0;

        const lastStatus = totalData > 0 ? result[result.length - 1].status : "-";
        // =====================================
        // BUAT PDF
        // =====================================
        const doc = new PDFDocument({
          margin: 40,
          size: "A4",
          bufferPages: true,
        });

        const startX = 40;

        const headerHeight = 42;
        const rowHeight = 24;

        const col = {
          no: 40,
          tanggal: 130,
          rain: 60,
          soil: 75,
          tilt: 55,
          fuzzy: 65,
          status: 80,
        };

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", 'attachment; filename="Monitoring.pdf"');

        doc.pipe(res);

        // =====================================
        // JUDUL
        // =====================================
        doc
          .fontSize(18)
          .font("Helvetica-Bold")
          .text("LAPORAN MONITORING SISTEM PERINGATAN DINI LONGSOR", {
            align: "center",
          });

        doc.moveDown(1.5);

        // =====================================
        // INFORMASI
        // =====================================
        doc.font("Helvetica").fontSize(11);

        doc.text(`Tanggal Export : ${new Date().toLocaleString("id-ID")}`);

        doc.text(`Filter : ${start && end ? `${start} s/d ${end}` : "Semua Data"}`);

        doc.text("Lokasi : Pusuk Sembalun, Kabupaten Lombok Timur");

        doc.moveDown();

        // =====================================
        // RINGKASAN
        // =====================================
        doc.font("Helvetica-Bold").fontSize(13).text("RINGKASAN MONITORING");

        doc.moveDown(0.5);

        doc.font("Helvetica").fontSize(11);

        doc.text(`Jumlah Data             : ${totalData}`);

        doc.text(`Status Terakhir         : ${lastStatus}`);

        doc.text(`Rata-rata Curah Hujan   : ${avgRain} mm`);

        doc.text(`Rata-rata Kelembaban    : ${avgSoil} %`);

        doc.text(`Rata-rata Kemiringan    : ${avgTilt}°`);

        doc.moveDown(2);

        // // =====================================
        // // INFORMASI
        // // =====================================
        // doc.fontSize(11).font("Helvetica");

        // doc.text(`Tanggal Export : ${new Date().toLocaleString("id-ID")}`);

        // doc.text("Lokasi : Pusuk Sembalun, Kabupaten Lombok Timur");

        // doc.text(`Filter : ${start && end ? `${start} s/d ${end}` : "Semua Data"}`);

        // doc.moveDown();

        // doc.moveDown();

        let y = doc.y + 10;
        // =====================================
        // HEADER TABEL
        // =====================================
        drawTableHeader(y);
        y += headerHeight;
        function drawTableHeader(y) {
          doc.rect(startX, y, 505, headerHeight).fill("#1F4E78");

          doc.fillColor("white");
          doc.font("Helvetica-Bold");
          doc.fontSize(10);

          let x = startX;

          const headers = [
            { text: "No", width: col.no },
            { text: "Tanggal", width: col.tanggal },
            { text: "Curah\nHujan\n(mm)", width: col.rain },
            { text: "Kelembaban\nTanah\n(%)", width: col.soil },
            { text: "Kemiringan\n(°)", width: col.tilt },
            { text: "Nilai\nFuzzy", width: col.fuzzy },
            { text: "Status", width: col.status },
          ];

          headers.forEach((h) => {
            doc.text(h.text, x, y + 6, {
              width: h.width,
              align: "center",
              lineGap: 1,
            });

            x += h.width;
          });

          doc.fillColor("black");
        }

        doc.font("Helvetica");

        // =====================================
        // DATA
        // =====================================
        result.forEach((item, index) => {
          if (y > 730) {
            doc.addPage();

            y = 50;

            drawTableHeader(y);

            y += headerHeight;
          }

          doc.rect(startX, y, 505, rowHeight).stroke("#D1D5DB");

          let x = startX;

          doc.font("Helvetica").fontSize(9);

          doc.text(index + 1, x, y + 7, {
            width: col.no,
            align: "center",
          });

          x += col.no;

          doc.text(new Date(item.created_at).toLocaleString("id-ID"), x, y + 7, {
            width: col.tanggal,
            align: "center",
          });

          x += col.tanggal;

          doc.text(String(item.rain), x, y + 7, {
            width: col.rain,
            align: "center",
          });

          x += col.rain;

          doc.text(String(item.soil), x, y + 7, {
            width: col.soil,
            align: "center",
          });

          x += col.soil;

          doc.text(String(item.tilt), x, y + 7, {
            width: col.tilt,
            align: "center",
          });

          x += col.tilt;

          doc.text(String(item.fuzzy_value), x, y + 7, {
            width: col.fuzzy,
            align: "center",
          });

          x += col.fuzzy;

          // warna status
          switch (item.status) {
            case "AMAN":
              doc.fillColor("#16A34A");
              break;
            case "WASPADA":
              doc.fillColor("#CA8A04");
              break;
            case "BAHAYA":
              doc.fillColor("#DC2626");
              break;
            default:
              doc.fillColor("black");
          }

          doc.text(item.status, x, y + 7, {
            width: col.status,
            align: "center",
          });

          doc.fillColor("black");

          y += rowHeight;
        });

        doc.end();
      });
    } catch (error) {
      res.status(500).json({
        message: "Export PDF gagal.",
        error: error.message,
      });
    }
  },
};

module.exports = exportController;
