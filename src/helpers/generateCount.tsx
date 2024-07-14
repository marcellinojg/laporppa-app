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

function dict_check(dictA: { [key: string]: any }, dictB: { [key: string]: any }): boolean {
    for (const keyA in dictA) {
        if (!(keyA in dictB)) {
            return false;
        } else if (dictA[keyA] !== dictB[keyA]) {
            return false;
        }
    }
    return true;
}


function generateTable(data: any, label: string = "", dict: { [key: string]: any } = {}, dicts: { [key: string]: any }[] = []): { [key: string]: any }[] {
    for (const component in data) {
        let detail_component = data[component];
        let typedetail = typeof detail_component;
        let size = (detail_component == null) ? "null" : Object.keys(detail_component).length;

        if (typedetail === "string" || typedetail === "number") {
            console.log(label + " " + component + " : " + detail_component);
            dict[label + "_" + component] = detail_component;
        } else if (detail_component === null) {
            dict[label + "_" + component] = "-";
        } else {
            if (isNaN(Number(component))) {
                generateTable(detail_component, label + "_" + component, dict, dicts);
            } else {
                generateTable(detail_component, label, dict, dicts);
            }
        }
    }

    let copy_dict: { [key: string]: any } = { ...dict };
    let flag = false;

    for (const a in dicts) {
        if (dict_check(copy_dict, dicts[a])) {
            flag = true;
            break;
        }
    }

    if (!flag) {
        dicts.push(copy_dict);
    }

    return dicts;
}


function generateDict2Table(dicts: { [key: string]: any }[]): string {
    let table = "<table border='1' id='myTable'><tr>";

    for (const col in dicts[0]) {
        table += "<th>" + col.replace(/_/g, " ") + "</th>";
    }
    table += "</tr>";

    for (const index in dicts) {
        table += "<tr>";
        for (const col in dicts[index]) {
            table += "<td>" + dicts[index][col] + "</td>";
        }
        table += "</tr>";
    }

    table += "</table>";
    return table;
}


function generateCount(data: { [key: string]: any }): void {
    data = data['data'];
    let dicts: { [key: string]: any }[] = [];

    for (const id in data) {
        dicts = dicts.concat(generateTable(data[id], "", {}));
    }

    let table = generateDict2Table(dicts);
    console.log(dicts);

    const parser = new DOMParser();
    const doc = parser.parseFromString(table, "text/html");
    const tableElement = doc.querySelector("table");
    console.log(tableElement);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tableElement);
    XLSX.utils.book_append_sheet(wb, ws, "Rekap");

    XLSX.writeFile(wb, 'Laporan Rekap.xls');
}


export default generateCount