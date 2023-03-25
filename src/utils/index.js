export const somaTotal = (listProducts, entrega) => {
  let newTotal = 0;
  listProducts.map((produto) => {
    return (newTotal +=
      parseFloat(produto.product.valor) * parseInt(produto.qtd));
  });
  if (entrega > 0) {
    newTotal += parseInt(entrega);
  }
  return newTotal.toFixed(2);
};

export const nextMonth = (monthFilter) => {
  const newMonth = monthFilter;
  if (newMonth.getMonth() + 1 > 11) {
    newMonth.setMonth(newMonth.getMonth() - 11);
    newMonth.setFullYear(newMonth.getFullYear() + 1);
  } else {
    newMonth.setMonth(newMonth.getMonth() + 1);
  }
  return newMonth;
};

export const beforeMonth = (monthFilter) => {
  const newMonth = monthFilter;
  if (newMonth.getMonth() - 1 < -1) {
    newMonth.setMonth(newMonth.getMonth() + 11);
    newMonth.setFullYear(newMonth.getFullYear() - 1);
  } else {
    newMonth.setMonth(newMonth.getMonth() - 1);
  }
  return newMonth
};

export const filterData = (pedidos,monthFilter) => {
  const newList = pedidos.filter((pedido) => {
    let dateFormatA = pedido.data.split("/");
    dateFormatA = `${dateFormatA[2]}-${dateFormatA[1]}-${dateFormatA[0]}`;
    let orderDate = new Date(dateFormatA);
    return (
      orderDate.getMonth() === monthFilter.getMonth() &&
      orderDate.getFullYear() === monthFilter.getFullYear()
    );
  });
  return newList
};
