import * as XLSX from 'xlsx';

function filterData(data: any[], keys: any[]): any[] {
    data = data['data']
    let array: any[] = [];

    data.forEach((row) => {
        let newRow: any[] = [];

        keys.forEach((key) => {
            if (row[key.type]?.[key.key] === null || row[key.type]?.[key.key] === undefined) {
                newRow.push('-');
            } else if (Array.isArray(row[key.type])) {
                row[key.type].forEach((item: any) => {
                    if (item === null || item[key.key] === null || item[key.key] === undefined) {
                        newRow.push('-');
                    } else {
                        newRow.push(item[key.key]);
                    }
                });
            } else {
                newRow.push(row[key.type][key.key]);
            }
        });

        array.push(newRow);
    });

    return array;
}

function generateArray2Table(array: any[], head: string): string {
    let table: string = "<table>" + head + "<tbody>";

    array.forEach((row, index) => {
        table += `<tr><td>${index + 1}</td>`;
        Object.values(row).forEach((col: any) => {
            table += `<td>${col}</td>`;
        });
        table += "</tr>";
    });

    table += "</tbody></table>";

    return table;
}

function generateTable(data: any, keys: any[], head: string): HTMLTableElement {
    const array = filterData(data, keys);
    // console.log(array)
    const tableHTML = generateArray2Table(array, head);
    return new DOMParser().parseFromString(tableHTML, "text/html").querySelector("table")!;
}

function generateRekap(data:any){
    var tablePelapor = generateTable(data, [
        {
            'type': 'pelapor',
            'key': 'nomor_register'
        },
        {
            'type': 'pelapor',
            'key': 'nama_pelapor'
        },
        {
            'type': 'pelapor',
            'key': 'nik'
        },
        {
            'type': 'pelapor',
            'key': 'warga_surabaya'
        },
        {
            'type': 'pelapor',
            'key': 'no_telp'
        },
        {
            'type': 'pelapor',
            'key': 'alamat_domisili'
        },
        {
            'type': 'pelapor',
            'key': 'sumber_pengaduan'
        },
        {
            'type': 'pelapor',
            'key': 'tanggal_jam_pengaduan'
        },
        {
            'type': 'pelapor',
            'key': 'uraian_masalah'
        },
        {
            'type': 'pelapor',
            'key': 'tanggal_jam_penanganan_awal'
        },
        {
            'type': 'pelapor',
            'key': 'penanganan_awal'
        },
    ], 
    `<thead>
    <tr style="background-color: orange; font-weight: bold;">
        <td colspan="7">IDENTITAS PELAPOR</td>
        <td colspan="3">URAIAN PENGADUAN</td>
        <td colspan="2">URAIAN PENANGANAN AWAL</td>
    </tr>
    <tr style="background-color: orange; font-weight: bold;">
        <td>NO</td>
        <td>NO REGISTRASI</td>
        <td>NAMA LENGKAP PELAPOR</td>
        <td>NIK PELAPOR (OPSIONAL)</td>
        <td>WARGA SURABAYA</td>
        <td>NO TELEPON/WHATSAPP</td>
        <td>ALAMAT DOMISILI</td>
        <td>SUMBER PENGADUAN</td>
        <td>TANGGAL DAN JAM PENGADUAN</td>
        <td>URAIAN SINGKAT PERMASALAHAN</td>
        <td>TANGGAL DAN JAM PENANGANAN AWAL</td>
        <td>HASIL PENANGANAN AWAL</td>
    </tr>
    </thead>`);

    var tableKlien = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nomor_register'
        },
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'inisial'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'klien',
            'key': 'no_kk'
        },
        {
            'type': 'klien',
            'key': 'jenis_kelamin'
        },
        {
            'type': 'klien',
            'key': 'pendidikan'
        },
        {
            'type': 'klien',
            'key': 'kelas'
        },
        {
            'type': 'klien',
            'key': 'jurusan'
        },
        {
            'type': 'klien',
            'key': 'tahun_lulus'
        },
        {
            'type': 'klien',
            'key': 'nama_instansi'
        },
        {
            'type': 'klien',
            'key': 'pekerjaan'
        },
        {
            'type': 'klien',
            'key': 'penghasilan'
        },
        {
            'type': 'klien',
            'key': 'agama'
        },
        {
            'type': 'klien',
            'key': 'status_perkawinan'
        },
        {
            'type': 'klien',
            'key': 'tempat_lahir'
        },
        {
            'type': 'klien',
            'key': 'tanggal_lahir'
        },
        {
            'type': 'klien',
            'key': 'usia'
        },
        {
            'type': 'klien',
            'key': 'kategori_klien'
        },
        {
            'type': 'klien',
            'key': 'jenis_klien'
        },
        {
            'type': 'klien',
            'key': 'no_telp'
        },
        {
            'type': 'klien',
            'key': 'alamat_kk'
        },
        {
            'type': 'klien',
            'key': 'kelurahan'
        },
        {
            'type': 'klien',
            'key': 'kecamatan'
        },
        {
            'type': 'klien',
            'key': 'wilayah'
        },
        {
            'type': 'klien',
            'key': 'tipe_kasus'
        },
        {
            'type': 'klien',
            'key': 'tipe_permasalahan'
        },
        {
            'type': 'klien',
            'key': 'kategori_kasus'
        },
        {
            'type': 'klien',
            'key': 'jenis_kasus'
        },
        {
            'type': 'klien',
            'key': 'uraian_singkat_permasalahan'
        },
        {
            'type': 'klien',
            'key': 'lokasi_kasus'
        },
        {
            'type': 'klien',
            'key': 'tanggal_jam_kejadian'
        },
        {
            'type': 'klien',
            'key': 'kepemilikan_bpjs'
        },
        {
            'type': 'klien',
            'key': 'tanggal_jam_pengaduan'
        },
        {
            'type': 'klien',
            'key': 'tanggal_jam_penjangkauan'
        },
        {
            'type': 'klien',
            'key': 'konselor1'
        },
        {
            'type': 'klien',
            'key': 'konselor2'
        },
        {
            'type': 'klien',
            'key': 'sumber_pengaduan'
        },
        {
            'type': 'klien',
            'key': 'durasi_penganganan'
        },
    ],
    `
    <thead>
        <tr>
            <td colspan="22" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="4" style="background-color: #53b1c2; font-weight: bold;">ALAMAT KK</td>
            <td colspan="7" style="background-color: #866399; font-weight: bold;">DETAIL KASUS</td>
            <td colspan="6" style="background-color: #174680; font-weight: bold;">LAINNYA</td>
            <td style="background-color: #e07587;"></td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
        
                <td>NO</td>
                <td>NOMOR REGISTRASI</td>
                <td>NAMA KLIEN</td>
                <td>INISIAL</td>
                <td>NIK</td>
                <td>NO KK</td>
                <td>L/P</td>
                <td>PENDIDIKAN</td>
                <td>KELAS</td>
                <td>JURUSAN</td>
                <td>TAHUN LULUS</td>
                <td>NAMA INSTANSI / SEKOLAH</td>
                <td>PEKERJAAN</td>
                <td>PENGHASILAN PER BULAN</td>
                <td>AGAMA</td>
                <td>STATUS PERKAWINAN</td>
                <td>TEMPAT LAHIR</td>
                <td>TANGGAL LAHIR</td>
                <td>USIA</td>
                <td>KATEGORI KLIEN</td>
                <td>JENIS KLIEN</td>
                <td>TELP</td>
    

            <!-- ALAMAT KK -->
            <td>ALAMAT</td>
            <td>KELURAHAN</td>
            <td>KECAMATAN</td>
            <td>WILAYAH</td>

            <!-- DETAIL KASUS -->
            <td>TIPE KASUS</td>
            <td>TIPE PERMASALAHAN</td>
            <td>KATEGORI KASUS</td>
            <td>JENIS KASUS</td>
            <td>URAIAN SINGKAT PERMASALAHAN</td>
            <td>LOKASI KASUS</td>
            <td>TANGGAL DAN JAM KEJADIAN</td>

            <!-- LAINNYA -->
            <td>KEPEMILIKAN BPJS</td>
            <td>TANGGAL DAN JAM PENGADUAN</td>
            <td>TANGGAL DAN JAM PENJANGKAUAN</td>
            <td>KONSELOR 1</td>
            <td>KONSELOR 2</td>
            <td>SUMBER PENGADUAN</td>

            <td>DURASI PENGADUAN</td>
        </tr>
      </thead>
    `);

    var tablePelaku = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'pelaku',
            'key': 'nama_lengkap'
        },
        {
            'type': 'pelaku',
            'key': 'nik'
        },
        {
            'type': 'pelaku',
            'key': 'no_kk'
        },
        {
            'type': 'pelaku',
            'key': 'jenis_kelamin'
        },
        {
            'type': 'pelaku',
            'key': 'pendidikan'
        },
        {
            'type': 'pelaku',
            'key': 'jurusan'
        },
        {
            'type': 'pelaku',
            'key': 'tahun_lulus'
        },
        {
            'type': 'pelaku',
            'key': 'nama_instansi'
        },
        {
            'type': 'pelaku',
            'key': 'pekerjaan'
        },
        {
            'type': 'pelaku',
            'key': 'agama'
        },
        {
            'type': 'pelaku',
            'key': 'status_perkawinan'
        },
        {
            'type': 'pelaku',
            'key': 'kota_lahir'
        },
        {
            'type': 'pelaku',
            'key': 'tanggal_lahir'
        },
        {
            'type': 'pelaku',
            'key': 'usia'
        },
        {
            'type': 'pelaku',
            'key': 'no_telp'
        },
        {
            'type': 'pelaku',
            'key': 'hubungan_dengan_klien'
        },
        {
            'type': 'pelaku',
            'key': 'kewarganegaraan'
        },
        {
            'type': 'pelaku',
            'key': 'alamat_kk'
        },
        {
            'type': 'pelaku',
            'key': 'alamat_domisili'
        }
    ],
    `
    <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="19" style="background-color: #53b1c2; font-weight: bold;" >IDENTITAS PELAKU</td>
       </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

            <!-- PELAKU -->
            <td>NAMA PELAKU</td>
            <td>NIK</td>
            <td>KK</td>
            <td>L/P</td>
            <td>PENDIDIKAN</td>
            <td>JURUSAN</td>
            <td>TAHUN LULUS</td>
            <td>NAMA INSTANSI / SEKOLAH</td>
            <td>PEKERJAAN</td>
            <td>AGAMAL</td>
            <td>STATUS PERKAWINAN</td>
            <td>TEMPAT LAHIR</td>
            <td>TANGGAL LAHIR</td>
            <td>USIA</td>
            <td>TELP</td>
            <td>HUB. PELAKU DGN KORBAN</td>
            <td>KEWARGANEGARAAN</td>

            <!-- ALAMAT KK -->
            <td>ALAMAT KK</td>

            <!-- ALAMAT DOMISILI -->
            <td>ALAMAT DOMISILI</td>
        </tr>
    </thead>
    `);

    var tableKeterangan = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'keterangan',
            'key': 'situasi_keluarga'
        },
        {
            'type': 'keterangan',
            'key': 'kronologi_kejadian'
        },
        {
            'type': 'keterangan',
            'key': 'harapan_klien_dan_keluarga'
        },
        {
            'type': 'keterangan',
            'key': 'fisik'
        },
        {
            'type': 'keterangan',
            'key': 'psikis'
        },
        {
            'type': 'keterangan',
            'key': 'sosial'
        },
        {
            'type': 'keterangan',
            'key': 'spiritual'
        },  
    ],
    `
    <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="7" style="background-color: #99CC00; font-weight: bold;" >KONDISI KLIEN</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

            <!-- KONDISI KLIEN -->
            <td>SITUASI KELUARGA</td>
            <td>KRONOLOGI KEJADIAN</td>
            <td>HARAPAN KLIEN DAN KELUARGA</td>
            <td>FISIK</td>
            <td>PSIKOLOGIS</td>
            <td>SOSIAL</td>
            <td>SPIRITUAL</td>
        </tr>
    </thead>
    `)

    var tableKeluarga = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'keluarga',
            'key': 'hubungan'
        },
        {
            'type': 'keluarga',
            'key': 'nama_lengkap'
        },
        {
            'type': 'keluarga',
            'key': 'nik'
        },
        {
            'type': 'keluarga',
            'key': 'kk'
        },
        {
            'type': 'keluarga',
            'key': 'alamat_kk'
        },
        {
            'type': 'keluarga',
            'key': 'alamat_domisili'
        },
    ],`
    <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="6" style="background-color: #53b1c2; font-weight: bold;" >IDENTITAS KELUARGA</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

            <!-- KELUARGA -->
            <td>HUBUNGAN DENGAN KLIEN</td>
            <td>NAMA LENGKAP</td>
            <td>NIK</td>
            <td>KK</td>

            <!-- ALAMAT KK -->
            <td>ALAMAT KK</td>

            <!-- ALAMAT DOMISILI -->
            <td>ALAMAT DOMISILI</td>

        </tr>
        </thead>
    `);

    var tableRencanaDP3 = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'rencanadp3',
            'key': 'kebutuhan'
        },
        {
            'type': 'rencanadp3',
            'key': 'deskripsi'
        },
    ], `
       <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="2" style="background-color: #99CC00; font-weight: bold;" >PELAYANAN</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

           <!-- PELAYANAN -->
           <td>PELAYANAN YANG DIBERIKAN</td>
           <td>DESKRIPSI PELAYANAN</td>
        </tr>
        </thead> 
    `);

    var tableRencanaOPD = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nomor_register'
        },
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'rencana_rujukan',
            'key': 'kebutuhan'
        },
        {
            'type': 'rencana_rujukan',
            'key': 'OPD'
        },
        {
            'type': 'rencana_rujukan',
            'key': 'layanan_yang_diberikan'
        }, 
    ],`
    <thead>
        <tr>
            <td colspan="4" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="3" style="background-color: #99CC00; font-weight: bold;" >PELAYANAN</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NO REGISTRASI</td>
            <td>NAMA LENGKAP KLIEN</td>
            <td>NIK</td>

            <!-- PELAYANAN -->
            <td>KEBUTUHAN</td>
            <td>OPD/INSTANSI RUJUKAN</td>
            <td>PELAYANAN YANG DIBERIKAN INTERVENSI</td>
        </tr>
    </thead>
    `);
    
    var tableIntervensiDP3 = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'intervensi_dp3a',
            'key': 'tanggal_pelayanan'
        },
        {
            'type': 'intervensi_dp3a',
            'key': 'pelayanan_yang_diberikan'
        },
        {
            'type': 'intervensi_dp3a',
            'key': 'deskripsi'
        },
    ], `
    <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="3" style="background-color: #99CC00; font-weight: bold;" >PELAYANAN X</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

           <!-- PELAYANAN -->
           <td>TANGGAL PELAYANAN</td>
           <td>PELAYANAN YANG DIBERIKAN</td>
           <td>DESKRIPSI PELAYANAN</td>
        </tr>
        </thead>
    `);

    var tableIntervensiOPD = generateTable(data, [
        {
            'type': 'klien',
            'key': 'nama_klien'
        },
        {
            'type': 'klien',
            'key': 'nik'
        },
        {
            'type': 'intervensi_opd',
            'key': 'tanggal_pelayanan'
        },
        {
            'type': 'intervensi_opd',
            'key': 'instansi'
        },
        {
            'type': 'intervensi_opd',
            'key': 'pelayanan_diberikan'
        },
        {
            'type': 'intervensi_opd',
            'key': 'deskripsi_pelayanan'
        },
    ], `
    <thead>
        <tr>
            <td colspan="3" style="background-color: orange; font-weight: bold;" >IDENTITAS KLIEN</td>
            <td colspan="4" style="background-color: #99CC00; font-weight: bold;" >PELAYANAN X</td>
        </tr>
        <tr style="font-weight: bold; ">
            <!-- KLIEN -->
            <td>NO</td>
            <td>NAMA KLIEN</td>
            <td>NIK</td>

            <!-- PELAYANAN -->
             <td>TANGGAL PELAYANAN</td>
            <td>KEBUTUHAN</td>
            <td>OPD/INSTANSI RUJUKAN</td>
            <td>PELAYANAN YANG DIBERIKAN</td>

        </tr>
    </thead>
    `);

    const wb = XLSX.utils.book_new();
    
    const wsPelapor= XLSX.utils.table_to_sheet(tablePelapor);
    const wsKlien= XLSX.utils.table_to_sheet(tableKlien);
    const wsPelaku= XLSX.utils.table_to_sheet(tablePelaku);
    const wsKeterangan= XLSX.utils.table_to_sheet(tableKeterangan);
    const wsKeluarga= XLSX.utils.table_to_sheet(tableKeluarga);
    const wsRencanaDP3= XLSX.utils.table_to_sheet(tableRencanaDP3);
    const wsRencanaOPD= XLSX.utils.table_to_sheet(tableRencanaOPD);
    const wsIntervensiDP3= XLSX.utils.table_to_sheet(tableIntervensiDP3);
    const wsIntervensiOPD= XLSX.utils.table_to_sheet(tableIntervensiOPD);
    
    
    XLSX.utils.book_append_sheet(wb, wsPelapor, "Pelapor");
    XLSX.utils.book_append_sheet(wb, wsKlien, "Klien");
    XLSX.utils.book_append_sheet(wb, wsPelaku, "Pelaku");
    XLSX.utils.book_append_sheet(wb, wsKeterangan, "Keterangan");
    XLSX.utils.book_append_sheet(wb, wsKeluarga, "Keluarga");
    XLSX.utils.book_append_sheet(wb, wsRencanaDP3, "Rencana DP3APPKB");
    XLSX.utils.book_append_sheet(wb, wsRencanaOPD, "Rencana Rujukan OPD");
    XLSX.utils.book_append_sheet(wb, wsIntervensiDP3, "Intervensi DP3APPKB");
    XLSX.utils.book_append_sheet(wb, wsIntervensiOPD, "Intervensi OPD");
   
    
    XLSX.writeFile(wb, 'Laporan Kasus Klien.xlsx')
}

export default generateRekap

