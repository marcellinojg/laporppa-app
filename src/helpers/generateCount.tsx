import * as XLSX from 'xlsx';

var data = {
    "code": 200,
    "success": true,
    "data": [
        {
            "tahun": "2024",
            "bulan": "1",
            "data": [
                {
                    "tipe_permasalahan": "Permasalahan Sosial",
                    "id_tipe_permalahan": 1,
                    "count_anak": 2,
                    "count_dewasa": 0,
                    "count_total": 5,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 3,
                            "kategori_kasus_nama": "Kesehatan",
                            "count_anak": 2,
                            "count_dewasa": 0,
                            "count_total": 2,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 1,
                                    "jenis_kasus_nama": "Pengobatan",
                                    "count_anak": 2,
                                    "count_dewasa": 0,
                                    "count_total": 2
                                },
                                {
                                    "jenis_kasus_id": 2,
                                    "jenis_kasus_nama": "Pemeriksaan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 4,
                            "kategori_kasus_nama": "Pendidikan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 1,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 3,
                                    "jenis_kasus_nama": "Putus Sekolah",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 1
                                }
                            ]
                        }
                    ]
                },
                {
                    "tipe_permasalahan": "Kekerasan",
                    "id_tipe_permalahan": 2,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 4,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 1,
                            "kategori_kasus_nama": "Non KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 6,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 7,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 8,
                                    "jenis_kasus_nama": "Seks",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 2,
                            "kategori_kasus_nama": "KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 4,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 5,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tahun": "2024",
            "bulan": 2,
            "data": [
                {
                    "tipe_permasalahan": "Permasalahan Sosial",
                    "id_tipe_permalahan": 1,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 3,
                            "kategori_kasus_nama": "Kesehatan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 1,
                                    "jenis_kasus_nama": "Pengobatan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 2,
                                    "jenis_kasus_nama": "Pemeriksaan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 4,
                            "kategori_kasus_nama": "Pendidikan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 3,
                                    "jenis_kasus_nama": "Putus Sekolah",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                },
                {
                    "tipe_permasalahan": "Kekerasan",
                    "id_tipe_permalahan": 2,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 1,
                            "kategori_kasus_nama": "Non KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 6,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 7,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 8,
                                    "jenis_kasus_nama": "Seks",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 2,
                            "kategori_kasus_nama": "KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 4,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 5,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tahun": "2024",
            "bulan": 3,
            "data": [
                {
                    "tipe_permasalahan": "Permasalahan Sosial",
                    "id_tipe_permalahan": 1,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 3,
                            "kategori_kasus_nama": "Kesehatan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 1,
                                    "jenis_kasus_nama": "Pengobatan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 2,
                                    "jenis_kasus_nama": "Pemeriksaan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 4,
                            "kategori_kasus_nama": "Pendidikan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 3,
                                    "jenis_kasus_nama": "Putus Sekolah",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                },
                {
                    "tipe_permasalahan": "Kekerasan",
                    "id_tipe_permalahan": 2,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 1,
                            "kategori_kasus_nama": "Non KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 6,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 7,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 8,
                                    "jenis_kasus_nama": "Seks",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 2,
                            "kategori_kasus_nama": "KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 4,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 5,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tahun": "2024",
            "bulan": 4,
            "data": [
                {
                    "tipe_permasalahan": "Permasalahan Sosial",
                    "id_tipe_permalahan": 1,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 3,
                            "kategori_kasus_nama": "Kesehatan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 1,
                                    "jenis_kasus_nama": "Pengobatan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 2,
                                    "jenis_kasus_nama": "Pemeriksaan",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 4,
                            "kategori_kasus_nama": "Pendidikan",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 3,
                                    "jenis_kasus_nama": "Putus Sekolah",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                },
                {
                    "tipe_permasalahan": "Kekerasan",
                    "id_tipe_permalahan": 2,
                    "count_anak": 0,
                    "count_dewasa": 0,
                    "count_total": 0,
                    "kategori_kasus": [
                        {
                            "kategori_kasus_id": 1,
                            "kategori_kasus_nama": "Non KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 6,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 7,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 8,
                                    "jenis_kasus_nama": "Seks",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        },
                        {
                            "kategori_kasus_id": 2,
                            "kategori_kasus_nama": "KDRT",
                            "count_anak": 0,
                            "count_dewasa": 0,
                            "count_total": 0,
                            "jenis_kasus": [
                                {
                                    "jenis_kasus_id": 4,
                                    "jenis_kasus_nama": "Fisik",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                },
                                {
                                    "jenis_kasus_id": 5,
                                    "jenis_kasus_nama": "Psikis",
                                    "count_anak": 0,
                                    "count_dewasa": 0,
                                    "count_total": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
        

data = data['data'];

function removeNullValues(obj) {
Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
        removeNullValues(obj[key]);
    } else if (obj[key] === null || key.includes("id") || key.includes("satgas")) {
        delete obj[key];
    }
});
}

function dict_check(dictA, dictB){
    
    for(keyA in dictA){
        if(!(keyA in dictB)){return false;}
        else if(dictA[keyA] != dictB[keyA]){return false;}
    }
    return true;
}

function generateTable(data, label="", dict={}, dicts=[]){
            for(component in data){
                detail_component = data[component];
                var typedetail = typeof detail_component;
                size = (detail_component == null )?"null":Object.keys(detail_component).length
                if(typedetail == "string" || typedetail == "number"){
                    console.log(label+" "+component+" : "+detail_component);
                    dict[label+"_"+component] = detail_component;
                }else if(detail_component === null){
                    dict[label+"_"+component] = "-";
                }
                else{
                    if(isNaN(Number(component))){
                        generateTable(detail_component, label+"_"+component, dict, dicts);
                    }else{
                        generateTable(detail_component, label, dict, dicts);
                    }
                    
                }
            }
            var copy_dict = {}
            Object.assign(copy_dict, dict)
            flag = false;
            for(a in dicts){
                if(dict_check(copy_dict, dicts[a])){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                dicts.push(copy_dict);
            }
                
            
            return dicts;
        }

function generateDict2Table(dicts){
            var table = "<table border='1' id='myTable'><tr>";
        
            for(col in dicts[0]){
                table+="<th>"+col.replace(/_/g," " )+"</th>";
            }
            table+="</tr>";

            for(index in dicts){
                table+="<tr>"
                for(col in dicts[index]){
                    table+="<td>"+dicts[index][col]+"</td>"
                }
                table+="</tr>"
            }

            table+="</table>";

            return table;
        }

function generateCount(){
    dicts = []
    for(id in data){
        
        dicts=dicts.concat(generateTable(data[id],"",{}))
    }

    var table = generateDict2Table(dicts);
    console.log(dicts)
    table = new DOMParser().parseFromString(table, "text/html").querySelector("table");
    console.log(table)

    const wb = XLSX.utils.book_new();
    
    const ws= XLSX.utils.table_to_sheet(table)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    

    XLSX.writeFile(wb, 'table.xls');    

}

export default generateCount