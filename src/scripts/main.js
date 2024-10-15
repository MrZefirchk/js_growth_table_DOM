'use strict';

// write code here
const container = document.querySelector('.container');
const appendRowButton = container.querySelector('.append-row');
const removeRowButton = container.querySelector('.remove-row');
const appendColumnButton = container.querySelector('.append-column');
const removeColumnButton = container.querySelector('.remove-column');

const appendRow = (tableRows) => {
  const newRow = document.createElement('tr');

  for (
    let i = 0;
    i < tableRows.lastElementChild.querySelectorAll('td').length;
    i++
  ) {
    const newCell = document.createElement('td');

    newRow.appendChild(newCell);
  }
  tableRows.appendChild(newRow);
};

const removeRow = (tableRows) => {
  tableRows.lastElementChild.remove();
};

const appendColumn = (tableRows) => {
  tableRows.querySelectorAll('tr').forEach((elem) => {
    const newTableData = document.createElement('td');

    elem.appendChild(newTableData);
  });
};

const removeColumn = (tableRows) => {
  tableRows.querySelectorAll('tr').forEach((elem) => {
    elem.lastElementChild.remove();
  });
};

container.addEventListener('click', (e) => {
  const clickedButton = e.target.closest('button');

  if (!clickedButton) {
    return;
  }

  const MAX_ROWS = 10;
  const MAX_COLUMNS = 10;
  const MIN_ROWS = 2;
  const MIN_COLUMNS = 2;

  const tableRows = container.querySelector('tbody');
  let rowsCount = tableRows.children.length;
  let columnsCount = tableRows.firstChild.children.length;

  if (clickedButton === appendRowButton && rowsCount < MAX_ROWS) {
    appendRow(tableRows);

    rowsCount++;
  } else if (clickedButton === removeRowButton && rowsCount > MIN_ROWS) {
    removeRow(tableRows);

    rowsCount--;
  } else if (
    clickedButton === appendColumnButton &&
    columnsCount < MAX_COLUMNS
  ) {
    appendColumn(tableRows);

    columnsCount++;
  } else if (
    clickedButton === removeColumnButton &&
    columnsCount > MIN_COLUMNS
  ) {
    removeColumn(tableRows);

    columnsCount--;
  }

  const updateButtons = [
    {
      button: appendRowButton,
      condition: rowsCount >= MAX_ROWS,
    },
    {
      button: removeRowButton,
      condition: rowsCount <= MIN_ROWS,
    },
    {
      button: appendColumnButton,
      condition: columnsCount >= MAX_COLUMNS,
    },
    {
      button: removeColumnButton,
      condition: columnsCount <= MIN_COLUMNS,
    },
  ];

  updateButtons.forEach(({ button, condition }) => {
    button.disabled = condition;
  });
});
