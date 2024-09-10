export function getOrderData(orderIdList: any, orderList: any, orderMap: any) {
  let result: any[] = [];
  let arrs: any[] = [];

  orderIdList.forEach((orderId: any) => {
    orderList.forEach((item: any) => {
      if (item.order_id === Number(orderId)) {
        let newItem = [];
        if (item.transactions.length > 1) {
          item.transactions.forEach((trans: any, ind: any) => {
            let arrItem = {
              // ...trans,
              orderId: item.order_id,
              product: {
                ...trans.product,
              },
              cost: trans.cost,
              sku: trans.variations,
              quantity: trans.quantity,
              address: item.fulfillment?.to_address,
            };
            if (ind > 0) {
              delete arrItem.address;
            }

            newItem.push(arrItem);
          });
        } else {
          let oneItem = {
            // ...item,
            orderId: item.order_id,
            product: {
              ...item.transactions?.[0].product,
            },
            cost: item.transactions?.[0].cost,
            sku: item.transactions?.[0].variations,
            quantity: item.transactions?.[0].quantity,
            address: item.fulfillment?.to_address,
          };

          newItem.push(oneItem);
        }

        orderMap.set(orderId, newItem);
      }
    });
  });

  console.log("Array.from(orderMap.values())", Array.from(orderMap.values()));
  Array.from(orderMap.values()).forEach((order) => {
    if (Array.isArray(order)) {
      order.forEach((item) => {
        let { obj, arr } = asResult(item);
        result.push(obj);
        arrs.push(arr);
      });
    } else {
      let { obj, arr } = asResult(order);
      result.push(obj);
      arrs.push(arr);
    }
  });

  return {
    result: result,
    arr: arrs,
    map: orderMap,
  };
}

function asResult(order: any) {
  let orderId = order.orderId;
  let orderImage = order.product.image_url_75x75;
  let sku = order.product.product_identifier;
  let sku_style;

  let sku_color;

  let quality = order.quantity;
  let custom = "";
  let date = "";

  let name = order?.address?.name || "";
  let country = order?.address?.country || "";
  let state = order?.address?.state || "";
  let city = order?.address?.city || "";
  let first_line = order?.address?.first_line || "";
  let code = order?.address?.zip || "";

  order.sku.forEach((item: any) => {
    if (
      item.property == "Styles &amp; Sizes" ||
      item.property === "Colors &amp; Styles"
    ) {
      sku_style = item.value;
    }
    if (item.property == "Color" || item.property === "Text Thread Colors") {
      sku_color = item.value;
    }
    if (item.property === "Personalization") {
      let customText = item.value;
      if (customText.includes("\n")) {
        custom = customText.split("\n").join("&#x000A;");
      } else {
        custom = customText;
      }
    }
  });

  const obj = {
    orderId: orderId,
    orderImage: orderImage,
    sku: sku,
    sku_style: sku_style,
    sku_color: sku_color,
    custom: custom,
    quality: quality,
    date: date,
    name: name,
    country: country,
    state: state,
    city: city,
    first_line: first_line,
    code: code,
  };

  const arr = [
    orderId,
    orderImage,
    sku,
    sku_style,
    sku_color,
    quality,
    custom,
    date,
    name,
    country,
    state,
    city,
    first_line,
    code,
  ];
  return {
    obj: obj,
    arr: arr,
  };
}

export const exportExcelFromFront = (params: any) => {
  const { cellList, headerList, exportName = "exportName" } = params;

  const headerEle = `<tr>${headerList
    ?.map((item: any) => `<th>${item}</th>`)
    ?.join("")}</tr>`;
  const cellEle = cellList
    ?.map(
      (itemRow: any) =>
        `<tr>${itemRow
          ?.map((itemCell: any) => `<td>${itemCell}</td>`)
          ?.join("")}</tr>`
    )
    ?.join("");

  const excelContent = `${headerEle}${cellEle}`;

  let excelFile =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile +=
    "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
  excelFile += "<body><table width='10%'  border='1'>";
  excelFile += excelContent;
  excelFile += "</table></body>";
  excelFile += "</html>";

  const link = `data:application/vnd.ms-excel;base64,${trans2Base64(
    excelFile
  )}`;
  const a = document.createElement("a");
  a.download = `${exportName}.xls`;
  a.href = link;
  a.click();
};

const trans2Base64 = (content: any) => {
  return window.btoa(unescape(encodeURIComponent(content)));
};
