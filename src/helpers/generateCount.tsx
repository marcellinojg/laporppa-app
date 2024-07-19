import * as XLSX from 'xlsx';

function removeNullValues(obj:any) {
Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
        removeNullValues(obj[key]);
    } else if (obj[key] === null || key.includes("id") || key.includes("satgas")) {
        delete obj[key];
    }
});
}


export function generateRekapBulanan(dataBulanan: any[]): void {
    dataBulanan = dataBulanan['data']
    removeNullValues(dataBulanan);

    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    const newData: { [key: string]: { data: number[], level: number } } = {};
    const heading: string[] = [];
    const order: string[] = [];
    const grandTotal: number[] = [];

    function addData(dictionary: { [key: string]: { data: number[], level: number } }, name: string, data: number, level: number): void {
        if (dictionary[name] === undefined) {
            dictionary[name] = { data: [data], level: level };
        } else {
            dictionary[name].data.push(data);
        }

        if (order.indexOf(name) < 0) {
            order.push(name);
        }
    }

    dataBulanan.forEach(data => {
        heading.push(String(bulan[data.bulan - 1] + " " + data.tahun));
        grandTotal.push(0);

        // Tipe Permasalahan
        data['data'].forEach((tipe_permasalahan: any) => {
            addData(newData, tipe_permasalahan.tipe_permasalahan, tipe_permasalahan.count_total, 0);
            grandTotal[grandTotal.length - 1] += tipe_permasalahan.count_total;
            addData(newData, tipe_permasalahan.tipe_permasalahan + "_ANAK", tipe_permasalahan.count_anak, 1);

            // Kategori Kasus Anak
            tipe_permasalahan['kategori_kasus'].forEach((kategori_kasus: any) => {
                addData(newData, "ANAK_" + kategori_kasus.kategori_kasus_nama, kategori_kasus.count_anak, 2);

                // Jenis Kasus Anak
                kategori_kasus['jenis_kasus'].forEach((jenis_kasus: any) => {
                    addData(newData, "ANAK_" + jenis_kasus.jenis_kasus_nama, jenis_kasus.count_anak, 3);
                });
            });

            addData(newData, tipe_permasalahan.tipe_permasalahan + "_DEWASA", tipe_permasalahan.count_dewasa, 1);

            // Kategori Kasus Dewasa
            tipe_permasalahan['kategori_kasus'].forEach((kategori_kasus: any) => {
                addData(newData, "DEWASA_" + kategori_kasus.kategori_kasus_nama, kategori_kasus.count_dewasa, 2);

                // Jenis Kasus Dewasa
                kategori_kasus['jenis_kasus'].forEach((jenis_kasus: any) => {
                    addData(newData, "DEWASA_" + jenis_kasus.jenis_kasus_nama, jenis_kasus.count_dewasa, 3);
                });
            });
        });
    });

    // Generate Table
    let table = `<table><thead>`;
    table += `<tr><th>TIPE PERMASALAHAN</th><th rowspan=2 colspan=${heading.length}>BULAN</th><th rowspan=3>GRAND TOTAL</th></tr>`;
    table += `<tr><th>&nbsp;&nbsp;KATEGORI KASUS</th></tr>`;
    table += `<tr><th>&nbsp;&nbsp;&nbsp;&nbsp;JENIS KASUS</th>`;
    heading.forEach(key => {
        table += `<th>${key}</th>`;
    });
    table += `</tr></thead>`;

    table += `<tbody>`;
    order.forEach(key => {
        const texts = key.split("_");
        const currentData = newData[key];
        table += `<tr><td>`;
        for (let i = 0; i < currentData.level; i++) {
            table += `&nbsp;&nbsp;`;
        }
        table += texts[texts.length - 1] + `</td>`;
        let currentTotal = 0;
        currentData.data.forEach(num => {
            table += `<td>${num}</td>`;
            currentTotal += num;
        });
        table += `<td>${currentTotal}</td></tr>`;
    });
    table += `<tr><td>Grand Total</td>`;
    let currentTotal = 0;
    grandTotal.forEach(num => {
        table += `<td>${num}</td>`;
        currentTotal += num;
    });
    table += `<td>${currentTotal}</td></tr>`;
    table += `</tbody></table>`;

    // Generate as Excel
    const parser = new DOMParser();
    const doc = parser.parseFromString(table, "text/html");
    const tableElement = doc.querySelector("table");
    if (tableElement) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(tableElement, { raw: true });
        XLSX.utils.book_append_sheet(wb, ws);
        XLSX.writeFile(wb, 'Laporan Rekap Bulanan.xlsx');
    }
}



export function generateRekapTahunan(dataTahunan){
    dataTahunan = dataTahunan['data']
    removeNullValues(dataTahunan);
    console.log(dataTahunan);
    var newData = {};
    var heading = [];
    var order = [];
    var grandTotal = [];
    function addData(dictionary, name, data, level){
        if(dictionary[name] === undefined){
            dictionary[name] = {data: [data], level:level};
        }else{
            dictionary[name].data.push(data);
        }

        if(order.indexOf(name) < 0){
            order.push(name);
        }
    }

    Object.keys(dataTahunan).forEach(data => {
        heading.push(data);
        grandTotal.push(0);
        grandTotal.push(0);
        grandTotal.push(0);
        //Tipe Permasalahan
        dataTahunan[data].forEach(tipe_permasalahan => {
            addData(newData,tipe_permasalahan.tipe_permasalahan,tipe_permasalahan.count_anak,0);
            addData(newData,tipe_permasalahan.tipe_permasalahan,tipe_permasalahan.count_dewasa,0);
            addData(newData,tipe_permasalahan.tipe_permasalahan,tipe_permasalahan.count_total,0);
            grandTotal[(heading.length-1) * 3]+=tipe_permasalahan.count_anak;
            grandTotal[(heading.length-1) * 3+1]+=tipe_permasalahan.count_dewasa;
            grandTotal[(heading.length-1) * 3+2]+=tipe_permasalahan.count_total;

            //Kategori Kasus
            tipe_permasalahan['kategori_kasus'].forEach(kategori_kasus => {
                addData(newData,kategori_kasus.kategori_kasus_nama,kategori_kasus.count_anak,1);
                addData(newData,kategori_kasus.kategori_kasus_nama,kategori_kasus.count_dewasa,1);
                addData(newData,kategori_kasus.kategori_kasus_nama,kategori_kasus.count_total,1);

                //Jenis Kasus
                kategori_kasus['jenis_kasus'].forEach(jenis_kasus => {
                    addData(newData,jenis_kasus.jenis_kasus_nama,jenis_kasus.count_anak,1);
                    addData(newData,jenis_kasus.jenis_kasus_nama,jenis_kasus.count_dewasa,1);
                    addData(newData,jenis_kasus.jenis_kasus_nama,jenis_kasus.count_total,1);
                });
            });
        });
    });

    console.log(newData);
    console.log(grandTotal);

    //generate Table
    var table = `<table><thead>`;
    //head
    table+=`<tr><th>TIPE PERMASALAHAN</th><th colspan=`+heading.length*3+`>TAHUN</th><th rowspan=3>GRAND TOTAL</th></tr>`;

    table+=`<tr><th>&nbsp;&nbsp;KATEGORI KASUS</th>`;
    heading.forEach(key => {
        table+=`<th colspan=2>`+key+`</th>`;
        table+=`<th rowspan=2>`+key+` Total</th>`;
    });
    table+="</tr>";
    table+=`<tr><th>&nbsp;&nbsp;&nbsp;&nbsp;JENIS KASUS</th>`;
    heading.forEach(key => {
        table+=`<th>ANAK</th>`;
        table+=`<th>DEWASA</th>`;
    });
    table+=`</tr></thead>`;

    table+=`<tbody>`;
    //body
    order.forEach(key => {
        var currentData = newData[key];
        table+=`<tr><td>`;
        for(var i=0;i<currentData.level;i++){
            table+=`&nbsp;&nbsp;`;
        }
        table+=key+`</td>`;
        var currentTotal = 0;
        var counter = 1;
        currentData.data.forEach(num => {
            table+=`<td>`+num+`</td>`;
            if(counter%3==0)
                currentTotal+=num;
            counter++;
        });
        table+=`<td>`+currentTotal+`</td></tr>`;
    });

    table+=`<tr><td>Grand Total</td>`;
    var currentTotal = 0;
    var counter = 1;
    grandTotal.forEach(num => {
        table+=`<td>`+num+`</td>`;
        if(counter%3==0)
            currentTotal+=num;
        counter++;
    });
    table+=`<td>`+currentTotal+`</td></tr>`;
    table+=`</tbody></table>`;

    //generate as Excel
    table = new DOMParser().parseFromString(table, "text/html").querySelector("table");
    const wb = XLSX.utils.book_new();
    const ws= XLSX.utils.table_to_sheet(table, {raw:true});
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, 'Laporan Rekap Tahunan.xlsx');
}


