const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const Sensor = require("../models/sensorModel");

const exportController = {};

// =====================================================
// HELPER
// =====================================================

function getFilterLabel(range, start, end) {
  if (start && end) {
    return `${start} s/d ${end}`;
  }

  if (range === "1d") {
    return "24 Jam Terakhir";
  }

  return "1 Jam Terakhir";
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString("id-ID");
}

function getStatusColor(status) {
  switch (String(status || "").toUpperCase()) {
    case "AMAN":
      return {
        fill: "#C6EFCE",
        text: "#006100",
      };

    case "WASPADA":
      return {
        fill: "#FFF2CC",
        text: "#9C6500",
      };

    case "BAHAYA":
      return {
        fill: "#F8CBAD",
        text: "#9C0006",
      };

    default:
      return {
        fill: "#FFFFFF",
        text: "#000000",
      };
  }
}

// =====================================================
// EXPORT EXCEL
// =====================================================

// =====================================================
// EXPORT EXCEL
// =====================================================

exportController.exportExcel = async (req, res) => {
  const { range = "1h", start, end } = req.query;

  try {
    Sensor.getExportData(range, start, end, async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil data export.",
          error: err.message,
        });
      }

      // =================================================
      // WORKBOOK
      // =================================================

      const workbook = new ExcelJS.Workbook();

      workbook.creator = "JagaBumi";
      workbook.lastModifiedBy = "JagaBumi";
      workbook.created = new Date();
      workbook.modified = new Date();

      const worksheet = workbook.addWorksheet("Monitoring");

      // =================================================
      // WARNA
      // =================================================

      const COLORS = {
        blue: "1F4E78",
        white: "FFFFFF",
        black: "000000",
        gray: "666666",
        border: "B7B7B7",

        amanFill: "C6EFCE",
        amanText: "006100",

        waspadaFill: "FFF2CC",
        waspadaText: "9C6500",

        bahayaFill: "F4CCCC",
        bahayaText: "9C0006",
      };

      // =================================================
      // FILTER LABEL
      // =================================================

      let filterLabel = "1 Jam Terakhir";

      if (start && end) {
        filterLabel = `${start} s/d ${end}`;
      } else if (range === "1d") {
        filterLabel = "24 Jam Terakhir";
      }

      // =================================================
      // JUDUL
      // =================================================

      worksheet.mergeCells("A1:G1");

      const title = worksheet.getCell("A1");

      title.value = "LAPORAN MONITORING SISTEM PERINGATAN DINI LONGSOR";

      title.font = {
        name: "Arial",
        size: 16,
        bold: true,
        color: {
          argb: COLORS.white,
        },
      };

      title.alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      title.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: COLORS.blue,
        },
      };

      worksheet.getRow(1).height = 30;

      // =================================================
      // INFORMASI
      // =================================================

      worksheet.getCell("A3").value = "Tanggal Export";

      worksheet.getCell("B3").value = new Date().toLocaleString("id-ID");

      worksheet.getCell("A4").value = "Filter";

      worksheet.getCell("B4").value = filterLabel;

      worksheet.getCell("A5").value = "Lokasi";

      worksheet.getCell("B5").value = "Pusuk Sembalun, Kabupaten Lombok Timur";

      // Style informasi

      ["A3", "A4", "A5"].forEach((cellAddress) => {
        const cell = worksheet.getCell(cellAddress);

        cell.font = {
          name: "Arial",
          size: 10,
          bold: false,
          color: {
            argb: COLORS.black,
          },
        };

        cell.alignment = {
          vertical: "middle",
        };
      });

      ["B3", "B4", "B5"].forEach((cellAddress) => {
        const cell = worksheet.getCell(cellAddress);

        cell.font = {
          name: "Arial",
          size: 10,
          color: {
            argb: COLORS.black,
          },
        };

        cell.alignment = {
          vertical: "middle",
        };
      });

      // =================================================
      // RINGKASAN MONITORING
      // =================================================

      worksheet.getCell("A7").value = "RINGKASAN MONITORING";

      worksheet.mergeCells("A7:G7");

      const summaryTitle = worksheet.getCell("A7");

      summaryTitle.font = {
        name: "Arial",
        size: 12,
        bold: true,
        color: {
          argb: COLORS.black,
        },
      };

      summaryTitle.alignment = {
        vertical: "middle",
      };

      // =================================================
      // STATISTIK
      // =================================================

      const totalData = result.length;

      const avgRain =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.rain || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const avgSoil =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.soil || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const avgTilt =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.tilt || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const lastStatus = totalData > 0 ? result[result.length - 1].status || "-" : "-";

      // =================================================
      // SUMMARY ROW
      // =================================================

      const summary = [
        ["Jumlah Data", totalData],
        ["Status Terakhir", lastStatus],
        ["Rata-rata Curah Hujan", `${avgRain} mm`],
        ["Rata-rata Kelembaban", `${avgSoil} %`],
        ["Rata-rata Kemiringan", `${avgTilt}°`],
      ];

      summary.forEach(([label, value], index) => {
        const rowNumber = 8 + index;

        worksheet.getCell(`A${rowNumber}`).value = label;

        worksheet.getCell(`B${rowNumber}`).value = value;

        worksheet.getCell(`A${rowNumber}`).font = {
          name: "Arial",
          size: 10,
        };

        worksheet.getCell(`B${rowNumber}`).font = {
          name: "Arial",
          size: 10,
        };
      });

      // =================================================
      // HEADER TABEL
      // =================================================

      const tableHeaderRow = 14;

      const headerRow = worksheet.getRow(tableHeaderRow);

      headerRow.values = [
        "No",
        "Tanggal",
        "Curah Hujan (mm)",
        "Kelembaban Tanah (%)",
        "Kemiringan (°)",
        "Nilai Fuzzy",
        "Status",
      ];

      headerRow.height = 30;

      headerRow.eachCell((cell) => {
        cell.font = {
          name: "Arial",
          size: 10,
          bold: true,
          color: {
            argb: COLORS.white,
          },
        };

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: COLORS.blue,
          },
        };

        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };

        cell.border = {
          top: {
            style: "thin",
            color: {
              argb: COLORS.border,
            },
          },
          bottom: {
            style: "thin",
            color: {
              argb: COLORS.border,
            },
          },
          left: {
            style: "thin",
            color: {
              argb: COLORS.border,
            },
          },
          right: {
            style: "thin",
            color: {
              argb: COLORS.border,
            },
          },
        };
      });

      // =================================================
      // DATA
      // =================================================

      result.forEach((item, index) => {
        const rowNumber = tableHeaderRow + 1 + index;

        const row = worksheet.getRow(rowNumber);

        row.values = [
          index + 1,
          item.created_at,
          Number(item.rain || 0),
          Number(item.soil || 0),
          Number(item.tilt || 0),
          Number(item.fuzzy_value || 0),
          item.status || "-",
        ];

        row.height = 22;

        row.eachCell((cell) => {
          cell.font = {
            name: "Arial",
            size: 9,
            color: {
              argb: COLORS.black,
            },
          };

          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          cell.border = {
            top: {
              style: "thin",
              color: {
                argb: COLORS.border,
              },
            },
            bottom: {
              style: "thin",
              color: {
                argb: COLORS.border,
              },
            },
            left: {
              style: "thin",
              color: {
                argb: COLORS.border,
              },
            },
            right: {
              style: "thin",
              color: {
                argb: COLORS.border,
              },
            },
          };
        });

        // =================================================
        // FORMAT ANGKA
        // =================================================

        row.getCell(3).numFmt = "0.00";

        row.getCell(4).numFmt = "0.00";

        row.getCell(5).numFmt = "0.00";

        row.getCell(6).numFmt = "0.00";

        // =================================================
        // FORMAT TANGGAL
        // =================================================

        row.getCell(2).numFmt = "dd/mm/yyyy hh:mm:ss";

        // =================================================
        // WARNA STATUS
        // =================================================

        const status = String(item.status || "").toUpperCase();

        const statusCell = row.getCell(7);

        if (status === "AMAN") {
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: COLORS.amanFill,
            },
          };

          statusCell.font = {
            name: "Arial",
            size: 9,
            bold: true,
            color: {
              argb: COLORS.amanText,
            },
          };
        }

        if (status === "WASPADA") {
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: COLORS.waspadaFill,
            },
          };

          statusCell.font = {
            name: "Arial",
            size: 9,
            bold: true,
            color: {
              argb: COLORS.waspadaText,
            },
          };
        }

        if (status === "BAHAYA") {
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: COLORS.bahayaFill,
            },
          };

          statusCell.font = {
            name: "Arial",
            size: 9,
            bold: true,
            color: {
              argb: COLORS.bahayaText,
            },
          };
        }
      });

      // =================================================
      // COLUMN WIDTH
      // =================================================

      worksheet.getColumn(1).width = 8;
      worksheet.getColumn(2).width = 24;
      worksheet.getColumn(3).width = 20;
      worksheet.getColumn(4).width = 23;
      worksheet.getColumn(5).width = 18;
      worksheet.getColumn(6).width = 16;
      worksheet.getColumn(7).width = 15;

      // =================================================
      // FREEZE HEADER
      // =================================================

      worksheet.views = [
        {
          state: "frozen",
          ySplit: tableHeaderRow,
        },
      ];

      // =================================================
      // PRINT SETTINGS
      // =================================================

      worksheet.pageSetup = {
        paperSize: worksheet.PAPERSIZE_A4,

        orientation: "landscape",

        fitToPage: true,

        fitToWidth: 1,

        fitToHeight: 0,

        margins: {
          left: 0.25,
          right: 0.25,
          top: 0.5,
          bottom: 0.5,
          header: 0.2,
          footer: 0.2,
        },
      };

      worksheet.pageSetup.printTitlesRow = `${tableHeaderRow}:${tableHeaderRow}`;

      // =================================================
      // PRINT AREA
      // =================================================

      const lastRow = tableHeaderRow + result.length;

      worksheet.pageSetup.printArea = `A1:G${lastRow}`;

      // =================================================
      // DOWNLOAD
      // =================================================

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader("Content-Disposition", 'attachment; filename="Monitoring.xlsx"');

      await workbook.xlsx.write(res);

      res.end();
    });
  } catch (error) {
    console.error("Export Excel Error:", error);

    return res.status(500).json({
      success: false,
      message: "Export Excel gagal.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT PDF
// =====================================================

exportController.exportPDF = async (req, res) => {
  const { range = "1h", start, end } = req.query;

  try {
    Sensor.getExportData(range, start, end, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil data export PDF.",
          error: err.message,
        });
      }

      // =================================================
      // DATA STATISTIK
      // =================================================

      const totalData = result.length;

      const avgRain =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.rain || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const avgSoil =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.soil || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const avgTilt =
        totalData > 0
          ? (result.reduce((sum, item) => sum + Number(item.tilt || 0), 0) / totalData).toFixed(2)
          : "0.00";

      const lastStatus = totalData > 0 ? result[result.length - 1].status || "-" : "-";

      // =================================================
      // FILTER
      // =================================================

      const filterLabel = getFilterLabel(range, start, end);

      // =================================================
      // PDF DOCUMENT
      // =================================================

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        bufferPages: true,
      });

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader("Content-Disposition", 'attachment; filename="Monitoring.pdf"');

      doc.pipe(res);

      // =================================================
      // KONSTANTA LAYOUT
      // =================================================

      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;

      const left = 40;
      const right = pageWidth - 40;
      const tableWidth = right - left;

      // =================================================
      // FUNGSI HEADER TABEL
      // =================================================

      function drawTableHeader() {
        const y = doc.y;

        const headerHeight = 30;

        // Background biru
        doc.save().fillColor("#1F4E78").rect(left, y, tableWidth, headerHeight).fill().restore();

        // Kolom
        const columns = [
          {
            title: "No",
            x: left,
            width: 35,
          },
          {
            title: "Tanggal",
            x: left + 35,
            width: 120,
          },
          {
            title: "Curah\nHujan\n(mm)",
            x: left + 155,
            width: 70,
          },
          {
            title: "Kelembaban\nTanah\n(%)",
            x: left + 225,
            width: 80,
          },
          {
            title: "Kemiringan\n(°)",
            x: left + 305,
            width: 70,
          },
          {
            title: "Nilai\nFuzzy",
            x: left + 375,
            width: 65,
          },
          {
            title: "Status",
            x: left + 440,
            width: 75,
          },
        ];

        doc.font("Helvetica-Bold").fontSize(8);

        columns.forEach((column) => {
          doc.fillColor("#FFFFFF").text(column.title, column.x + 3, y + 6, {
            width: column.width - 6,
            height: headerHeight - 6,
            align: "center",
          });
        });

        doc.y = y + headerHeight;

        return columns;
      }

      // =================================================
      // JUDUL
      // =================================================

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#000000")
        .text("LAPORAN MONITORING SISTEM PERINGATAN DINI", {
          align: "center",
        });

      doc.font("Helvetica-Bold").fontSize(18).text("LONGSOR", {
        align: "center",
      });

      doc.moveDown(1.5);

      // =================================================
      // INFORMASI EXPORT
      // =================================================

      doc.font("Helvetica").fontSize(10).fillColor("#000000");

      doc.text(`Tanggal Export : ${new Date().toLocaleString("id-ID")}`);

      doc.text(`Filter         : ${filterLabel}`);

      doc.text("Lokasi         : Pusuk Sembalun, Kabupaten Lombok Timur");

      doc.moveDown(1);

      // =================================================
      // RINGKASAN
      // =================================================

      doc.font("Helvetica-Bold").fontSize(13).text("RINGKASAN MONITORING");

      doc.moveDown(0.5);

      doc.font("Helvetica").fontSize(10).fillColor("#000000");

      doc.text(`Jumlah Data          : ${totalData}`);

      doc.text(`Status Terakhir      : ${lastStatus}`);

      doc.text(`Rata-rata Curah Hujan: ${avgRain} mm`);

      doc.text(`Rata-rata Kelembaban : ${avgSoil} %`);

      doc.text(`Rata-rata Kemiringan : ${avgTilt}°`);

      doc.moveDown(1);

      // =================================================
      // GARIS PEMBATAS
      // =================================================

      doc.moveTo(left, doc.y).lineTo(right, doc.y).lineWidth(1).strokeColor("#333333").stroke();

      doc.moveDown(0.8);

      // =================================================
      // HEADER TABEL
      // =================================================

      drawTableHeader();

      // =================================================
      // DATA TABLE
      // =================================================

      const rowHeight = 22;

      result.forEach((item, index) => {
        // ===============================================
        // CEK HALAMAN
        // ===============================================

        if (doc.y + rowHeight > pageHeight - 45) {
          doc.addPage();

          doc.y = 40;

          drawTableHeader();
        }

        const y = doc.y;

        // ===============================================
        // KOLOM
        // ===============================================

        const columns = [
          {
            x: left,
            width: 35,
          },
          {
            x: left + 35,
            width: 120,
          },
          {
            x: left + 155,
            width: 70,
          },
          {
            x: left + 225,
            width: 80,
          },
          {
            x: left + 305,
            width: 70,
          },
          {
            x: left + 375,
            width: 65,
          },
          {
            x: left + 440,
            width: 75,
          },
        ];

        // ===============================================
        // WARNA STATUS
        // ===============================================

        const statusColor = getStatusColor(item.status);

        // ===============================================
        // BACKGROUND STATUS
        // ===============================================

        doc
          .save()
          .fillColor(statusColor.fill)
          .rect(columns[6].x, y, columns[6].width, rowHeight)
          .fill()
          .restore();

        // ===============================================
        // GARIS TABEL
        // ===============================================

        columns.forEach((column) => {
          doc
            .save()
            .lineWidth(0.5)
            .strokeColor("#D0D0D0")
            .rect(column.x, y, column.width, rowHeight)
            .stroke()
            .restore();
        });

        // ===============================================
        // DATA
        // ===============================================

        const createdAt = formatDate(item.created_at);

        const values = [
          index + 1,
          createdAt,
          item.rain ?? "-",
          item.soil ?? "-",
          item.tilt ?? "-",
          item.fuzzy_value ?? "-",
          item.status ?? "-",
        ];

        values.forEach((value, columnIndex) => {
          const column = columns[columnIndex];

          const isStatus = columnIndex === 6;

          doc
            .font(isStatus ? "Helvetica-Bold" : "Helvetica")
            .fontSize(8)
            .fillColor(isStatus ? statusColor.text : "#000000")
            .text(String(value), column.x + 3, y + 7, {
              width: column.width - 6,
              height: rowHeight - 5,
              align: "center",
              lineBreak: false,
            });
        });

        doc.y = y + rowHeight;
      });

      // // =================================================
      // // FOOTER
      // // =================================================

      // const rangeCount = doc.bufferedPageRange();

      // for (let page = rangeCount.start; page < rangeCount.start + rangeCount.count; page++) {
      //   doc.switchToPage(page);

      //   doc
      //     .font("Helvetica")
      //     .fontSize(8)
      //     .fillColor("#777777")
      //     .text(
      //       `JagaBumi • Sistem Peringatan Dini Longsor • Halaman ${page + 1}`,
      //       left,
      //       pageHeight - 25,
      //       {
      //         width: tableWidth,
      //         align: "center",
      //       }
      //     );
      // }

      // =================================================
      // SELESAI
      // =================================================

      doc.end();
    });
  } catch (error) {
    console.error("Export PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: "Export PDF gagal.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT CONTROLLER
// =====================================================

module.exports = exportController;
