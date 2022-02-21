const washCarButton = document.getElementById('wash-car-btn')
const mowLawnButton = document.getElementById('mow-lawn-btn')
const pullWeedsButton = document.getElementById('pull-weeds-btn')
const saveInvoiceButton = document.getElementById('send-invoice-btn')
const invoiceListItemsContainer = document.getElementById(
  'invoice-list-items-container'
)
const invoiceListPricesContainer = document.getElementById(
  'invoice-list-prices-container'
)
const summaryNote = document.getElementById('summary-note')
const totalAmount = document.getElementById('total-amount')

let invoiceState = []

washCarButton.addEventListener('click', function () {
  addJob('Wash Car', 10)
})

mowLawnButton.addEventListener('click', function () {
  addJob('Mow Lawn', 20)
})

pullWeedsButton.addEventListener('click', function () {
  addJob('Pull Weeds', 30)
})

saveInvoiceButton.addEventListener('click', clearInvoice)

function addJob(jobName, jobWage) {
  if (invoiceState.every((job) => job.jobName !== jobName)) {
    invoiceState.push({ jobName, jobWage })
  }
  renderInvoice()
}

function removeJob(jobName) {
  invoiceState = invoiceState.filter((job) => job.jobName !== jobName)
  renderInvoice()
}

function renderInvoiceItems() {
  invoiceListItemsContainer.innerHTML = ''
  invoiceListPricesContainer.innerHTML = ''
  for (const job of invoiceState) {
    invoiceListItemsContainer.innerHTML += `
        <div class="item-container">
            <p class="item-name">${job.jobName}</p>
            <button class="remove-item-button" onclick="removeJob('${job.jobName}')">Remove</button>
        </div>
        `

    invoiceListPricesContainer.innerHTML += `
        <div class="price-container">
            <p class="price-value"><span class="text-highlight">$</span>${job.jobWage}</p>
        </div>
        `
  }
}

function renderSummaryNote() {
  summaryNote.textContent = ''
  if (invoiceState.length >= 1) {
    summaryNote.textContent = 'We accept cash, credit card, or PayPal'
  }
}

function renderTotalAmount() {
  let amount = 0
  totalAmount.textContent = ''
  for (const job of invoiceState) {
    amount += parseInt(job.jobWage)
  }
  totalAmount.textContent = `$${amount.toString()}`
}

function clearInvoice() {
  invoiceListItemsContainer.innerHTML = ''
  invoiceListPricesContainer.innerHTML = ''
  summaryNote.textContent = ''
  totalAmount.textContent = ''
}

function renderInvoice() {
  renderInvoiceItems()
  renderSummaryNote()
  renderTotalAmount()
}
