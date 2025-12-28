// Format date to DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN').format(amount) + '/-';
}

// Generate invoice HTML - minimalist and professional
function generateInvoiceHTML(data) {
    return `
        <div class="invoice">
            <div class="invoice-header">
                <div class="invoice-meta">
                    <div class="meta-item">
                        <span class="meta-label">Issued</span>
                        <span class="meta-value" data-field="issueDate">${formatDate(data.issueDate)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Invoice</span>
                        <span class="meta-value" data-field="invoiceNumber">${data.invoiceNumber}</span>
                    </div>
                </div>
                <div class="invoice-title">
                    <h1 data-field="clientName">${data.clientName}</h1>
                </div>
                <div class="client-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Account Name</span>
                            <span class="info-value" data-field="accountName">${data.accountName}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Account Number</span>
                            <span class="info-value" data-field="accountNumber">${data.accountNumber}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">IFSC</span>
                            <span class="info-value" data-field="ifsc">${data.ifsc}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">PAN</span>
                            <span class="info-value" data-field="pan">${data.pan}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="invoice-divider"></div>

            <div class="service-details">
                <table class="service-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th class="amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-field="serviceDescription">${data.serviceDescription}</td>
                            <td class="amount" data-field="amount">${formatCurrency(data.amount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="invoice-divider"></div>

            <div class="total-section">
                <div class="total-row">
                    <span class="total-label">Total</span>
                    <span class="total-value" data-field="amount">${formatCurrency(data.amount)}</span>
                </div>
            </div>

            <div class="invoice-divider"></div>

            <div class="invoice-footer">
                <div class="footer-section">
                    <h3 data-field="companyName">${data.companyName}</h3>
                    <p data-field="companyAddress">${data.companyAddress}</p>
                    <div class="footer-details">
                        <span><strong>GSTIN:</strong> <span data-field="gstin">${data.gstin}</span></span>
                        <span><strong>Email:</strong> <span data-field="companyEmail1">${data.companyEmail1}</span>${data.companyEmail2 ? ', <span data-field="companyEmail2">' + data.companyEmail2 + '</span>' : ''}</span>
                        <span><strong>Phone:</strong> <span data-field="companyPhone">${data.companyPhone}</span></span>
                    </div>
                </div>
                <div class="footer-section">
                    <h3 data-field="clientContactName">${data.clientContactName}</h3>
                    <div class="footer-details">
                        <span><strong>Phone:</strong> <span data-field="clientPhone">${data.clientPhone}</span></span>
                        <span><strong>Address:</strong> <span data-field="clientAddress">${data.clientAddress}</span></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get form data
function getFormData() {
    const getValue = (id) => document.getElementById(id)?.value || '';
    const getNumber = (id) => {
        const val = document.getElementById(id)?.value;
        return val ? parseFloat(val) : 0;
    };

    return {
        issueDate: getValue('issueDate'),
        invoiceNumber: getValue('invoiceNumber'),
        clientName: getValue('clientName').toUpperCase(),
        accountName: getValue('accountName'),
        accountNumber: getValue('accountNumber'),
        ifsc: getValue('ifsc').toUpperCase(),
        pan: getValue('pan').toUpperCase(),
        serviceDescription: getValue('serviceDescription'),
        amount: getNumber('amount'),
        companyName: getValue('companyName').toUpperCase(),
        companyAddress: getValue('companyAddress'),
        gstin: getValue('gstin').toUpperCase(),
        companyEmail1: getValue('companyEmail1'),
        companyEmail2: getValue('companyEmail2'),
        companyPhone: getValue('companyPhone'),
        clientContactName: getValue('clientContactName').toUpperCase(),
        clientPhone: getValue('clientPhone'),
        clientAddress: getValue('clientAddress')
    };
}

// Validate form
function validateForm() {
    const form = document.getElementById('invoiceForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}

// Debounce function for performance
let previewTimeout;
function debouncePreview(func, wait = 300) {
    clearTimeout(previewTimeout);
    previewTimeout = setTimeout(func, wait);
}

// Field mapping for smart updates
const fieldMapping = {
    'issueDate': (value) => formatDate(value || new Date().toISOString().split('T')[0]),
    'invoiceNumber': (value) => value || '000',
    'clientName': (value) => value ? value.toUpperCase() : 'CLIENT NAME',
    'accountName': (value) => value || 'Account Name',
    'accountNumber': (value) => value || 'Account Number',
    'ifsc': (value) => value ? value.toUpperCase() : 'IFSC CODE',
    'pan': (value) => value ? value.toUpperCase() : 'PAN NUMBER',
    'serviceDescription': (value) => value || 'Service Description',
    'amount': (value) => {
        const num = parseFloat(value) || 0;
        return formatCurrency(num);
    },
    'companyName': (value) => value ? value.toUpperCase() : 'COMPANY NAME',
    'companyAddress': (value) => value || 'Company Address',
    'gstin': (value) => value ? value.toUpperCase() : 'GSTIN NUMBER',
    'companyEmail1': (value) => value || 'email@company.com',
    'companyEmail2': (value) => value || '',
    'companyPhone': (value) => value || '+91 0000000000',
    'clientContactName': (value) => value ? value.toUpperCase() : 'CONTACT NAME',
    'clientPhone': (value) => value || '+91 0000000000',
    'clientAddress': (value) => value || 'Client Address'
};

// Update a specific field in the preview
function updatePreviewField(fieldId) {
    const invoicePreview = document.getElementById('invoicePreview');
    const invoiceElement = invoicePreview.querySelector('.invoice');

    if (!invoiceElement) {
        // If invoice doesn't exist, do full update
        updatePreview();
        return;
    }

    const data = getFormData();
    const formatter = fieldMapping[fieldId];

    if (!formatter) return;

    const formattedValue = formatter(data[fieldId]);

    // Find all elements with this data-field attribute
    const elements = invoiceElement.querySelectorAll(`[data-field="${fieldId}"]`);

    elements.forEach(el => {
        if (fieldId === 'amount') {
            el.textContent = formattedValue;
        } else if (fieldId === 'issueDate') {
            el.textContent = formattedValue;
        } else if (fieldId === 'companyEmail2') {
            // Special handling for email2 - update if element exists
            if (data.companyEmail2) {
                el.textContent = data.companyEmail2;
            } else {
                // If email2 is removed, do full refresh to update structure
                updatePreview();
                return;
            }
        } else {
            el.textContent = formattedValue;
        }
    });

    // Special case: if amount changed, also update total
    if (fieldId === 'amount') {
        const totalElements = invoiceElement.querySelectorAll('.total-value[data-field="amount"]');
        totalElements.forEach(el => {
            el.textContent = formattedValue;
        });
    }
}

// Update preview in real-time (full update for initial load)
function updatePreview() {
    const invoicePreview = document.getElementById('invoicePreview');

    try {
        const data = getFormData();

        // Fill in defaults for missing fields to show preview
        const previewData = {
            issueDate: data.issueDate || new Date().toISOString().split('T')[0],
            invoiceNumber: data.invoiceNumber || '000',
            clientName: data.clientName || 'CLIENT NAME',
            accountName: data.accountName || 'Account Name',
            accountNumber: data.accountNumber || 'Account Number',
            ifsc: data.ifsc || 'IFSC CODE',
            pan: data.pan || 'PAN NUMBER',
            serviceDescription: data.serviceDescription || 'Service Description',
            amount: data.amount || 0,
            companyName: data.companyName || 'COMPANY NAME',
            companyAddress: data.companyAddress || 'Company Address',
            gstin: data.gstin || 'GSTIN NUMBER',
            companyEmail1: data.companyEmail1 || 'email@company.com',
            companyEmail2: data.companyEmail2 || '',
            companyPhone: data.companyPhone || '+91 0000000000',
            clientContactName: data.clientContactName || 'CONTACT NAME',
            clientPhone: data.clientPhone || '+91 0000000000',
            clientAddress: data.clientAddress || 'Client Address'
        };

        // Only show preview if we have at least some basic data
        const hasBasicData = data.issueDate || data.invoiceNumber || data.clientName || data.amount;

        if (hasBasicData) {
            invoicePreview.innerHTML = generateInvoiceHTML(previewData);
        } else {
            showEmptyPreview();
        }
    } catch (error) {
        console.error('Preview error:', error);
        showEmptyPreview();
    }
}

// Show empty preview state
function showEmptyPreview() {
    const invoicePreview = document.getElementById('invoicePreview');
    invoicePreview.innerHTML = `
        <div class="empty-preview">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <p>Start filling the form to see your invoice preview</p>
        </div>
    `;
}

// Generate PDF
async function generatePDF() {
    if (!validateForm()) return;

    const data = getFormData();

    // Create a completely isolated container with NO external CSS
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        background: #ffffff;
        padding: 40px;
        width: 800px;
        color: #1a1a1a;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
    `;

    // Generate invoice with inline styles - Minimalist design
    const invoiceHTML = `
        <div style="max-width: 800px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; background: #ffffff; padding: 0; line-height: 1.6;">
            <div style="margin-bottom: 48px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e5e5e5;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Issued</span>
                        <span style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${formatDate(data.issueDate)}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Invoice</span>
                        <span style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${data.invoiceNumber}</span>
                    </div>
                </div>
                <div style="margin-bottom: 32px;">
                    <h1 style="font-size: 28px; font-weight: 600; letter-spacing: -0.5px; color: #1a1a1a; margin: 0;">${data.clientName}</h1>
                </div>
                <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 32px;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Account Name</span>
                        <span style="font-size: 14px; font-weight: 400; color: #1a1a1a;">${data.accountName}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Account Number</span>
                        <span style="font-size: 14px; font-weight: 400; color: #1a1a1a;">${data.accountNumber}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">IFSC</span>
                        <span style="font-size: 14px; font-weight: 400; color: #1a1a1a;">${data.ifsc}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">PAN</span>
                        <span style="font-size: 14px; font-weight: 400; color: #1a1a1a;">${data.pan}</span>
                    </div>
                </div>
            </div>

            <div style="height: 1px; background: #e5e5e5; margin: 32px 0; border: none;"></div>

            <div style="margin-bottom: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="border-bottom: 1px solid #e5e5e5;">
                        <tr>
                            <th style="text-align: left; padding: 12px 0; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Service</th>
                            <th style="text-align: right; padding: 12px 0; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 16px 0; font-size: 15px; color: #1a1a1a;">${data.serviceDescription}</td>
                            <td style="text-align: right; padding: 16px 0; font-size: 15px; font-weight: 500; color: #1a1a1a;">${formatCurrency(data.amount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="height: 1px; background: #e5e5e5; margin: 32px 0; border: none;"></div>

            <div style="margin-bottom: 32px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0;">
                    <span style="font-size: 16px; font-weight: 600; color: #1a1a1a;">Total</span>
                    <span style="font-size: 20px; font-weight: 600; color: #1a1a1a;">${formatCurrency(data.amount)}</span>
                </div>
            </div>

            <div style="height: 1px; background: #e5e5e5; margin: 32px 0; border: none;"></div>

            <div style="margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; font-size: 13px; line-height: 1.8;">
                <div>
                    <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">${data.companyName}</h3>
                    <p style="margin: 0 0 12px 0; color: #666;">${data.companyAddress}</p>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <span style="color: #666; font-size: 13px;"><strong style="font-weight: 500; color: #1a1a1a;">GSTIN:</strong> ${data.gstin}</span>
                        <span style="color: #666; font-size: 13px;"><strong style="font-weight: 500; color: #1a1a1a;">Email:</strong> ${data.companyEmail1}${data.companyEmail2 ? ', ' + data.companyEmail2 : ''}</span>
                        <span style="color: #666; font-size: 13px;"><strong style="font-weight: 500; color: #1a1a1a;">Phone:</strong> ${data.companyPhone}</span>
                    </div>
                </div>
                <div>
                    <h3 style="font-size: 14px; font-weight: 600; margin: 0 0 12px 0; color: #1a1a1a;">${data.clientContactName}</h3>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <span style="color: #666; font-size: 13px;"><strong style="font-weight: 500; color: #1a1a1a;">Phone:</strong> ${data.clientPhone}</span>
                        <span style="color: #666; font-size: 13px;"><strong style="font-weight: 500; color: #1a1a1a;">Address:</strong> ${data.clientAddress}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    tempDiv.innerHTML = invoiceHTML;
    document.body.appendChild(tempDiv);

    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
        const invoiceElement = tempDiv.firstElementChild;
        if (!invoiceElement) {
            throw new Error('Invoice element not found');
        }

        const canvas = await html2canvas(invoiceElement, {
            scale: 4,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            allowTaint: true,
            letterRendering: false,
            removeContainer: false,
            imageTimeout: 0,
            windowWidth: 800,
            windowHeight: invoiceElement.scrollHeight
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setProperties({
            title: `Invoice_${data.invoiceNumber}_${data.clientName.replace(/\s+/g, '_')}`,
            creator: 'UGC Invoice Generator'
        });

        // Add margins (15mm on all sides)
        const margin = 15;
        const pageWidth = 210;
        const pageHeight = 297;
        const contentWidth = pageWidth - (margin * 2);
        const contentHeight = pageHeight - (margin * 2);

        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= contentHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= contentHeight;
        }

        const filename = `Invoice_${data.invoiceNumber}_${data.clientName.replace(/\s+/g, '_')}.pdf`;
        pdf.save(filename);

        document.body.removeChild(tempDiv);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
        if (document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv);
        }
    }
}


// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('issueDate').value = today;

    // Get all form inputs and map them to preview fields
    const formInputs = document.querySelectorAll('#invoiceForm input, #invoiceForm textarea');

    // Add real-time preview update to all inputs with debounce - smart updates
    formInputs.forEach(input => {
        const fieldId = input.id;

        // Use smart field update instead of full refresh
        input.addEventListener('input', () => {
            debouncePreview(() => updatePreviewField(fieldId));
        });
        input.addEventListener('change', () => {
            updatePreviewField(fieldId);
        });
    });

    // Generate PDF button
    document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', function () {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            document.getElementById('invoiceForm').reset();
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('issueDate').value = today;
            showEmptyPreview();
        }
    });

    // Auto-format inputs with smart updates
    document.getElementById('ifsc').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('ifsc');
    });

    document.getElementById('pan').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('pan');
    });

    document.getElementById('gstin').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('gstin');
    });

    document.getElementById('clientName').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('clientName');
    });

    document.getElementById('companyName').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('companyName');
    });

    document.getElementById('clientContactName').addEventListener('input', function (e) {
        e.target.value = e.target.value.toUpperCase();
        updatePreviewField('clientContactName');
    });

    // Initial preview update
    updatePreview();
});

